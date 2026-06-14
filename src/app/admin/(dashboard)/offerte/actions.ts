'use server';

import { revalidatePath } from 'next/cache';
import { setContentKeys } from '@/lib/content';
import { requireAccess } from '@/lib/guards';

type State = { ok: boolean } | null;

export async function saveOfferte(
  _prev: State,
  formData: FormData,
): Promise<State> {
  await requireAccess('/admin/offerte');
  await setContentKeys({
    // strip spaces, +, dashes etc. so the wa.me links never break
    whatsapp_number: ((formData.get('whatsapp_number') as string) ?? '').replace(/[^0-9]/g, ''),
    offerte_intro: (formData.get('offerte_intro') as string) ?? '',
  });
  revalidatePath('/admin/offerte');
  revalidatePath('/', 'layout'); // whatsapp number is used site-wide (footer, hero, floating button)
  return { ok: true };
}
