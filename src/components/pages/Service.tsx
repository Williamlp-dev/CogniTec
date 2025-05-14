"use client"

import { AnimatePresence, motion, useInView } from "framer-motion"
import { Cpu, HeartPulse, MessageSquareText, ShieldIcon as ShieldUser, Smartphone, Users2 } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import CardSc from "../ui/cardsc"
import TitleSection from "../ui/titlesection"

export default function Service() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="servicos" ref={sectionRef} className="py-16 overflow-hidden">
      <AnimatePresence>
        {isInView && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TitleSection subtitle="Serviços" title="Conheça Nossos Serviços" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="container mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Card Original - Alzheimer */}
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <CardSc
                    title="Desenvolvimento De Soluções Para Alzheimer"
                    description="Criaremos tecnologias acessíveis e inovadoras para melhorar a interação e bem-estar dos pacientes com Alzheimer."
                    Icon={HeartPulse}
                  />
                </motion.div>

                {/* Card de Suporte */}
                <motion.div
                  custom={1}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <CardSc
                    title="Suporte a Cuidadores e Familiares"
                    description="Oferecemos ferramentas para facilitar o cuidado diário e melhorar a comunicação entre pacientes e cuidadores."
                    Icon={Users2}
                  />
                </motion.div>

                {/* Card de Monitoramento */}
                <motion.div
                  custom={2}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <CardSc
                    title="IA para Monitoramento de Pacientes"
                    description="Implementamos IA para ajudar no monitoramento e na personalização do cuidado dos pacientes, proporcionando maior segurança."
                    Icon={Cpu}
                  />
                </motion.div>

                {/* Card de APP */}
                <motion.div
                  custom={3}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <CardSc
                    title="Aplicativo Cognitec"
                    description="Desenvolvemos um aplicativo intuitivo para facilitar a navegação de pacientes com Alzheimer e a interação com seus cuidadores."
                    Icon={Smartphone}
                  />
                </motion.div>

                {/* Card de Privacidade */}
                <motion.div
                  custom={4}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <CardSc
                    title="Segurança e Privacidade"
                    description="Garantimos que todas as interações com a nossa tecnologia sejam seguras e que as informações dos pacientes sejam tratadas com a máxima privacidade."
                    Icon={ShieldUser}
                  />
                </motion.div>

                {/* Card de Suporte */}
                <motion.div
                  custom={5}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <CardSc
                    title="Suporte e Assistência"
                    description="Oferecemos suporte técnico para garantir que a tecnologia esteja sempre funcionando perfeitamente para pacientes e cuidadores."
                    Icon={MessageSquareText}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Seção CTA com imagem de fundo */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative w-full mt-20 h-[280px] sm:h-[320px] md:h-[360px]"
            >
              <Image
                src="/assets/img/cabeca.jpg"
                alt="Imagem representativa de saúde mental"
                fill
                className="object-cover brightness-50"
                priority
              />
              {/* Conteúdo sobreposto à imagem */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-8 max-w-5xl mx-auto"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                >
                  Entre em Contato Conosco
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="max-w-2xl text-sm sm:text-base md:text-lg mb-6 opacity-90"
                >
                  Saiba mais sobre como podemos ajudar na qualidade de vida de pacientes com Alzheimer e seus
                  cuidadores. Entre em contato para mais informações e parceria.
                </motion.p>

                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 191, 36, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  href="/contato"
                  className="px-6 py-3 border border-white rounded-md hover:bg-amber-400 hover:border-amber-400 hover:text-black transition-all duration-300 text-sm sm:text-base font-medium"
                  aria-label="Saiba mais sobre nossos serviços"
                >
                  Saiba Mais
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
