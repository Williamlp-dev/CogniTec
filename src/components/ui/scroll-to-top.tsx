'use client'

import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg shadow-lg w-12 h-12"
        aria-label="Voltar ao topo"
      >
        <ChevronUp className="h-6 w-6" />
      </Button>
    </div>
  )
}
