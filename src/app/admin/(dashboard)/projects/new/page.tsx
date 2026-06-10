'use client'

import { useActionState } from 'react'
import { createProject } from '../actions'

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

export default function NewProjectPage() {
  const [, action, pending] = useActionState(createProject, null)

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>New Project</h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>You can upload images after creating the project.</p>
      </div>

      <form action={action} style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 560 }}>
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
            style={{ background: '#1A6B60', color: '#FFFFFF', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontSize: '0.83rem', fontWeight: 700, cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.65 : 1 }}
          >
            {pending ? 'Creating…' : 'Create Project & Continue →'}
          </button>
        </div>
      </form>
    </div>
  )
}
