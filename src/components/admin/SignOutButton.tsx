'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="w-full rounded-lg px-4 py-2 text-sm font-medium transition hover:opacity-80"
      style={{ backgroundColor: '#F2F5F8', border: '1px solid rgba(20,24,29,0.10)', color: '#5B6470' }}
    >
      Sign Out
    </button>
  )
}
