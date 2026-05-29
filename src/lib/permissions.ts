import type { Role } from '@/generated/prisma/client'

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ['*'],
  PROJECTS_EDITOR: ['/admin/projects'],
  CONTENT_EDITOR: ['/admin/services', '/admin/about', '/admin/testimonials', '/admin/contact'],
  GALLERY_EDITOR: ['/admin/gallery'],
}

export function canAccess(role: Role, path: string): boolean {
  const perms = ROLE_PERMISSIONS[role]
  if (perms.includes('*')) return true
  // Always allow the dashboard root and account page for all roles
  if (path === '/admin' || path === '/admin/account') return true
  return perms.some((p) => path === p || path.startsWith(p + '/'))
}
