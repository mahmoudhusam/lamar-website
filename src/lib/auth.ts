import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import type { Role } from '@/generated/prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role: Role
    }
  }
  interface User {
    id: string
    name: string
    email: string
    role: Role
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if (!passwordMatch) return null

        return { id: user.id, name: user.name, email: user.email, role: user.role }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in: trust the freshly-authenticated user.
      if (user) {
        token.id = user.id
        token.role = user.role
        return token
      }
      // Subsequent calls: re-read the user so role changes and deletions take
      // effect immediately, instead of waiting for the JWT to expire.
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id },
            select: { role: true },
          })
          if (dbUser) {
            token.role = dbUser.role
          } else {
            // User was deleted → invalidate the token identity.
            token.id = ''
          }
        } catch {
          // DB temporarily unavailable — keep the existing token rather than
          // locking everyone out on a transient blip.
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // Empty id signals a deleted user; guards/layout reject on missing id.
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
}
