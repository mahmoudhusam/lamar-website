'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type State = { ok: boolean } | null

export async function saveService(key: string, _prev: State, formData: FormData): Promise<State> {
  const value = (formData.get('value') as string) ?? ''
  await prisma.content.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })
  revalidatePath('/admin/services')
  revalidatePath('/')
  return { ok: true }
}
