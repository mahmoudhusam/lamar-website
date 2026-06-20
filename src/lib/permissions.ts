import type { Role } from '@/generated/prisma/client'

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ['*'],
  PROJECTS_EDITOR: ['/admin/projects'],
  CONTENT_EDITOR: ['/admin/about', '/admin/werkwijze', '/admin/offerte', '/admin/testimonials', '/admin/contact', '/admin/leads', '/admin/teksten', '/admin/reviews-bar'],
}

export function canAccess(role: Role, path: string): boolean {
  const perms = ROLE_PERMISSIONS[role]
  if (!perms) return false // unknown / cleared role → deny
  if (perms.includes('*')) return true
  // Always allow the dashboard root and account page for all roles
  if (path === '/admin' || path === '/admin/account') return true
  return perms.some((p) => path === p || path.startsWith(p + '/'))
}
