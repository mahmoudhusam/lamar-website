'use server';

import { revalidatePath } from 'next/cache';
import { setContentKeys } from '@/lib/content';
import { requireAccess } from '@/lib/guards';

const KEYS = [
  'contact_phone',
  'contact_email',
  'contact_location',
  'contact_hours',
] as const;

type State = { ok: boolean } | null;

export async function saveContact(
  _prev: State,
  formData: FormData,
): Promise<State> {
  await requireAccess('/admin/contact');
  await setContentKeys(
    Object.fromEntries(KEYS.map((key) => [key, (formData.get(key) as string) ?? ''])),
  );
  revalidatePath('/admin/contact');
  revalidatePath('/', 'layout');
  return { ok: true };
}
