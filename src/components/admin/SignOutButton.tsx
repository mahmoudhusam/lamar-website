'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="w-full rounded-lg px-4 py-2 text-sm font-medium transition hover:opacity-80"
      style={{ backgroundColor: '#2A2A28', color: '#9A9A96' }}
    >
      Sign Out
    </button>
  )
}
