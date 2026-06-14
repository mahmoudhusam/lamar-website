'use client'

import { useState, useTransition } from 'react'
import type { Role } from '@/generated/prisma/client'
import { changePassword, updateOwnProfile } from '../users/actions'

const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: 'Super Admin',
  PROJECTS_EDITOR: 'Projects Editor',
  CONTENT_EDITOR: 'Content Editor',
}

const inputStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(20,24,29,0.10)',
  borderRadius: 6,
  color: '#14181D',
  padding: '0.55rem 0.75rem',
  fontSize: '0.85rem',
  width: '100%',
  fontFamily: 'inherit',
  outline: 'none',
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(20,24,29,0.10)',
  borderRadius: 8,
  padding: '1.5rem',
  marginBottom: '1.25rem',
  maxWidth: 560,
}

const labelStyle: React.CSSProperties = {
  color: '#5B6470',
  fontSize: '0.75rem',
  display: 'block',
  marginBottom: '0.35rem',
}

const btnPrimary: React.CSSProperties = {
  background: '#1A6B60',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: 6,
  padding: '0.55rem 1.25rem',
  fontSize: '0.83rem',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

type Props = {
  id: string
  name: string
  email: string
  role: Role
}

export default function AccountClient({ id, name, email, role }: Props) {
  const [profileMsg, setProfileMsg] = useState('')
  const [profileError, setProfileError] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [pwError, setPwError] = useState('')
  const [isPendingProfile, startProfile] = useTransition()
  const [isPendingPw, startPw] = useTransition()

  function handleProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setProfileMsg('')
    setProfileError('')
    startProfile(async () => {
      try {
        await updateOwnProfile({ name: fd.get('name') as string, email: fd.get('email') as string })
        setProfileMsg('Profile updated.')
      } catch (err: unknown) {
        setProfileError(err instanceof Error ? err.message : 'Update failed.')
      }
    })
  }

  function handlePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const current = fd.get('currentPassword') as string
    const next = fd.get('newPassword') as string
    const confirm = fd.get('confirmPassword') as string
    setPwMsg('')
    setPwError('')
    if (next !== confirm) {
      setPwError('New passwords do not match.')
      return
    }
    startPw(async () => {
      try {
        await changePassword(id, current, next)
        setPwMsg('Password changed.')
        ;(e.target as HTMLFormElement).reset()
      } catch (err: unknown) {
        setPwError(err instanceof Error ? err.message : 'Password change failed.')
      }
    })
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>My Account</h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>Update your profile and password.</p>
      </div>

      {/* Role badge */}
      <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#E3E8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5B6470', fontSize: '1rem', fontWeight: 700, flexShrink: 0 }}>
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ color: '#14181D', fontWeight: 600 }}>{name}</div>
          <div style={{ color: '#97A0AC', fontSize: '0.8rem' }}>{email}</div>
        </div>
        <span style={{ marginLeft: 'auto', background: role === 'SUPER_ADMIN' ? 'rgba(42,191,168,0.12)' : '#F2F5F8', border: `1px solid ${role === 'SUPER_ADMIN' ? 'rgba(42,191,168,0.3)' : 'rgba(20,24,29,0.10)'}`, color: role === 'SUPER_ADMIN' ? '#1A6B60' : '#5B6470', borderRadius: 4, padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
          {ROLE_LABELS[role]}
        </span>
      </div>

      {/* Profile form */}
      <div style={cardStyle}>
        <p style={{ color: '#14181D', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.25rem' }}>Profile</p>
        <form onSubmit={handleProfile} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input name="name" required defaultValue={name} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" required defaultValue={email} style={inputStyle} />
          </div>
          {profileError && <p style={{ color: '#E05C5C', fontSize: '0.8rem' }}>{profileError}</p>}
          {profileMsg && <p style={{ color: '#1A6B60', fontSize: '0.8rem' }}>{profileMsg}</p>}
          <div>
            <button type="submit" disabled={isPendingProfile} style={{ ...btnPrimary, opacity: isPendingProfile ? 0.6 : 1 }}>
              {isPendingProfile ? 'Saving…' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>

      {/* Password form */}
      <div style={cardStyle}>
        <p style={{ color: '#14181D', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.25rem' }}>Change Password</p>
        <form onSubmit={handlePassword} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label style={labelStyle}>Current Password</label>
            <input name="currentPassword" type="password" required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>New Password</label>
            <input name="newPassword" type="password" required minLength={8} style={inputStyle} placeholder="Min. 8 characters" />
          </div>
          <div>
            <label style={labelStyle}>Confirm New Password</label>
            <input name="confirmPassword" type="password" required minLength={8} style={inputStyle} />
          </div>
          {pwError && <p style={{ color: '#E05C5C', fontSize: '0.8rem' }}>{pwError}</p>}
          {pwMsg && <p style={{ color: '#1A6B60', fontSize: '0.8rem' }}>{pwMsg}</p>}
          <div>
            <button type="submit" disabled={isPendingPw} style={{ ...btnPrimary, opacity: isPendingPw ? 0.6 : 1 }}>
              {isPendingPw ? 'Changing…' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
