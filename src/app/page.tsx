import About from '@/components/pages/About'
import TestimonialCarousel from '@/components/pages/Comments'
import Contact from '@/components/pages/Contact'
import { Footer } from '@/components/pages/Footer'
import Home from '@/components/pages/Home'
import QA from '@/components/pages/QA'
import Service from '@/components/pages/Service'

export default function Pages() {
  return (
    <main>
      <Home />
      <About />
      <Service />
      <QA />
      <TestimonialCarousel />
      <Contact />
      <Footer />
    </main>
  )
}
