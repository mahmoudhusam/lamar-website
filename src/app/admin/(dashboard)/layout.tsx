import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import SignOutButton from '@/components/admin/SignOutButton'
import SidebarNav from '@/components/admin/SidebarNav'

const navLinks = [
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/about', label: 'About' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/contact', label: 'Contact' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/settings', label: 'Settings' },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0C0C0A' }}>
      {/* Sidebar */}
      <aside
        className="flex w-56 flex-col justify-between px-4 py-6"
        style={{ backgroundColor: '#111110', borderRight: '1px solid #1F1F1D' }}
      >
        <div>
          <div className="mb-8 px-2">
            <span className="text-lg font-bold tracking-widest text-white">LAMAR</span>
            <p className="text-xs" style={{ color: '#6B6B68' }}>Admin</p>
          </div>

          <SidebarNav navLinks={navLinks} />
        </div>

        <div className="space-y-2 px-0">
          <p className="truncate px-2 text-xs" style={{ color: '#6B6B68' }}>
            {session.user?.email}
          </p>
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
