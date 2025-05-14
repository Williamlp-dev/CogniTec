import "next-auth"
import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Estendendo o tipo User para incluir userType e isAdmin
   */
  interface User extends DefaultUser {
    userType?: string
    isAdmin?: boolean
    id: string
  }

  /**
   * Estendendo o tipo Session para incluir userType e isAdmin no objeto user
   */
  interface Session {
    user: {
      id: string
      userType?: string
      isAdmin?: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * Estendendo o tipo JWT para incluir userType e isAdmin
   */
  interface JWT {
    userType?: string
    isAdmin?: boolean
    id: string
  }
}
