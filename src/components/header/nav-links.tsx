'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const links = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Serviços', href: '#servicos' },
  { name: 'Planos', href: '#planos' },
  { name: 'Contato', href: '#contato' },
]

const moreLinks = [
  { name: 'Blog', href: '#faq' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Recursos', href: '#faq' },
  { name: 'Parceiros', href: '#faq' },
]

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.3,
    },
  }),
}

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.2,
    },
  }),
}

export function NavLinks() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="flex items-center justify-center space-x-4 xl:space-x-8">
      {links.map((link, index) => (
        <motion.div
          key={link.name}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={navItemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={link.href}
            className="text-white hover:text-blue font-medium font-poppins transition-colors duration-200"
          >
            {link.name}
          </Link>
        </motion.div>
      ))}

      <div className="relative" ref={dropdownRef}>
        <motion.button
          className="flex items-center text-white hover:text-blue font-medium font-poppins transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          custom={links.length}
          initial="hidden"
          animate="visible"
          variants={navItemVariants}
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
            >
              <div className="py-1">
                {moreLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={dropdownItemVariants}
                    whileHover={{ scale: 1.02, x: 2 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-2 text-sm font-poppins text-gray-500 hover:bg-gray-100 hover:text-blue transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
