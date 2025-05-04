'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
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

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 overflow-hidden"
          >
            <div className="px-4 py-5 space-y-4">
              {links.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-500 hover:text-blue font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div>
                <button
                  type="button"
                  className="flex items-center justify-between w-full text-gray-500 hover:text-blue font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                >
                  <span>Mais</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-2 mt-2"
                    >
                      {moreLinks.map(link => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="flex items-center text-gray-400 hover:text-blue py-2 transition-colors duration-200"
                          onClick={() => {
                            setIsMoreOpen(false)
                            setIsOpen(false)
                          }}
                        >
                          <ChevronRight className="h-4 w-4 mr-2" />
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 flex flex-col space-y-4">
                <Link href="/contato" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-center font-medium"
                  >
                    Contato
                  </Button>
                </Link>

                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-center bg-blue hover:bg-blue/90 text-white font-medium">
                    Registro / Login
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
