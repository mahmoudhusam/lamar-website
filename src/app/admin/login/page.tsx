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

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password.')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0C0C0A' }}>
      <div className="w-full max-w-sm rounded-2xl p-8" style={{ backgroundColor: '#1A1A18' }}>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-widest text-white">LAMAR</h1>
          <p className="mt-1 text-sm" style={{ color: '#6B6B68' }}>Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: '#9A9A96' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-lg px-4 py-2.5 text-sm text-white outline-none transition focus:ring-2"
              style={{
                backgroundColor: '#0C0C0A',
                border: '1px solid #2A2A28',
              }}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: '#9A9A96' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg px-4 py-2.5 text-sm text-white outline-none transition focus:ring-2"
              style={{
                backgroundColor: '#0C0C0A',
                border: '1px solid #2A2A28',
              }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#2ABFA8' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
