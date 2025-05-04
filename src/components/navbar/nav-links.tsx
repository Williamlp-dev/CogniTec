'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const links = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Planos', href: '/planos' },
]

const moreLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Recursos', href: '/recursos' },
  { name: 'Parceiros', href: '/parceiros' },
]

export function NavLinks() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {links.map(link => (
        <motion.div
          key={link.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={link.href}
            className="text-gray-500 hover:text-blue font-medium transition-colors duration-200"
          >
            {link.name}
          </Link>
        </motion.div>
      ))}

      <div className="relative">
        <motion.button
          className="flex items-center text-gray-500 hover:text-blue font-medium transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Mais
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 z-10"
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="py-1">
                {moreLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-blue transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
