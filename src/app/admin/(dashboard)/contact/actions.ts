'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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
  await prisma.$transaction(
    KEYS.map((key) =>
      prisma.content.upsert({
        where: { key },
        update: { value: (formData.get(key) as string) ?? '' },
        create: { key, value: (formData.get(key) as string) ?? '' },
      }),
    ),
  );
  revalidatePath('/admin/contact');
  revalidatePath('/', 'layout');
  return { ok: true };
}
