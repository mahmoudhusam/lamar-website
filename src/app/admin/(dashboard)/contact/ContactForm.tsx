'use client'
import { useActionState } from 'react'
import { saveContact } from './actions'

type Field = { key: string; label: string; placeholder: string }

const fields: Field[] = [
  { key: 'contact_phone',     label: 'Phone',         placeholder: '+31 6 00 000 000' },
  { key: 'contact_whatsapp',  label: 'WhatsApp',      placeholder: '+31 6 00 000 000' },
  { key: 'contact_email',     label: 'Email',         placeholder: 'info@lamar-renovatie.nl' },
  { key: 'contact_location',  label: 'Location',      placeholder: 'Amsterdam, Netherlands' },
  { key: 'contact_hours',     label: 'Working Hours',  placeholder: 'Mon–Fri 08:00–18:00' },
]

const inputStyle: React.CSSProperties = {
  background: '#0C0C0A',
  border: '1px solid #2A2A28',
  borderRadius: 4,
  padding: '0.6rem 0.75rem',
  fontSize: '0.87rem',
  color: '#F2EEE6',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#9A9A96',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.35rem',
}

export default function ContactForm({ defaults }: { defaults: Record<string, string> }) {
  const [state, formAction, pending] = useActionState(saveContact, null)

  return (
    <form
      action={formAction}
      style={{
        background: '#1A1A18',
        border: '1px solid #2A2A28',
        borderRadius: 8,
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        maxWidth: 600,
      }}
    >
      {fields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label htmlFor={key} style={labelStyle}>{label}</label>
          <input
            type="text"
            id={key}
            name={key}
            defaultValue={defaults[key] ?? ''}
            placeholder={placeholder}
            style={inputStyle}
          />
        </div>
      ))}

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            background: '#2ABFA8',
            color: '#0C0C0A',
            border: 'none',
            borderRadius: 6,
            padding: '0.6rem 1.5rem',
            fontSize: '0.83rem',
            fontWeight: 700,
            cursor: pending ? 'not-allowed' : 'pointer',
            opacity: pending ? 0.65 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {pending ? 'Saving…' : 'Save All'}
        </button>
        {state?.ok && (
          <span style={{ color: '#2ABFA8', fontSize: '0.8rem' }}>✓ Saved!</span>
        )}
      </div>
    </form>
  )
}
