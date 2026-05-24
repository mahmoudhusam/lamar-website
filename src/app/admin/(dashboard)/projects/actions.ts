'use server'

import { prisma } from '@/lib/prisma'
import { cloudinary } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function createProject(_prev: null, formData: FormData): Promise<null> {
  const title = (formData.get('title') as string).trim()
  const description = (formData.get('description') as string)?.trim() || null
  const baseSlug = slugify(title) || 'project'

  let slug = baseSlug
  let suffix = 1
  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`
  }

  const maxOrder = await prisma.project.aggregate({ _max: { order: true } })
  const order = (maxOrder._max.order ?? -1) + 1

  const project = await prisma.project.create({
    data: { title, slug, description, order },
  })

  revalidatePath('/admin/projects')
  revalidatePath('/projects')
  redirect(`/admin/projects/${project.id}`)
}

export async function saveProject(
  id: string,
  _prev: { ok: boolean; error?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const title = (formData.get('title') as string).trim()
  const description = (formData.get('description') as string)?.trim() || null
  const rawSlug = (formData.get('slug') as string)?.trim()
  const slug = slugify(rawSlug || title) || 'project'

  const existing = await prisma.project.findUnique({ where: { slug } })
  if (existing && existing.id !== id) {
    return { ok: false, error: 'Slug is already taken by another project.' }
  }

  await prisma.project.update({
    where: { id },
    data: { title, description, slug },
  })

  revalidatePath('/admin/projects')
  revalidatePath('/admin/projects/' + id)
  revalidatePath('/projects')
  revalidatePath('/projects/' + slug)
  return { ok: true }
}

export async function uploadProjectImage(
  projectId: string,
  _prev: { ok: boolean; error?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const file = formData.get('file') as File | null
  const caption = (formData.get('caption') as string)?.trim() || null
  const setCover = formData.get('set_cover') === 'on'

  if (!file || file.size === 0) return { ok: false, error: 'No file selected.' }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'lamar/projects', resource_type: 'image' },
        (err, res) => {
          if (err || !res) return reject(err ?? new Error('Upload failed'))
          resolve(res)
        }
      ).end(buffer)
    })

    const maxOrder = await prisma.projectImage.aggregate({
      where: { projectId },
      _max: { order: true },
    })
    const order = (maxOrder._max.order ?? -1) + 1

    await prisma.projectImage.create({
      data: { url: result.secure_url, caption, order, projectId },
    })

    if (setCover) {
      await prisma.project.update({
        where: { id: projectId },
        data: { coverImageUrl: result.secure_url },
      })
    }

    revalidatePath('/admin/projects/' + projectId)
    revalidatePath('/projects')
    return { ok: true }
  } catch (err) {
    console.error('[uploadProjectImage]', err)
    return { ok: false, error: 'Upload failed. Check Cloudinary credentials.' }
  }
}

export async function setCoverImage(projectId: string, imageUrl: string): Promise<void> {
  await prisma.project.update({
    where: { id: projectId },
    data: { coverImageUrl: imageUrl },
  })
  revalidatePath('/admin/projects/' + projectId)
  revalidatePath('/projects')
}

export async function deleteProjectImage(imageId: string, projectId: string): Promise<void> {
  const image = await prisma.projectImage.findUnique({ where: { id: imageId } })
  if (image) {
    const match = image.url.match(/\/upload\/(?:v\d+\/)?(.+)$/)
    if (match) {
      const publicId = match[1].replace(/\.[^.]+$/, '')
      await cloudinary.uploader.destroy(publicId).catch(() => {})
    }
  }
  await prisma.projectImage.delete({ where: { id: imageId } })

  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (project?.coverImageUrl === image?.url) {
    const firstImage = await prisma.projectImage.findFirst({
      where: { projectId },
      orderBy: { order: 'asc' },
    })
    await prisma.project.update({
      where: { id: projectId },
      data: { coverImageUrl: firstImage?.url ?? null },
    })
  }

  revalidatePath('/admin/projects/' + projectId)
  revalidatePath('/projects')
}

export async function deleteProject(id: string): Promise<void> {
  const images = await prisma.projectImage.findMany({ where: { projectId: id } })
  for (const img of images) {
    const match = img.url.match(/\/upload\/(?:v\d+\/)?(.+)$/)
    if (match) {
      const publicId = match[1].replace(/\.[^.]+$/, '')
      await cloudinary.uploader.destroy(publicId).catch(() => {})
    }
  }
  await prisma.project.delete({ where: { id } })
  revalidatePath('/admin/projects')
  revalidatePath('/projects')
}

export async function togglePublished(id: string, published: boolean): Promise<void> {
  await prisma.project.update({ where: { id }, data: { published } })
  revalidatePath('/admin/projects')
  revalidatePath('/projects')
}

export async function moveProject(id: string, direction: 'up' | 'down'): Promise<void> {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } })
  const index = projects.findIndex((p) => p.id === id)
  if (index < 0) return
  const swapIndex = direction === 'up' ? index - 1 : index + 1
  if (swapIndex < 0 || swapIndex >= projects.length) return

  await prisma.$transaction([
    prisma.project.update({ where: { id: projects[index].id }, data: { order: projects[swapIndex].order } }),
    prisma.project.update({ where: { id: projects[swapIndex].id }, data: { order: projects[index].order } }),
  ])

  revalidatePath('/admin/projects')
  revalidatePath('/projects')
}
