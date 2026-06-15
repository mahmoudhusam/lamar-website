'use server';

import { revalidatePath } from 'next/cache';
import { setContentKeys } from '@/lib/content';
import { requireAccess } from '@/lib/guards';
import { safeHex, THEME_DEFAULTS } from '@/lib/theme';

const SOCIAL_KEYS = [
  'social_facebook',
  'social_instagram',
  'social_tiktok',
  'social_youtube',
] as const;

type State = { ok: boolean } | null;

export async function saveSocialLinks(
  _prev: State,
  formData: FormData,
): Promise<State> {
  await requireAccess('/admin/settings');
  await setContentKeys(
    Object.fromEntries(SOCIAL_KEYS.map((key) => [key, (formData.get(key) as string) ?? ''])),
  );
  revalidatePath('/admin/settings');
  revalidatePath('/', 'layout'); // footer is global
  return { ok: true };
}

export async function saveTheme(
  _prev: State,
  formData: FormData,
): Promise<State> {
  await requireAccess('/admin/settings');
  await setContentKeys({
    theme_primary: safeHex(formData.get('theme_primary') as string, THEME_DEFAULTS.primary),
    theme_accent: safeHex(formData.get('theme_accent') as string, THEME_DEFAULTS.accent),
  });
  revalidatePath('/admin/settings');
  revalidatePath('/', 'layout'); // theme colours are site-wide
  return { ok: true };
}
