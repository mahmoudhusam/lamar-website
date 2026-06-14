'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAccess } from '@/lib/guards';

type State = { ok: boolean } | null;

export async function saveTestimonial(
  index: 1 | 2 | 3,
  _prev: State,
  formData: FormData,
): Promise<State> {
  await requireAccess('/admin/testimonials');
  const quote = formData.get('quote') as string;
  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const value = JSON.stringify({ quote, name, location });
  await prisma.content.upsert({
    where: { key: `testimonial_${index}` },
    update: { value },
    create: { key: `testimonial_${index}`, value },
  });
  revalidatePath('/admin/testimonials');
  revalidatePath('/', 'layout');
  return { ok: true };
}
