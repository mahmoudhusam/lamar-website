'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', { email, password, redirect: false })

    setLoading(false)
    if (result?.error) {
      setError('Invalid email or password.')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 8,
    padding: '0.65rem 0.9rem',
    fontSize: '0.9rem',
    color: '#14181D',
    background: '#FFFFFF',
    border: '1px solid rgba(20,24,29,0.10)',
    outline: 'none',
    fontFamily: 'inherit',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.4rem',
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#5B6470',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F5F8', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 380, borderRadius: 20, padding: '2.25rem', background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', boxShadow: '0 20px 50px rgba(20,24,29,0.08)' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '0.08em', color: '#14181D' }}>LAMAR</h1>
          <p style={{ marginTop: '0.35rem', fontSize: '0.85rem', color: '#97A0AC' }}>Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#2ABFA8')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(20,24,29,0.10)')}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#2ABFA8')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(20,24,29,0.10)')}
            />
          </div>

          {error && <p style={{ fontSize: '0.85rem', color: '#E05C5C' }}>{error}</p>}

          <button
            type="submit" disabled={loading}
            style={{ width: '100%', borderRadius: 8, padding: '0.7rem', fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', background: '#1A6B60', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, fontFamily: 'inherit', transition: 'opacity 0.2s' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
