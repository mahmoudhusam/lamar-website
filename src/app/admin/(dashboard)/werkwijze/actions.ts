'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const KEYS = [
  'werkwijze_heading', 'werkwijze_sub', 'werkwijze_banner',
  'werkwijze_step1_title', 'werkwijze_step1_text',
  'werkwijze_step2_title', 'werkwijze_step2_text',
  'werkwijze_step3_title', 'werkwijze_step3_text',
  'werkwijze_step4_title', 'werkwijze_step4_text',
] as const

type State = { ok: boolean } | null

export async function saveWerkwijze(_prev: State, formData: FormData): Promise<State> {
  await prisma.$transaction(
    KEYS.map((key) =>
      prisma.content.upsert({
        where: { key },
        update: { value: (formData.get(key) as string) ?? '' },
        create: { key, value: (formData.get(key) as string) ?? '' },
      })
    )
  )
  revalidatePath('/admin/werkwijze')
  revalidatePath('/werkwijze')
  return { ok: true }
}
