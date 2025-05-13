"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ChevronRight, LogOut, Menu, Settings, User, X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

const links = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Serviços", href: "/servicos" },
  { name: "Planos", href: "/planos" },
  { name: "Contato", href: "/contato" },
]

const moreLinks = [
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Recursos", href: "/recursos" },
  { name: "Parceiros", href: "/parceiros" },
]

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.3,
    },
  }),
}

const subItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.03 * i,
      duration: 0.2,
    },
  }),
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <div>
      <Button
        variant="ghost"
        className="
        hover:bg-gray-900"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 overflow-hidden"
          >
            <div className="px-4 py-5 space-y-4">
              {links.map((link, index) => (
                <motion.div
                  key={link.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href={link.href}
                    className="block text-gray-500 hover:text-blue font-poppins font-medium py-2 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div>
                <motion.button
                  custom={links.length}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 5 }}
                  type="button"
                  className="flex items-center justify-between w-full text-gray-500 hover:text-blue font-poppins font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                >
                  <span>Mais</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`}
                  />
                </motion.button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-2 mt-2"
                    >
                      {moreLinks.map((link, idx) => (
                        <motion.div
                          key={link.name}
                          custom={idx}
                          initial="hidden"
                          animate="visible"
                          variants={subItemVariants}
                          whileHover={{ scale: 1.03, x: 5 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Link
                            href={link.href}
                            className="flex items-center font-poppins text-gray-400 hover:text-blue py-2 transition-colors duration-200"
                            onClick={() => {
                              setIsMoreOpen(false)
                              setIsOpen(false)
                            }}
                          >
                            <ChevronRight className="h-4 w-4 mr-2" />
                            {link.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                custom={links.length + 1}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="pt-4"
              >
                {session ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
                        {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{session.user?.name}</p>
                        <p className="text-xs text-gray-500">{session.user?.email}</p>
                      </div>
                    </div>

                    <Link href="/perfil" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Perfil
                      </Button>
                    </Link>

                    <Link href="/perfil/configuracoes" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Configurações
                      </Button>
                    </Link>

                    <Button
                      className="w-full justify-start bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                      onClick={() => {
                        signOut({ redirect: false })
                        setIsOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center bg-blue hover:bg-blue/90 text-white font-poppins font-medium">
                      Registro / Login
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
