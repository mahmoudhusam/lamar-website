'use client'

import { useActionState, useEffect, useState } from 'react'

type State = { ok: boolean } | null
type BoundAction = (_prev: State, formData: FormData) => Promise<State>

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
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.5rem',
}

export function TestimonialCard({
  index,
  defaultValues,
  action,
}: {
  index: 1 | 2 | 3
  defaultValues: { quote: string; name: string; location: string }
  action: BoundAction
}) {
  const [state, formAction, pending] = useActionState(action, null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (state?.ok) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [state])

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#2ABFA8'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(20,24,29,0.10)'
  }

  return (
    <form
      action={formAction}
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(20,24,29,0.10)',
        borderRadius: 8,
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(42,191,168,0.15)',
            border: '1px solid rgba(42,191,168,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.8rem',
            color: '#1A6B60',
            flexShrink: 0,
          }}
        >
          {index}
        </div>
        <span style={{ color: '#14181D', fontWeight: 700, fontSize: '0.95rem' }}>
          Testimonial {index}
        </span>
      </div>

      <div>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          name="name"
          defaultValue={defaultValues.name}
          placeholder="Jan de Vries"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <label style={labelStyle}>Location</label>
        <input
          type="text"
          name="location"
          defaultValue={defaultValues.location}
          placeholder="Amsterdam, NL"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <label style={labelStyle}>Quote</label>
        <textarea
          name="quote"
          defaultValue={defaultValues.quote}
          rows={4}
          placeholder="Customer review text..."
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {showSuccess && (
        <div
          style={{
            background: 'rgba(42,191,168,0.1)',
            border: '1px solid rgba(42,191,168,0.3)',
            borderRadius: 6,
            padding: '0.65rem 1rem',
            color: '#1A6B60',
            fontSize: '0.82rem',
          }}
        >
          ✓ Changes saved and published to the public site.
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          style={{
            background: '#1A6B60',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 6,
            padding: '0.55rem 1.4rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: pending ? 'not-allowed' : 'pointer',
            opacity: pending ? 0.65 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {pending ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}
