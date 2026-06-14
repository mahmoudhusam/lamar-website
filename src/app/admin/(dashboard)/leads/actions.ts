'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireAccess } from '@/lib/guards'
import type { LeadStatus } from '@/generated/prisma/client'

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  await requireAccess('/admin/leads')
  await prisma.lead.update({ where: { id }, data: { status } })
  revalidatePath('/admin/leads')
  revalidatePath('/admin')
}

export async function deleteLead(id: string): Promise<void> {
  await requireAccess('/admin/leads')
  await prisma.lead.delete({ where: { id } })
  revalidatePath('/admin/leads')
  revalidatePath('/admin')
}
