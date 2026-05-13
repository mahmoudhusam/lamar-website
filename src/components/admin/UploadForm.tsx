'use client'
import { useActionState, useEffect, useRef } from 'react'

type UploadState = { ok: boolean; error?: string } | null

const inputStyle: React.CSSProperties = {
  background: '#0C0C0A',
  border: '1px solid #2A2A28',
  borderRadius: 4,
  padding: '0.55rem 0.75rem',
  fontSize: '0.85rem',
  color: '#F2EEE6',
  outline: 'none',
  width: '100%',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#9A9A96',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.35rem',
}

export default function UploadForm({
  action,
}: {
  action: (_prev: UploadState, formData: FormData) => Promise<UploadState>
}) {
  const [state, formAction, pending] = useActionState(action, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.ok) formRef.current?.reset()
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      style={{
        background: '#1A1A18',
        border: '1px solid #2A2A28',
        borderRadius: 8,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: 500,
      }}
    >
      <h3 style={{ color: '#F2EEE6', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>
        Upload Photo
      </h3>

      <div>
        <label style={labelStyle}>Image file</label>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          style={{ ...inputStyle, color: '#9A9A96' }}
        />
      </div>

      <div>
        <label style={labelStyle}>Caption</label>
        <input
          type="text"
          name="caption"
          placeholder="e.g. Living Room Gypsum"
          style={inputStyle}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="submit"
          disabled={pending}
          style={{
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
          }}
        >
          {pending ? 'Uploading…' : 'Upload'}
        </button>
        {state?.ok && (
          <span style={{ color: '#2ABFA8', fontSize: '0.8rem' }}>✓ Uploaded!</span>
        )}
        {state?.error && (
          <span style={{ color: '#F87171', fontSize: '0.8rem' }}>{state.error}</span>
        )}
      </div>
    </form>
  )
}
