'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = { href: string; label: string }

export default function SidebarNav({ navLinks }: { navLinks: NavLink[] }) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navLinks.map((link) => {
        const active = pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 6,
              padding: active ? '0.5rem 0.75rem 0.5rem calc(0.75rem - 2px)' : '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.15s',
              color: active ? '#1A6B60' : '#5B6470',
              background: active ? 'rgba(42,191,168,0.10)' : 'transparent',
              borderLeft: active ? '2px solid #1A6B60' : '2px solid transparent',
            }}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
