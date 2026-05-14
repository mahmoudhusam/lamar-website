'use server'

import { prisma } from '@/lib/prisma'
import { cloudinary } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'

type UploadState = { ok: boolean; error?: string } | null

export async function uploadImage(_prev: UploadState, formData: FormData): Promise<UploadState> {
  const file = formData.get('file') as File | null
  const caption = (formData.get('caption') as string) || null

  if (!file || file.size === 0) return { ok: false, error: 'No file selected.' }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'lamar', resource_type: 'image' },
        (err, res) => {
          if (err || !res) return reject(err ?? new Error('Upload failed'))
          resolve(res)
        }
      ).end(buffer)
    })

    const agg = await prisma.galleryItem.aggregate({ _max: { order: true } })
    const nextOrder = (agg._max.order ?? 0) + 1

    await prisma.galleryItem.create({
      data: { url: result.secure_url, caption, order: nextOrder },
    })

    revalidatePath('/admin/gallery')
    revalidatePath('/')
    return { ok: true }
  } catch (err) {
    console.error('[uploadImage]', err)
    return { ok: false, error: 'Upload failed. Check Cloudinary credentials.' }
  }
}

export async function deleteImage(id: string): Promise<void> {
  const item = await prisma.galleryItem.findUnique({ where: { id } })
  if (item) {
    const match = item.url.match(/\/upload\/(?:v\d+\/)?(.+)$/)
    if (match) {
      const publicId = match[1].replace(/\.[^.]+$/, '')
      await cloudinary.uploader.destroy(publicId).catch(() => {})
    }
  }
  await prisma.galleryItem.delete({ where: { id } })
  revalidatePath('/admin/gallery')
  revalidatePath('/')
}

export async function reorderImage(id: string, direction: 'up' | 'down', _formData: FormData): Promise<void> {
  const item = await prisma.galleryItem.findUnique({ where: { id } })
  if (!item) return

  const neighbor = await prisma.galleryItem.findFirst({
    where: { order: direction === 'up' ? { lt: item.order } : { gt: item.order } },
    orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
  })
  if (!neighbor) return

  await prisma.$transaction([
    prisma.galleryItem.update({ where: { id: item.id }, data: { order: neighbor.order } }),
    prisma.galleryItem.update({ where: { id: neighbor.id }, data: { order: item.order } }),
  ])

  revalidatePath('/admin/gallery')
}
