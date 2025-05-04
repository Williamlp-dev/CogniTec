'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AuthButtons } from './auth-buttons'
import { Logo } from './logo'
import { MobileMenu } from './mobile-menu'
import { NavLinks } from './nav-links'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />

        <div className="flex items-center justify-end md:justify-center flex-1">
          <NavLinks />
          <MobileMenu />
        </div>

        <AuthButtons />
      </div>
    </motion.header>
  )
}
