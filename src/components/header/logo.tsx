'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl font-bold tracking-tight">Cognitec</span>
        <span className="text-xl font-bold text-yellow-400">.</span>
      </motion.div>
    </Link>
  )
}
