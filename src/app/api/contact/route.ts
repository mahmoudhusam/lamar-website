import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { getContent } from '@/lib/content'
import { createLead } from '@/lib/leads'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const schema = z.object({
  name:    z.string().min(1, 'Name is required'),
  phone:   z.string().optional(),
  email:   z.email('Invalid email address'),
  service: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  company: z.string().optional(), // honeypot — real users never fill this
})

export async function POST(req: NextRequest) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 60_000)) {
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

  const { name, phone, email, service, message, company } = parsed.data

  // Honeypot tripped → silently accept without storing or emailing.
  if (company && company.trim() !== '') {
    return NextResponse.json({ success: true })
  }

  // Persist the enquiry so it shows up in the admin Leads inbox (best-effort).
  await createLead({ name, email, phone, service, message, source: 'CONTACT' })

  const toEmail = await getContent(
    'contact_email',
    process.env.CONTACT_EMAIL ?? 'info@lamar-renovatie.nl'
  )

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email send.')
    return NextResponse.json({ success: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  // In production set CONTACT_FROM to a sender on your Resend-verified domain
  // (e.g. "LAMAR <offerte@lamar-renovatie.nl>"). The onboarding@resend.dev
  // sandbox sender only delivers to the Resend account owner's own address.
  const { error } = await resend.emails.send({
    from:    process.env.CONTACT_FROM ?? 'LAMAR Website <onboarding@resend.dev>',
    to:      [toEmail],
    subject: `New enquiry from ${name}`,
    text: [
      `Name:    ${name}`,
      `Phone:   ${phone ?? '—'}`,
      `Email:   ${email}`,
      `Service: ${service ?? '—'}`,
      '',
      message,
    ].join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
