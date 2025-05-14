"use client"

import { AnimatePresence, motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export default function Home() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="home" ref={sectionRef} className="min-h-screen relative">
      <div className="absolute inset-0">
        <Image
          src="/assets/img/cabeca3.png"
          alt="Background cerebral"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
            mixBlendMode: "overlay",
            filter: "brightness(0.3)",
          }}
          className="z-0"
        />
      </div>

      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-center justify-center h-screen text-center px-4 z-20"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="block font-poppins mb-2"
              >
                Cognitec
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="block font-poppins"
              >
                Soluções de IA para Alzheimer
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="text-amber-300 font-poppins"
                >
                  .
                </motion.span>
              </motion.span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
