'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import type { Role } from '@/generated/prisma/client'

async function requireSuperAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    throw new Error('Forbidden')
  }
  return session
}

export async function createUser(data: {
  name: string
  email: string
  password: string
  role: Role
}) {
  await requireSuperAdmin()
  const hashed = await bcrypt.hash(data.password, 10)
  await prisma.user.create({
    data: { name: data.name, email: data.email, password: hashed, role: data.role },
  })
  revalidatePath('/admin')
  revalidatePath('/admin/users')
}

export async function updateUser(
  id: string,
  data: { name: string; email: string; role: Role }
) {
  await requireSuperAdmin()
  await prisma.user.update({ where: { id }, data })
  revalidatePath('/admin')
  revalidatePath('/admin/users')
}

export async function deleteUser(id: string) {
  const session = await requireSuperAdmin()

  if (session.user.id === id) {
    throw new Error('You cannot delete your own account.')
  }

  const superAdminCount = await prisma.user.count({ where: { role: 'SUPER_ADMIN' } })
  const targetUser = await prisma.user.findUnique({ where: { id } })
  if (targetUser?.role === 'SUPER_ADMIN' && superAdminCount <= 1) {
    throw new Error('Cannot delete the last SUPER_ADMIN.')
  }

  await prisma.user.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/admin/users')
}

export async function changePassword(
  id: string,
  currentPassword: string,
  newPassword: string
) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Not authenticated')

  if (session.user.id !== id) throw new Error('You can only change your own password.')

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new Error('User not found.')

  const match = await bcrypt.compare(currentPassword, user.password)
  if (!match) throw new Error('Current password is incorrect.')

  const hashed = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({ where: { id }, data: { password: hashed } })
  revalidatePath('/admin')
}

export async function updateOwnProfile(data: { name: string; email: string }) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Not authenticated')

  await prisma.user.update({ where: { id: session.user.id }, data })
  revalidatePath('/admin')
  revalidatePath('/admin/account')
}
