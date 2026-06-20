import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { canAccess } from '@/lib/permissions'

/**
 * Server-action authorization helpers.
 *
 * Route middleware (src/proxy.ts) protects *navigation*, but server actions are
 * independently-callable POST endpoints. Every mutating action must therefore
 * re-check the session and role itself — middleware is not a security boundary
 * for mutations.
 */

export async function requireSession() {
  const session = await getServerSession(authOptions)
  // A missing id means the user was deleted (the jwt callback clears it).
  if (!session?.user?.id) throw new Error('Not authenticated')
  return session
}

/** Ensure the current user may act on the given admin section (mirrors canAccess). */
export async function requireAccess(path: string) {
  const session = await requireSession()
  if (!canAccess(session.user.role, path)) {
    throw new Error('Forbidden')
  }
  return session
}

/** Ensure the current user is a SUPER_ADMIN (user management, etc.). */
export async function requireSuperAdmin() {
  const session = await requireSession()
  if (session.user.role !== 'SUPER_ADMIN') {
    throw new Error('Forbidden')
  }
  return session
}
