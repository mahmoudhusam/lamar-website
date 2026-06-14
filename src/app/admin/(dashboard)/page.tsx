import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canAccess } from '@/lib/permissions'

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>
}) {
  const params = await searchParams
  const denied = params.denied === '1'

  const session = await getServerSession(authOptions)
  const role = session?.user?.role
  const canSeeLeads = !role || canAccess(role, '/admin/leads')

  // eslint-disable-next-line react-hooks/purity -- server component renders once per request
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [
    publishedProjects,
    totalProjects,
    newLeads,
    leadsThisWeek,
    totalLeads,
    recentLeads,
  ] = await Promise.all([
    prisma.project.count({ where: { published: true } }),
    prisma.project.count(),
    canSeeLeads ? prisma.lead.count({ where: { status: 'NEW' } }) : Promise.resolve(0),
    canSeeLeads ? prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }) : Promise.resolve(0),
    canSeeLeads ? prisma.lead.count() : Promise.resolve(0),
    canSeeLeads
      ? prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
      : Promise.resolve([]),
  ]).catch(() => [0, 0, 0, 0, 0, []] as const)

  const quickActions = [
    { href: '/admin/projects',     emoji: '🏗️', title: 'Manage Projects', sub: 'Add, edit & publish your portfolio' },
    { href: '/admin/about',        emoji: '📝', title: 'Edit About',      sub: 'Update your about (Over ons) page text' },
    { href: '/admin/werkwijze',    emoji: '🛠️', title: 'Edit Process',    sub: 'Steps, headings & banner of the Werkwijze page' },
    { href: '/admin/offerte',      emoji: '💬', title: 'Edit Quote',      sub: 'WhatsApp number & Offerte page intro' },
    { href: '/admin/testimonials', emoji: '⭐', title: 'Edit Reviews',     sub: 'Manage customer testimonials' },
    { href: '/admin/contact',      emoji: '📞', title: 'Edit Contact',     sub: 'Update phone, email & location' },
  ].filter((a) => !role || canAccess(role, a.href))

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: canSeeLeads ? '1.5rem' : '2.5rem' }}>
        {canSeeLeads && <StatCard label="New Leads" value={String(newLeads)} teal />}
        {canSeeLeads && <StatCard label="Leads (7 days)" value={String(leadsThisWeek)} />}
        <StatCard label="Published Projects" value={String(publishedProjects)} />
        <StatCard label="Total Projects" value={String(totalProjects)} />
      </div>

      {/* Recent leads */}
      {canSeeLeads && (
        <div style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '1.25rem 1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <p style={{ color: '#5B6470', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Recent Leads</p>
            <Link href="/admin/leads" style={{ color: '#1A6B60', fontSize: '0.78rem', textDecoration: 'none' }}>
              View all ({totalLeads}) →
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p style={{ color: '#97A0AC', fontSize: '0.82rem' }}>No enquiries yet — they&apos;ll appear here as they come in.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {recentLeads.map((lead, i) => (
                <Link
                  key={lead.id}
                  href="/admin/leads"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.6rem 0', textDecoration: 'none', borderTop: i === 0 ? 'none' : '1px solid rgba(20,24,29,0.07)' }}
                >
                  <div style={{ minWidth: 0 }}>
                    <span style={{ color: '#14181D', fontWeight: 600, fontSize: '0.85rem' }}>{lead.name}</span>
                    <span style={{ color: '#97A0AC', fontSize: '0.78rem', marginLeft: '0.6rem' }}>
                      {lead.source === 'QUOTE' ? '🧾 Offerte' : '📞 Contact'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
                    {lead.status === 'NEW' && (
                      <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#1A6B60', background: 'rgba(42,191,168,0.14)', borderRadius: 999, padding: '0.12rem 0.55rem' }}>Nieuw</span>
                    )}
                    <span style={{ color: '#97A0AC', fontSize: '0.74rem' }}>
                      {new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short' }).format(new Date(lead.createdAt))}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

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
