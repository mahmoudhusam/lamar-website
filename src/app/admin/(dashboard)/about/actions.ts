'use server';

import { revalidatePath } from 'next/cache';
import { setContentKeys } from '@/lib/content';
import { requireAccess } from '@/lib/guards';

type State = { ok: boolean } | null;

export async function saveAbout(
  _prev: State,
  formData: FormData,
): Promise<State> {
  await requireAccess('/admin/about');
  await setContentKeys({
    about_text: (formData.get('about_text') as string) ?? '',
  });
  revalidatePath('/admin/about');
  revalidatePath('/over-ons');
  return { ok: true };
}
