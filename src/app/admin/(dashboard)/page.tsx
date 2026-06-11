import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>
}) {
  const params = await searchParams
  const denied = params.denied === '1'

  const session = await getServerSession(authOptions)

  const [projectCount, totalProjects, contentCount] = await Promise.all([
    prisma.project.count({ where: { published: true } }),
    prisma.project.count(),
    prisma.content.count(),
  ]).catch(() => [0, 0, 0] as const)

  const quickActions = [
    { href: '/admin/projects',     emoji: '🏗️', title: 'Manage Projects', sub: 'Add, edit & publish your portfolio' },
    { href: '/admin/about',        emoji: '📝', title: 'Edit Over Ons',    sub: 'Update your about-page text' },
    { href: '/admin/werkwijze',    emoji: '🛠️', title: 'Edit Werkwijze',  sub: 'Steps, headings & banner slogan' },
    { href: '/admin/offerte',      emoji: '💬', title: 'Edit Offerte',     sub: 'WhatsApp number & intro text' },
    { href: '/admin/testimonials', emoji: '⭐', title: 'Edit Reviews',     sub: 'Manage customer testimonials' },
    { href: '/admin/contact',      emoji: '📞', title: 'Edit Contact',     sub: 'Update phone, email & location' },
  ]

  return (
    <div>
      {denied && (
        <div style={{ background: 'rgba(224,92,92,0.1)', border: '1px solid rgba(224,92,92,0.35)', borderRadius: 6, padding: '0.75rem 1rem', marginBottom: '1.5rem', color: '#E05C5C', fontSize: '0.85rem' }}>
          You don&apos;t have permission to access that page.
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Dashboard
        </h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
          Welcome back, {session?.user?.name ?? session?.user?.email}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        <StatCard label="Published Projects" value={String(projectCount)} teal />
        <StatCard label="Total Projects" value={String(totalProjects)} />
        <StatCard label="Content Blocks" value={String(contentCount)} />
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: '#5B6470', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Quick Actions
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              style={{
                background: '#F2F5F8',
                border: '1px solid rgba(20,24,29,0.10)',
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
                <div style={{ color: '#14181D', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                  {a.title}
                </div>
                <div style={{ color: '#97A0AC', fontSize: '0.78rem' }}>{a.sub}</div>
              </div>
              <span style={{ color: '#1A6B60', fontSize: '1.1rem', flexShrink: 0 }}>→</span>
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
        background: '#FFFFFF',
        border: '1px solid rgba(20,24,29,0.10)',
        borderRadius: 8,
        padding: '1.5rem',
      }}
    >
      <p style={{ fontSize: '1.75rem', fontWeight: 700, color: teal ? '#2ABFA8' : '#14181D', marginBottom: '0.35rem' }}>
        {value}
      </p>
      <p style={{ fontSize: '0.82rem', color: '#97A0AC' }}>{label}</p>
    </div>
  )
}
