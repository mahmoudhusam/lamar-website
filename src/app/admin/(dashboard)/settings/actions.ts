'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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
  await prisma.$transaction(
    SOCIAL_KEYS.map((key) =>
      prisma.content.upsert({
        where: { key },
        update: { value: (formData.get(key) as string) ?? '' },
        create: { key, value: (formData.get(key) as string) ?? '' },
      }),
    ),
  );
  revalidatePath('/admin/settings');
  revalidatePath('/', 'layout'); // footer is global
  return { ok: true };
}
