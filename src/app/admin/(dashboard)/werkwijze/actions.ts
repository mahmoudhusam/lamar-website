'use server'

import { revalidatePath } from 'next/cache'
import { setContentKeys } from '@/lib/content'
import { requireAccess } from '@/lib/guards'

const KEYS = [
  'werkwijze_heading', 'werkwijze_sub', 'werkwijze_banner',
  'werkwijze_step1_title', 'werkwijze_step1_text',
  'werkwijze_step2_title', 'werkwijze_step2_text',
  'werkwijze_step3_title', 'werkwijze_step3_text',
  'werkwijze_step4_title', 'werkwijze_step4_text',
] as const

type State = { ok: boolean } | null

export async function saveWerkwijze(_prev: State, formData: FormData): Promise<State> {
  await requireAccess('/admin/werkwijze')
  await setContentKeys(
    Object.fromEntries(KEYS.map((key) => [key, (formData.get(key) as string) ?? '']))
  )
  revalidatePath('/admin/werkwijze')
  revalidatePath('/werkwijze')
  return { ok: true }
}
