"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { UserProfile } from "./user-profile"

export function AuthButtons() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
  }

  if (session) {
    return <UserProfile />
  }

  return (
    <div className="flex items-center space-x-6">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/login">
          <Button className="bg-blue text-white font-medium hover:bg-blue/90">Registro / Login</Button>
        </Link>
      </motion.div>
    </div>
  )
}
