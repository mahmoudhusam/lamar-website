'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type State = { ok: boolean } | null

export async function saveServiceFull(key: string, _prev: State, formData: FormData): Promise<State> {
  const title = (formData.get('title') as string) ?? ''
  const value = (formData.get('value') as string) ?? ''
  await prisma.$transaction([
    prisma.content.upsert({
      where: { key: `${key}_title` },
      update: { value: title },
      create: { key: `${key}_title`, value: title },
    }),
    prisma.content.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    }),
  ])
  revalidatePath('/admin/services')
  revalidatePath('/')
  return { ok: true }
}
