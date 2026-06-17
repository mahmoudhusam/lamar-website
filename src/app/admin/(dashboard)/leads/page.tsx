import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { LeadStatus, Prisma } from '@/generated/prisma/client'
import LeadsClient, { type LeadRow } from './LeadsClient'

export const dynamic = 'force-dynamic'

const FILTERS: { key: 'ALL' | LeadStatus; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'NEW', label: 'New (Nieuw)' },
  { key: 'CONTACTED', label: 'Contacted (Gecontacteerd)' },
  { key: 'WON', label: 'Won (Gewonnen)' },
  { key: 'ARCHIVED', label: 'Archived (Archief)' },
]

function isStatus(v: string | undefined): v is LeadStatus {
  return v === 'NEW' || v === 'CONTACTED' || v === 'WON' || v === 'ARCHIVED'
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const active: 'ALL' | LeadStatus = isStatus(status) ? status : 'ALL'

  const where: Prisma.LeadWhereInput = active === 'ALL' ? {} : { status: active }

  const [leads, counts] = await Promise.all([
    prisma.lead.findMany({ where, orderBy: { createdAt: 'desc' }, take: 200 }).catch(() => []),
    prisma.lead.groupBy({ by: ['status'], _count: true }).catch(() => []),
  ])

  const countFor = (key: 'ALL' | LeadStatus) =>
    key === 'ALL'
      ? counts.reduce((sum, c) => sum + c._count, 0)
      : counts.find((c) => c.status === key)?._count ?? 0

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Leads <span style={{ color: '#97A0AC', fontWeight: 400 }}>(Aanvragen)</span>
        </h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
          All enquiries from the contact form and the quote wizard.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {FILTERS.map((f) => {
          const isActive = f.key === active
          return (
            <Link
              key={f.key}
              href={f.key === 'ALL' ? '/admin/leads' : `/admin/leads?status=${f.key}`}
              style={{
                fontSize: '0.8rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#FFFFFF' : '#5B6470',
                background: isActive ? '#1A6B60' : '#FFFFFF',
                border: '1px solid rgba(20,24,29,0.10)',
                borderRadius: 999,
                padding: '0.4rem 0.95rem',
                textDecoration: 'none',
              }}
            >
              {f.label} <span style={{ opacity: 0.7 }}>({countFor(f.key)})</span>
            </Link>
          )
        })}
      </div>

      <LeadsClient leads={leads as LeadRow[]} />
    </div>
  )
}
