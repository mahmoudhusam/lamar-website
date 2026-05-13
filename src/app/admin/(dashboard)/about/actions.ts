'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type State = { ok: boolean } | null

export async function saveAbout(_prev: State, formData: FormData): Promise<State> {
  const value = (formData.get('about_text') as string) ?? ''
  await prisma.content.upsert({
    where: { key: 'about_text' },
    update: { value },
    create: { key: 'about_text', value },
  })
  revalidatePath('/admin/about')
  revalidatePath('/')
  return { ok: true }
}
