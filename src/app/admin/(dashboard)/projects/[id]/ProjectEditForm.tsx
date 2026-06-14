'use client'

import { useActionState, useEffect, useState } from 'react'

type SaveState = { ok: boolean; error?: string } | null
type SaveAction = (prev: SaveState, formData: FormData) => Promise<SaveState>

const inputStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(20,24,29,0.10)',
  borderRadius: 4,
  padding: '0.6rem 0.75rem',
  fontSize: '0.87rem',
  color: '#14181D',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#5B6470',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  display: 'block',
  marginBottom: '0.5rem',
}

export default function ProjectEditForm({
  defaultTitle,
  defaultSlug,
  defaultDescription,
  defaultBentoSlot,
  action,
}: {
  defaultTitle: string
  defaultSlug: string
  defaultDescription: string
  defaultBentoSlot: number
  action: SaveAction
}) {
  const [state, formAction, pending] = useActionState(action, null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!state?.ok) return
    setShowSuccess(true)
    const t = setTimeout(() => setShowSuccess(false), 3000)
    return () => clearTimeout(t)
  }, [state])

  return (
    <form action={formAction} style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 560 }}>
      <div>
        <label style={labelStyle}>Title *</label>
        <input type="text" name="title" required defaultValue={defaultTitle} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Slug</label>
        <input type="text" name="slug" defaultValue={defaultSlug} style={inputStyle} placeholder="auto-generated from title" />
        <p style={{ fontSize: '0.7rem', color: '#97A0AC', marginTop: '0.35rem' }}>URL: /projects/<em>{defaultSlug}</em></p>
      </div>
      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={defaultDescription}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
        />
      </div>
      <div>
        <label style={labelStyle}>Homepage gallery slot</label>
        <select name="bentoSlot" defaultValue={String(defaultBentoSlot)} style={inputStyle}>
          <option value="-1">Not featured on homepage</option>
          {Array.from({ length: 7 }, (_, i) => (
            <option key={i} value={String(i)}>Slot {i + 1}</option>
          ))}
        </select>
        <p style={{ fontSize: '0.7rem', color: '#97A0AC', marginTop: '0.35rem' }}>
          Featured projects fill the bento grid on the homepage. Each slot holds one project.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="submit"
          disabled={pending}
          style={{ background: '#1A6B60', color: '#FFFFFF', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontSize: '0.83rem', fontWeight: 700, cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.65 : 1 }}
        >
          {pending ? 'Saving…' : 'Save Changes'}
        </button>
        {showSuccess && (
          <span style={{ fontSize: '0.78rem', color: '#1A6B60' }}>Saved ✓</span>
        )}
        {state && !state.ok && state.error && (
          <span style={{ fontSize: '0.78rem', color: '#F87171' }}>{state.error}</span>
        )}
      </div>
    </form>
  )
}
