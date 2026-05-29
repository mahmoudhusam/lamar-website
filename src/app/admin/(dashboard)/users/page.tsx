import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import UsersClient from './UsersClient'

export default async function UsersPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    redirect('/admin?denied=1')
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } })

  return <UsersClient users={users} currentUserId={session.user.id} />
}
