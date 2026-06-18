import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createLead } from '@/lib/leads'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const schema = z.object({
  name:    z.string().min(1, 'Name is required'),
  email:   z.string().optional(),
  phone:   z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

/** Captures quote-wizard enquiries into the admin Leads inbox. */
export async function POST(req: NextRequest) {
  if (!rateLimit(`lead:${clientIp(req)}`, 5, 60_000)) {
    return NextResponse.json({ error: 'Te veel aanvragen. Probeer het zo opnieuw.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Validation error.'
    return NextResponse.json({ error: msg }, { status: 422 })
  }

  const { name, email, phone, service, message } = parsed.data
  await createLead({ name, email, phone, service, message, source: 'QUOTE' })

  return NextResponse.json({ success: true })
}
