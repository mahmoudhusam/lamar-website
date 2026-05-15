'use client'
import { useActionState, useEffect, useState } from 'react'
import { saveAbout } from './actions'

const btnStyle = (pending: boolean): React.CSSProperties => ({
  background: '#2ABFA8',
  color: '#0C0C0A',
  border: 'none',
  borderRadius: 6,
  padding: '0.55rem 1.4rem',
  fontSize: '0.82rem',
  fontWeight: 700,
  cursor: pending ? 'not-allowed' : 'pointer',
  opacity: pending ? 0.65 : 1,
  transition: 'opacity 0.2s',
})

export default function AboutForm({ defaultValue }: { defaultValue: string }) {
  const [state, formAction, pending] = useActionState(saveAbout, null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (state?.ok) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [state])

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#2ABFA8'
  }
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#2A2A28'
  }

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
        gap: '1rem',
        maxWidth: 720,
      }}
    >
      <label
        htmlFor="about_text"
        style={{ fontSize: '0.72rem', color: '#9A9A96', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}
      >
        About text
      </label>
      <textarea
        id="about_text"
        name="about_text"
        defaultValue={defaultValue}
        rows={10}
        style={{
          background: '#0C0C0A',
          border: '1px solid #2A2A28',
          borderRadius: 4,
          padding: '0.75rem',
          fontSize: '0.88rem',
          color: '#F2EEE6',
          lineHeight: 1.7,
          resize: 'vertical',
          outline: 'none',
          fontFamily: 'inherit',
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <p style={{ fontSize: '0.72rem', color: '#6B6B68', margin: 0 }}>
        Separate paragraphs with a blank line (double newline).
      </p>
      {showSuccess && (
        <div
          style={{
            background: 'rgba(42,191,168,0.1)',
            border: '1px solid rgba(42,191,168,0.3)',
            borderRadius: 6,
            padding: '0.65rem 1rem',
            color: '#2ABFA8',
            fontSize: '0.82rem',
          }}
        >
          ✓ Changes saved and published to the public site.
        </div>
      )}
      <div>
        <button type="submit" disabled={pending} style={btnStyle(pending)}>
          {pending ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}
