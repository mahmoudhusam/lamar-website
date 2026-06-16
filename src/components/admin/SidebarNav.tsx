'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = { href: string; label: string }
type NavGroup = { label?: string; links: NavLink[] }

export default function SidebarNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname()

  return (
    <nav>
      {groups.map((group, gi) => (
        <div key={group.label ?? gi} style={{ marginBottom: gi < groups.length - 1 ? '1.25rem' : 0 }}>
          {group.label && (
            <p
              style={{
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#B6BEC8',
                padding: '0 0.75rem',
                marginBottom: '0.4rem',
              }}
            >
              {group.label}
            </p>
          )}
          <div className="space-y-1">
            {group.links.map((link) => {
              // '/admin' (Dashboard) must match exactly, otherwise it would
              // light up on every nested /admin/* route.
              const active =
                link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
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
          </div>
        </div>
      ))}
    </nav>
  )
}
