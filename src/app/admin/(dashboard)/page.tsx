import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  const [galleryCount, contentCount] = await Promise.all([
    prisma.galleryItem.count(),
    prisma.content.count(),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm" style={{ color: '#6B6B68' }}>
          Welcome back, {session?.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Gallery Photos" value={galleryCount} />
        <StatCard label="Content Blocks" value={contentCount} />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: '#1A1A18', border: '1px solid #2A2A28' }}
    >
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm" style={{ color: '#6B6B68' }}>{label}</p>
    </div>
  )
}
