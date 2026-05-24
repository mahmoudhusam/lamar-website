'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function assignProjectToSlot(projectId: string, slot: number): Promise<void> {
  if (slot >= 0 && slot <= 6) {
    await prisma.project.updateMany({
      where: { bentoSlot: slot, id: { not: projectId } },
      data: { bentoSlot: -1 },
    })
  }
  await prisma.project.update({
    where: { id: projectId },
    data: { bentoSlot: slot },
  })
  revalidatePath('/admin/gallery')
  revalidatePath('/')
}

export async function removeProjectFromSlot(projectId: string): Promise<void> {
  await prisma.project.update({
    where: { id: projectId },
    data: { bentoSlot: -1 },
  })
  revalidatePath('/admin/gallery')
  revalidatePath('/')
}
