'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const KEYS = ['whatsapp_number', 'offerte_intro'] as const;
type State = { ok: boolean } | null;

export async function saveOfferte(
  _prev: State,
  formData: FormData,
): Promise<State> {
  const values: Record<string, string> = {
    // strip spaces, +, dashes etc. so the wa.me links never break
    whatsapp_number: (
      (formData.get('whatsapp_number') as string) ?? ''
    ).replace(/[^0-9]/g, ''),
    offerte_intro: (formData.get('offerte_intro') as string) ?? '',
  };
  await prisma.$transaction(
    KEYS.map((key) =>
      prisma.content.upsert({
        where: { key },
        update: { value: values[key] },
        create: { key, value: values[key] },
      }),
    ),
  );
  revalidatePath('/admin/offerte');
  revalidatePath('/', 'layout'); // whatsapp number is used site-wide (footer, hero, floating button)
  return { ok: true };
}
