'use client'
import { useActionState, useEffect, useState } from 'react'
import { saveWerkwijze } from './actions'

const labelStyle: React.CSSProperties = { fontSize: '0.72rem', color: '#5B6470', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }
const inputStyle: React.CSSProperties = { background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '0.6rem 0.75rem', fontSize: '0.87rem', color: '#14181D', outline: 'none', width: '100%', fontFamily: 'inherit' }
const card: React.CSSProperties = { background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }
const STEPS = [1, 2, 3, 4] as const

export default function WerkwijzeForm({ defaults }: { defaults: Record<string, string> }) {
  const [state, formAction, pending] = useActionState(saveWerkwijze, null)
  const [showSuccess, setShowSuccess] = useState(false)
  useEffect(() => { if (state?.ok) { setShowSuccess(true); const t = setTimeout(() => setShowSuccess(false), 3000); return () => clearTimeout(t) } }, [state])
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = '#2ABFA8' }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = 'rgba(20,24,29,0.10)' }

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 720 }}>
      <div style={card}>
        <div>
          <label style={labelStyle}>Page heading</label>
          <input name="werkwijze_heading" defaultValue={defaults['werkwijze_heading'] ?? ''} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input name="werkwijze_sub" defaultValue={defaults['werkwijze_sub'] ?? ''} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={labelStyle}>Banner slogan</label>
          <input name="werkwijze_banner" defaultValue={defaults['werkwijze_banner'] ?? ''} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>
      </div>

      {STEPS.map((n) => (
        <div key={n} style={card}>
          <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '0.95rem', color: '#14181D' }}>Step {n}</div>
          <div>
            <label style={labelStyle}>Title</label>
            <input name={`werkwijze_step${n}_title`} defaultValue={defaults[`werkwijze_step${n}_title`] ?? ''} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
          <div>
            <label style={labelStyle}>Text</label>
            <textarea name={`werkwijze_step${n}_text`} rows={3} defaultValue={defaults[`werkwijze_step${n}_text`] ?? ''} style={{ ...inputStyle, lineHeight: 1.6, resize: 'vertical' }} onFocus={onFocus} onBlur={onBlur} />
          </div>
        </div>
      ))}

      {showSuccess && (
        <div style={{ background: 'rgba(42,191,168,0.1)', border: '1px solid rgba(42,191,168,0.3)', borderRadius: 6, padding: '0.65rem 1rem', color: '#1A6B60', fontSize: '0.82rem', maxWidth: 720 }}>
          ✓ Changes saved and published to the public site.
        </div>
      )}

      <div>
        <button type="submit" disabled={pending} style={{ background: '#1A6B60', color: '#FFFFFF', border: 'none', borderRadius: 6, padding: '0.55rem 1.4rem', fontSize: '0.82rem', fontWeight: 700, cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.65 : 1, fontFamily: 'inherit' }}>
          {pending ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}
