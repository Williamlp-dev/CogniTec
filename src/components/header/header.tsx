'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { AuthButtons } from './auth-buttons'
import { Logo } from './logo'
import { MobileMenu } from './mobile-menu'
import { NavLinks } from './nav-links'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial state
    handleResize()

    // Add event listeners
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [scrolled])

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Logo />
          </motion.div>

          {/* Use custom breakpoint at 1020px instead of Tailwind's lg */}
          <div
            className={`${isMobile ? 'hidden' : 'flex'} flex-1 justify-center`}
          >
            <NavLinks />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center"
          >
            {/* Only show AuthButtons on larger screens (above 1020px) */}
            <div className={isMobile ? 'hidden' : 'block'}>
              <AuthButtons />
            </div>

            {/* Show MobileMenu below 1020px */}
            <div className={isMobile ? 'block' : 'hidden'}>
              <MobileMenu />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
