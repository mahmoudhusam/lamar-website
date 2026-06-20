'use client'

import { useActionState, useEffect, useState } from 'react'
import { saveReviewBadges } from './actions'

export type BadgeRow = {
  platform: string
  enabled: boolean
  rating: string
  reviews: string
  url: string
}

const PLATFORM_LABELS: Record<string, string> = {
  google: 'Google',
  facebook: 'Facebook',
  trustpilot: 'Trustpilot',
  werkspot: 'Werkspot',
}

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

export default function ReviewBadgesForm({ defaults }: { defaults: BadgeRow[] }) {
  const [state, formAction, pending] = useActionState(saveReviewBadges, null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (state?.ok) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [state])

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#2ABFA8'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(20,24,29,0.10)'
  }

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 720 }}>
      {defaults.map((d) => (
        <div
          key={d.platform}
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(20,24,29,0.10)',
            borderRadius: 8,
            padding: '1.5rem',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.1rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name={`${d.platform}_enabled`}
              defaultChecked={d.enabled}
              style={{ width: 16, height: 16, accentColor: '#1A6B60' }}
            />
            <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1rem', color: '#14181D' }}>
              {PLATFORM_LABELS[d.platform] ?? d.platform}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#97A0AC' }}>Show on homepage</span>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Score</label>
              <input
                type="text"
                name={`${d.platform}_rating`}
                defaultValue={d.rating}
                placeholder="4,9"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label style={labelStyle}>Review count</label>
              <input
                type="text"
                name={`${d.platform}_reviews`}
                defaultValue={d.reviews}
                placeholder="602"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Profile URL</label>
            <input
              type="text"
              name={`${d.platform}_url`}
              defaultValue={d.url}
              placeholder="https://…"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      ))}

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

      <div style={{ marginTop: '0.25rem' }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            background: '#1A6B60',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 6,
            padding: '0.6rem 1.5rem',
            fontSize: '0.83rem',
            fontWeight: 700,
            cursor: pending ? 'not-allowed' : 'pointer',
            opacity: pending ? 0.65 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {pending ? 'Saving…' : 'Save All'}
        </button>
      </div>
    </form>
  )
}
