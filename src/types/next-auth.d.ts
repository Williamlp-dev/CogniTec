import "next-auth"
import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Estendendo o tipo User para incluir userType
   */
  interface User extends DefaultUser {
    userType?: string
    id: string
  }

  /**
   * Estendendo o tipo Session para incluir userType no objeto user
   */
  interface Session {
    user: {
      id: string
      userType?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * Estendendo o tipo JWT para incluir userType
   */
  interface JWT {
    userType?: string
    id: string
  }
}
