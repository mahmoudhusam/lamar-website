import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AccountClient from './AccountClient'

export default async function AccountPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  // id may be absent in stale sessions issued before the RBAC migration
  const user = session.user.id
    ? await prisma.user.findUnique({ where: { id: session.user.id } })
    : await prisma.user.findUnique({ where: { email: session.user.email! } })
  if (!user) redirect('/admin/login')

  return <AccountClient id={user.id} name={user.name} email={user.email} role={user.role} />
}
