'use client'
import { useActionState } from 'react'
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
        style={{ fontSize: '0.72rem', color: '#9A9A96', letterSpacing: '0.08em', textTransform: 'uppercase' }}
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
      />
      <p style={{ fontSize: '0.72rem', color: '#6B6B68', margin: 0 }}>
        Separate paragraphs with a blank line (double newline).
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button type="submit" disabled={pending} style={btnStyle(pending)}>
          {pending ? 'Saving…' : 'Save'}
        </button>
        {state?.ok && (
          <span style={{ color: '#2ABFA8', fontSize: '0.8rem' }}>✓ Saved!</span>
        )}
      </div>
    </form>
  )
}
