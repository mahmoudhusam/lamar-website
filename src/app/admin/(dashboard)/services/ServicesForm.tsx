'use client'
import { useActionState, useEffect, useState } from 'react'

type State = { ok: boolean } | null
type BoundAction = (_prev: State, formData: FormData) => Promise<State>

const btnStyle = (pending: boolean): React.CSSProperties => ({
  background: '#2ABFA8',
  color: '#0C0C0A',
  border: 'none',
  borderRadius: 6,
  padding: '0.5rem 1.2rem',
  fontSize: '0.8rem',
  fontWeight: 700,
  cursor: pending ? 'not-allowed' : 'pointer',
  opacity: pending ? 0.65 : 1,
  transition: 'opacity 0.2s',
})

export function ServiceCard({
  name,
  defaultValue,
  action,
}: {
  name: string
  defaultValue: string
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
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}
    >
      <span style={{ color: '#F2EEE6', fontWeight: 700, fontSize: '0.95rem' }}>{name}</span>
      <textarea
        name="value"
        defaultValue={defaultValue}
        rows={5}
        style={{
          background: '#0C0C0A',
          border: '1px solid #2A2A28',
          borderRadius: 4,
          padding: '0.65rem 0.75rem',
          fontSize: '0.85rem',
          color: '#F2EEE6',
          lineHeight: 1.65,
          resize: 'vertical',
          outline: 'none',
          fontFamily: 'inherit',
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
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
