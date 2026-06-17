'use client'

import { useActionState, useEffect, useState } from 'react'
import type { TextGroup } from '@/lib/siteText'
import { saveTexts } from './actions'

type State = { ok: boolean } | null

const inputStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(20,24,29,0.10)',
  borderRadius: 6,
  color: '#14181D',
  padding: '0.55rem 0.75rem',
  fontSize: '0.85rem',
  width: '100%',
  fontFamily: 'inherit',
  outline: 'none',
}

export default function TextsForm({
  groups,
  values,
}: {
  groups: TextGroup[]
  values: Record<string, string>
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(saveTexts, null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!state?.ok) return
    setShowSuccess(true)
    const id = setTimeout(() => setShowSuccess(false), 3000)
    return () => clearTimeout(id)
  }, [state])

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 720 }}>
      {groups.map((group) => (
        <section key={group.id} style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.1rem' }}>
            <p style={{ color: '#5B6470', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              {group.label}
            </p>
            <a
              href={`/${group.anchor}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open this section on the live site in a new tab"
              style={{ flexShrink: 0, fontSize: '0.72rem', fontWeight: 600, color: '#1A6B60', textDecoration: 'none', border: '1px solid rgba(42,191,168,0.35)', borderRadius: 6, padding: '0.3rem 0.65rem', whiteSpace: 'nowrap' }}
            >
              View on site ↗
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {group.fields.map((field) => (
              <div key={field.key}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#14181D', marginBottom: '0.35rem' }}>
                  {field.label}
                </label>
                {field.multiline ? (
                  <textarea
                    name={field.key}
                    defaultValue={values[field.key] ?? ''}
                    placeholder={field.fallback}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  />
                ) : (
                  <input
                    type="text"
                    name={field.key}
                    defaultValue={values[field.key] ?? ''}
                    placeholder={field.fallback}
                    style={inputStyle}
                  />
                )}
                <p style={{ fontSize: '0.68rem', color: '#97A0AC', marginTop: '0.25rem' }}>
                  Leave empty for the default: &ldquo;{field.fallback}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', bottom: 0, background: '#F2F5F8', paddingTop: '0.5rem' }}>
        <button
          type="submit"
          disabled={pending}
          style={{ background: '#1A6B60', color: '#FFFFFF', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontSize: '0.83rem', fontWeight: 700, cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.65 : 1 }}
        >
          {pending ? 'Saving…' : 'Save texts'}
        </button>
        {showSuccess && <span style={{ fontSize: '0.78rem', color: '#1A6B60' }}>Saved ✓</span>}
      </div>
    </form>
  )
}
