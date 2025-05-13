'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AuthButtons } from './auth-buttons'
import { Logo } from './logo'
import { MobileMenu } from './mobile-menu'
import { NavLinks } from './nav-links'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [renderHeader, setRenderHeader] = useState(true)

  useEffect(() => {
    if (pathname === '/login') {
      setRenderHeader(false)
    } else {
      setRenderHeader(true)
    }
  }, [pathname])

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

    handleResize()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [scrolled])

  if (!renderHeader) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[color-mix(in_srgb,var(--background-color),black_30%)] shadow-md py-2'
          : 'bg-[color-mix(in_srgb,var(--background-color),transparent_30%)] backdrop-blur-sm py-4'
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
            <div className={isMobile ? 'hidden' : 'block'}>
              <AuthButtons />
            </div>

            <div className={isMobile ? 'block' : 'hidden'}>
              <MobileMenu />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
