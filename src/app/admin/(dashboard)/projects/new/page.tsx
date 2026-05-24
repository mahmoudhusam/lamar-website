'use client'

import { useActionState } from 'react'
import { createProject } from '../actions'

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
  textTransform: 'uppercase' as const,
  display: 'block',
  marginBottom: '0.5rem',
}

export default function NewProjectPage() {
  const [, action, pending] = useActionState(createProject, null)

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#F2EEE6', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>New Project</h1>
        <p style={{ color: '#6B6B68', fontSize: '0.85rem' }}>You can upload images after creating the project.</p>
      </div>

      <form action={action} style={{ background: '#1A1A18', border: '1px solid #2A2A28', borderRadius: 8, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 560 }}>
        <div>
          <label style={labelStyle}>Project Title *</label>
          <input type="text" name="title" required placeholder="e.g. Living Room Gypsum – Amsterdam" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Description (optional)</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Brief description of the project..."
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={pending}
            style={{ background: '#2ABFA8', color: '#0C0C0A', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontSize: '0.83rem', fontWeight: 700, cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.65 : 1 }}
          >
            {pending ? 'Creating…' : 'Create Project & Continue →'}
          </button>
        </div>
      </form>
    </div>
  )
}
