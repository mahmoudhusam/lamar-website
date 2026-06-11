'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const KEYS = ['whatsapp_number', 'offerte_intro'] as const
type State = { ok: boolean } | null

export async function saveOfferte(_prev: State, formData: FormData): Promise<State> {
  await prisma.$transaction(
    KEYS.map((key) =>
      prisma.content.upsert({
        where: { key },
        update: { value: (formData.get(key) as string) ?? '' },
        create: { key, value: (formData.get(key) as string) ?? '' },
      })
    )
  )
  revalidatePath('/admin/offerte')
  revalidatePath('/', 'layout') // whatsapp number is used site-wide (footer, hero, floating button)
  return { ok: true }
}
