import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { canAccess } from '@/lib/permissions'
import type { Role } from '@/generated/prisma/client'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isLoginPage = pathname === '/admin/login'

  if (!token) {
    if (isLoginPage) return NextResponse.next()
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  const role = token.role as Role | undefined
  if (role && !canAccess(role, pathname)) {
    return NextResponse.redirect(new URL('/admin?denied=1', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
