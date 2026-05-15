import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  const [galleryCount, contentCount, settings] = await Promise.all([
    prisma.galleryItem.count(),
    prisma.content.count(),
    prisma.settings.findUnique({ where: { id: 'default' } }),
  ])

  const langLabel = settings?.language === 'en' ? 'English' : 'Nederlands'

  const quickActions = [
    { href: '/admin/gallery',      emoji: '🖼️', title: 'Manage Gallery',    sub: 'Upload & reorder project photos' },
    { href: '/admin/about',        emoji: '📝', title: 'Edit About',         sub: 'Update your company description' },
    { href: '/admin/services',     emoji: '⚙️', title: 'Edit Services',      sub: 'Manage your service offerings' },
    { href: '/admin/contact',      emoji: '📞', title: 'Edit Contact',       sub: 'Update phone, email & location' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#F2EEE6', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Dashboard
        </h1>
        <p style={{ color: '#6B6B68', fontSize: '0.85rem' }}>
          Welcome back, {session?.user?.email}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        <StatCard label="Gallery Photos" value={String(galleryCount)} />
        <StatCard label="Content Blocks" value={String(contentCount)} />
        <StatCard label="Site Language" value={langLabel} teal />
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: '#9A9A96', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Quick Actions
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              style={{
                background: '#131310',
                border: '1px solid #2A2A28',
                borderRadius: 8,
                padding: '1.25rem 1.5rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'border-color 0.2s',
              }}
              className="quick-action-card"
            >
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{a.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#F2EEE6', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                  {a.title}
                </div>
                <div style={{ color: '#6B6B68', fontSize: '0.78rem' }}>{a.sub}</div>
              </div>
              <span style={{ color: '#2ABFA8', fontSize: '1.1rem', flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, teal }: { label: string; value: string; teal?: boolean }) {
  return (
    <div
      style={{
        background: '#1A1A18',
        border: '1px solid #2A2A28',
        borderRadius: 8,
        padding: '1.5rem',
      }}
    >
      <p style={{ fontSize: '1.75rem', fontWeight: 700, color: teal ? '#2ABFA8' : '#F2EEE6', marginBottom: '0.35rem' }}>
        {value}
      </p>
      <p style={{ fontSize: '0.82rem', color: '#6B6B68' }}>{label}</p>
    </div>
  )
}
