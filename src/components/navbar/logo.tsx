import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center"
    >
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/assets/img/CogniTec-removebg-preview.png"
          alt="CogniTec Logo"
          width={150}
          height={50}
          className="h-10 w-auto"
          priority
        />
      </Link>
    </motion.div>
  )
}
