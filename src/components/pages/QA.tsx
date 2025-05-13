"use client"

import type React from "react"

import { AnimatePresence, motion, useInView } from "framer-motion"
import { Brain, ChevronDown, Users, Wifi } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

export default function QA() {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>("question1")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const toggleQuestion = (questionId: string) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null)
    } else {
      setExpandedQuestion(questionId)
    }
  }

  interface QuestionItem {
    id: string
    icon: React.ReactNode
    question: string
    answer: string
  }

  const questions: QuestionItem[] = [
    {
      id: "question1",
      icon: <Wifi className="text-yellow-400 mr-2" />,
      question: "O aplicativo Cognitec funciona offline?",
      answer:
        "Sim, o aplicativo Cognitec foi projetado para funcionar offline em sua maior parte. Os exercícios cognitivos e o acompanhamento diário podem ser realizados sem conexão com a internet. No entanto, algumas funcionalidades como sincronização de dados, atualizações de conteúdo e relatórios avançados para os cuidadores necessitam de conexão com a internet ocasionalmente. Recomendamos conectar o dispositivo à internet pelo menos uma vez por semana para garantir que todos os dados sejam sincronizados corretamente.",
    },
    {
      id: "question2",
      icon: <Users className="text-yellow-400 mr-2" />,
      question: "É possível cadastrar mais de um paciente no mesmo perfil?",
      answer: "Esta funcionalidade ainda não está disponível em nossa versão atual.",
    },
    {
      id: "question3",
      icon: <Brain className="text-yellow-400 mr-2" />,
      question: "Como a Inteligência Artificial é usada no app?",
      answer: "Esta funcionalidade ainda não está disponível em nossa versão atual.",
    },
  ]

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 py-20">
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold mb-4 font-heading"
              >
                Perguntas <span className="text-yellow-400">Frequentes</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-gray-600 mb-8 font-sans"
              >
                Aqui você encontra respostas para dúvidas comuns sobre a Cognitec e nossas soluções para Alzheimer.
              </motion.p>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50"
                      onClick={() => toggleQuestion(q.id)}
                    >
                      <div className="flex items-center">
                        {q.icon}
                        <span className="font-medium">{q.question}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedQuestion === q.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="text-yellow-400" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedQuestion === q.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700">{q.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2 w-full flex justify-center"
            >
              <div className="relative w-full h-72 sm:h-72 md:h-[400px] lg:h-[400px] max-w-lg">
                <Image
                  src="/assets/img/Pergunta.jpg"
                  alt="Perguntas Frequentes Cognitec"
                  fill
                  className="rounded-lg shadow-xl object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
