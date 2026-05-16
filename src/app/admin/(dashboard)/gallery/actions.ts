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

    await prisma.galleryItem.create({
      data: { url: result.secure_url, caption, order: -1 },
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

export async function assignSlot(
  photoId: string,
  slot: number,
  _formData: FormData
): Promise<void> {
  if (slot >= 0) {
    await prisma.galleryItem.updateMany({
      where: { order: slot, id: { not: photoId } },
      data: { order: -1 },
    })
  }
  await prisma.galleryItem.update({
    where: { id: photoId },
    data: { order: slot },
  })
  revalidatePath('/admin/gallery')
  revalidatePath('/')
}
