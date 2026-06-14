import { prisma } from '@/lib/prisma'
import type { LeadSource } from '@/generated/prisma/client'

export type NewLead = {
  name: string
  email?: string | null
  phone?: string | null
  service?: string | null
  message: string
  source: LeadSource
}

/**
 * Persist a public enquiry (contact form or quote wizard) as a Lead.
 * Returns the created row, or null if persistence failed — callers treat
 * storage as best-effort so a DB hiccup never blocks the email/WhatsApp path.
 */
export async function createLead(data: NewLead) {
  try {
    return await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        service: data.service || null,
        message: data.message,
        source: data.source,
      },
    })
  } catch (err) {
    console.error('[createLead] failed to persist lead:', err)
    return null
  }
}
