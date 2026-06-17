'use client'

import { useState, useTransition } from 'react'
import type { LeadStatus, LeadSource } from '@/generated/prisma/client'
import { updateLeadStatus, deleteLead } from './actions'

export type LeadRow = {
  id: string
  name: string
  email: string | null
  phone: string | null
  service: string | null
  message: string
  source: LeadSource
  status: LeadStatus
  createdAt: Date
}

const STATUS_META: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  NEW:       { label: 'New',       color: '#1A6B60', bg: 'rgba(42,191,168,0.14)' },
  CONTACTED: { label: 'Contacted', color: '#B7791F', bg: 'rgba(214,158,46,0.16)' },
  WON:       { label: 'Won',       color: '#2F855A', bg: 'rgba(72,187,120,0.16)' },
  ARCHIVED:  { label: 'Archived',  color: '#5B6470', bg: 'rgba(91,100,112,0.12)' },
}

const SOURCE_META: Record<LeadSource, { label: string; emoji: string }> = {
  CONTACT: { label: 'Contact form', emoji: '📞' },
  QUOTE:   { label: 'Quote request', emoji: '🧾' },
}

const STATUS_ORDER: LeadStatus[] = ['NEW', 'CONTACTED', 'WON', 'ARCHIVED']

const dateFmt = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
})

export default function LeadsClient({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return (
      <div style={{ background: '#FFFFFF', border: '1px dashed rgba(20,24,29,0.18)', borderRadius: 8, padding: '3rem', textAlign: 'center', color: '#97A0AC', fontSize: '0.9rem' }}>
        No leads in this view yet.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
    </div>
  )
}

function LeadCard({ lead }: { lead: LeadRow }) {
  const [pending, startTransition] = useTransition()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const status = STATUS_META[lead.status]
  const source = SOURCE_META[lead.source]

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '1.25rem 1.5rem', opacity: pending ? 0.6 : 1, transition: 'opacity 0.15s' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.6rem' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: '#14181D', fontSize: '0.95rem' }}>{lead.name}</span>
            <span style={{ fontSize: '0.68rem', color: '#5B6470', background: '#F2F5F8', borderRadius: 999, padding: '0.15rem 0.6rem' }}>
              {source.emoji} {source.label}
            </span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: status.color, background: status.bg, borderRadius: 999, padding: '0.15rem 0.6rem' }}>
              {status.label}
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#97A0AC', marginTop: '0.3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {lead.email && <a href={`mailto:${lead.email}`} style={{ color: '#1A6B60', textDecoration: 'none' }}>✉ {lead.email}</a>}
            {lead.phone && <a href={`tel:${lead.phone}`} style={{ color: '#1A6B60', textDecoration: 'none' }}>☎ {lead.phone}</a>}
            <span>{dateFmt.format(new Date(lead.createdAt))}</span>
          </div>
        </div>
      </div>

      {lead.service && (
        <div style={{ fontSize: '0.78rem', color: '#5B6470', marginBottom: '0.5rem' }}>
          <strong style={{ color: '#14181D' }}>Service:</strong> {lead.service}
        </div>
      )}

      <pre style={{ fontSize: '0.82rem', color: '#3A424D', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', margin: 0, background: '#F2F5F8', borderRadius: 6, padding: '0.75rem 0.9rem' }}>
        {lead.message}
      </pre>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {STATUS_ORDER.filter((s) => s !== lead.status).map((s) => (
            <button
              key={s}
              disabled={pending}
              onClick={() => startTransition(() => updateLeadStatus(lead.id, s))}
              style={{ fontSize: '0.72rem', fontWeight: 600, color: STATUS_META[s].color, background: STATUS_META[s].bg, border: 'none', borderRadius: 6, padding: '0.35rem 0.7rem', cursor: pending ? 'not-allowed' : 'pointer' }}
            >
              → {STATUS_META[s].label}
            </button>
          ))}
        </div>

        {confirmDelete ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem' }}>
            <span style={{ color: '#5B6470' }}>Delete?</span>
            <button disabled={pending} onClick={() => startTransition(() => deleteLead(lead.id))} style={{ fontSize: '0.72rem', fontWeight: 700, color: '#FFFFFF', background: '#E05C5C', border: 'none', borderRadius: 6, padding: '0.35rem 0.7rem', cursor: 'pointer' }}>Yes</button>
            <button onClick={() => setConfirmDelete(false)} style={{ fontSize: '0.72rem', color: '#5B6470', background: 'none', border: 'none', cursor: 'pointer' }}>No</button>
          </span>
        ) : (
          <button onClick={() => setConfirmDelete(true)} style={{ fontSize: '0.72rem', color: '#97A0AC', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
        )}
      </div>
    </div>
  )
}
