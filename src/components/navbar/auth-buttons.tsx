'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function AuthButtons() {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/contato">
          <Button variant="outline" className="font-medium">
            Contato
          </Button>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/login">
          <Button className="bg-blue text-white font-medium hover:bg-blue/90">
            Registro / Login
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
