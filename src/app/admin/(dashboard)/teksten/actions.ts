'use server'

import { revalidatePath } from 'next/cache'
import { setContentKeys } from '@/lib/content'
import { requireAccess } from '@/lib/guards'
import { TEXT_KEYS } from '@/lib/siteText'

type State = { ok: boolean } | null

export async function saveTexts(_prev: State, formData: FormData): Promise<State> {
  await requireAccess('/admin/teksten')
  await setContentKeys(
    Object.fromEntries(TEXT_KEYS.map((key) => [key, (formData.get(key) as string) ?? '']))
  )
  // Editable copy appears across the homepage, so refresh the whole tree.
  revalidatePath('/', 'layout')
  revalidatePath('/admin/teksten')
  return { ok: true }
}
