'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function saveLanguage(lang: string, _formData: FormData): Promise<void> {
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: { language: lang },
    create: { id: 'default', language: lang },
  })
  revalidatePath('/admin/settings')
  revalidatePath('/')
}
