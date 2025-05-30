import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import type { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db"

// Credenciais do administrador (idealmente, devem vir de variáveis de ambiente)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@cognitec.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Verificar se é o administrador
        if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
          return {
            id: "admin-id",
            email: ADMIN_EMAIL,
            name: "Administrador",
            isAdmin: true,
          } as User
        }

        // Se não for o administrador, verificar no banco de dados
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password || "")

        if (!isPasswordValid) {
          return null
        }

        // Retornar um objeto compatível com o tipo User do NextAuth
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          userType: user.userType || undefined,
          isAdmin: false, // Usuários normais não são administradores
        } as User
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          userType: user.userType,
          isAdmin: user.isAdmin,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          userType: token.userType,
          isAdmin: token.isAdmin,
        },
      }
    },
  },
}
