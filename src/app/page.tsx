import About from '@/components/pages/About'
import TestimonialCarousel from '@/components/pages/Comments'
import Contact from '@/components/pages/Contact'
import { Footer } from '@/components/pages/Footer'
import Home from '@/components/pages/Home'
import Qa from '@/components/pages/Qa'
import Service from '@/components/pages/Service'

export default function Pages() {
  return (
    <main>
      <Home />
      <About />
      <Service />
      <Qa />
      <TestimonialCarousel />
      <Contact />
      <Footer />
    </main>
  )
}
