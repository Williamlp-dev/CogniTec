'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function TestimonialCarousel() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const testimonials = [
    {
      name: 'Ana Beatriz Costa',
      role: 'Enfermeira de Cuidados Domiciliares',
      rating: 5,
      quote:
        'Com a Cognitec, consigo organizar os medicamentos e compromissos dos pacientes com Alzheimer de forma clara. Uma ferramenta indispensável no meu dia a dia.',
      image: '/assets/img/He.jpg',
    },
    {
      name: 'Eduardo Silva',
      role: 'Responsável Técnico em Clínica',
      rating: 5,
      quote:
        'Estamos utilizando a Cognitec em nossa clínica para otimizar o acompanhamento dos pacientes. A integração com os cuidadores tem feito toda a diferença na evolução dos casos.',
      image: '/assets/img/hc.jpg',
    },
    {
      name: 'Mariana Lopes',
      role: 'Cuidadora Profissional',
      rating: 5,
      quote:
        'O aplicativo da Cognitec facilitou minha rotina de cuidados com os pacientes. Agora consigo acompanhar lembretes e registrar informações de forma prática e segura.',
      image: '/assets/img/mc.jpg',
    },
    {
      name: 'Rodrigo Menezes',
      role: 'Filho e Cuidador Familiar',
      rating: 5,
      quote:
        'Minha mãe foi diagnosticada com Alzheimer recentemente, e a Cognitec tem sido essencial para monitorar sua rotina e garantir mais segurança no dia a dia.',
      image: '/assets/img/team-3.jpg',
    },
    {
      name: 'Dr. Lucas Ferreira',
      role: 'Geriatra',
      rating: 5,
      quote:
        'Recomendo a Cognitec aos meus pacientes e familiares. A interface é intuitiva e contribui muito para a adesão ao tratamento e registro de comportamentos importantes.',
      image: '/assets/img/Hg.jpg',
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="relative w-full min-h-[500px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/cabeca.jpg"
          alt="Background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          O que nossos usuários dizem
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={testimonial.image || '/placeholder.svg'}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <p className="text-white font-bold text-xl text-center">
                  {testimonial.name}
                </p>

                <p className="text-gray-300 text-center mb-4">
                  {testimonial.role}
                </p>

                <div className="flex justify-center mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                </div>
                <blockquote className="text-white text-lg md:text-xl text-center italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
