'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import type { Role } from '@/generated/prisma/client'
import { requireSuperAdmin } from '@/lib/guards'

const MIN_PASSWORD = 8

const emailSchema = z.email('Please enter a valid email address.')

export async function createUser(data: {
  name: string
  email: string
  password: string
  role: Role
}) {
  await requireSuperAdmin()

  const name = data.name.trim()
  if (!name) throw new Error('Name is required.')
  const email = emailSchema.parse(data.email.trim().toLowerCase())
  if (data.password.length < MIN_PASSWORD) {
    throw new Error(`Password must be at least ${MIN_PASSWORD} characters.`)
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new Error('A user with that email already exists.')

  const hashed = await bcrypt.hash(data.password, 10)
  await prisma.user.create({
    data: { name, email, password: hashed, role: data.role },
  })
  revalidatePath('/admin')
  revalidatePath('/admin/users')
}

export async function updateUser(
  id: string,
  data: { name: string; email: string; role: Role }
) {
  await requireSuperAdmin()

  const name = data.name.trim()
  if (!name) throw new Error('Name is required.')
  const email = emailSchema.parse(data.email.trim().toLowerCase())

  const clash = await prisma.user.findUnique({ where: { email } })
  if (clash && clash.id !== id) {
    throw new Error('A user with that email already exists.')
  }

  await prisma.user.update({ where: { id }, data: { name, email, role: data.role } })
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
  if (!session?.user?.id) throw new Error('Not authenticated')

  if (session.user.id !== id) throw new Error('You can only change your own password.')

  if (newPassword.length < MIN_PASSWORD) {
    throw new Error(`New password must be at least ${MIN_PASSWORD} characters.`)
  }

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
  if (!session?.user?.id) throw new Error('Not authenticated')

  const name = data.name.trim()
  if (!name) throw new Error('Name is required.')
  const email = emailSchema.parse(data.email.trim().toLowerCase())

  const clash = await prisma.user.findUnique({ where: { email } })
  if (clash && clash.id !== session.user.id) {
    throw new Error('A user with that email already exists.')
  }

  await prisma.user.update({ where: { id: session.user.id }, data: { name, email } })
  revalidatePath('/admin')
  revalidatePath('/admin/account')
}
