'use client'
import { useActionState, useEffect, useState } from 'react'
import { saveOfferte } from './actions'

const labelStyle: React.CSSProperties = { fontSize: '0.72rem', color: '#5B6470', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }
const inputStyle: React.CSSProperties = { background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '0.6rem 0.75rem', fontSize: '0.87rem', color: '#14181D', outline: 'none', width: '100%', fontFamily: 'inherit' }

export default function OfferteForm({ defaults }: { defaults: Record<string, string> }) {
  const [state, formAction, pending] = useActionState(saveOfferte, null)
  const [showSuccess, setShowSuccess] = useState(false)
  useEffect(() => { if (state?.ok) { setShowSuccess(true); const t = setTimeout(() => setShowSuccess(false), 3000); return () => clearTimeout(t) } }, [state])
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = '#2ABFA8' }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = 'rgba(20,24,29,0.10)' }

  return (
    <form action={formAction} style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 600 }}>
      <div>
        <label style={labelStyle}>WhatsApp number</label>
        <input name="whatsapp_number" defaultValue={defaults['whatsapp_number'] ?? ''} style={inputStyle} onFocus={onFocus} onBlur={onBlur} placeholder="31612345678" />
        <p style={{ fontSize: '0.72rem', color: '#97A0AC', margin: '0.4rem 0 0' }}>International format, digits only — no &quot;+&quot; or spaces (e.g. 31612345678). Powers the offerte form and every WhatsApp button on the site.</p>
      </div>
      <div>
        <label style={labelStyle}>Intro text (optional)</label>
        <textarea name="offerte_intro" rows={3} defaultValue={defaults['offerte_intro'] ?? ''} style={{ ...inputStyle, lineHeight: 1.6, resize: 'vertical' }} onFocus={onFocus} onBlur={onBlur} placeholder="Shown above the quote wizard. Leave empty to hide." />
      </div>
      {showSuccess && (
        <div style={{ background: 'rgba(42,191,168,0.1)', border: '1px solid rgba(42,191,168,0.3)', borderRadius: 6, padding: '0.65rem 1rem', color: '#1A6B60', fontSize: '0.82rem' }}>
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
