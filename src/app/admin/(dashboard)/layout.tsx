import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import SignOutButton from '@/components/admin/SignOutButton'
import SidebarNav from '@/components/admin/SidebarNav'
import { canAccess } from '@/lib/permissions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/admin/login')

  const navLinks = [
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/about', label: 'About' },
    { href: '/admin/werkwijze', label: 'Process' },
    { href: '/admin/offerte', label: 'Quote' },
    { href: '/admin/testimonials', label: 'Reviews' },
    { href: '/admin/contact', label: 'Contact' },
    { href: '/admin/settings', label: 'Settings' },
    { href: '/admin/users', label: 'Users' },
  ].filter((link) => canAccess(session.user.role, link.href))

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F2F5F8' }}>
      {/* Sidebar */}
      <aside
        className="flex w-56 flex-col justify-between px-4 py-6"
        style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid rgba(20,24,29,0.10)' }}
      >
        <div>
          <div className="mb-8 px-2">
            <span className="text-lg font-bold tracking-widest" style={{ color: '#14181D' }}>LAMAR</span>
            <p className="text-xs" style={{ color: '#97A0AC' }}>Admin</p>
          </div>

          <SidebarNav navLinks={navLinks} />
        </div>

        <div className="space-y-2 px-0">
          <a
            href="/admin/account"
            style={{
              display: 'block',
              padding: '0.4rem 0.5rem',
              fontSize: '0.78rem',
              color: '#5B6470',
              textDecoration: 'none',
              borderRadius: 4,
              marginBottom: '0.25rem',
            }}
          >
            {session.user.name ?? session.user.email}
            <span style={{ display: 'block', fontSize: '0.68rem', color: '#97A0AC' }}>My Account</span>
          </a>
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
