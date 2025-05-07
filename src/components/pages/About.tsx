'use client'

import { motion } from 'framer-motion'
import { CheckCheck, HeartPulse, Pill, ShieldPlus, Smile } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <section className="min-h-screen max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="order-2 md:order-1 md:w-1/2">
          <div className="prose max-w-none">
            <h3 className="text-2xl font-poppins font-medium mt-8 mb-4">
              Sobre a CogniTec
            </h3>
            <p className="text-lg font-poppins">
              Somos uma empresa de tecnologia dedicada a criar soluções
              inovadoras para melhorar a qualidade de vida das pessoas, com foco
              especial em indivíduos com Alzheimer e seus responsáveis, sejam
              cuidadores ou familiares. Nosso objetivo é facilitar a navegação e
              proporcionar um ambiente digital seguro e acolhedor.
            </p>

            <h3 className="text-2xl font-poppins font-medium mt-8 mb-4">
              O que é ODS?
            </h3>
            <p className="text-lg font-poppins">
              ODS significa Objetivos de Desenvolvimento Sustentável. São 17
              objetivos e 169 metas globais, estabelecidos pela Agenda 2030 da
              ONU, que visam alcançar até 2030 a erradicação da pobreza, a
              proteção do planeta e a garantia da paz e prosperidade para todos.
              Em resumo: Os ODS são um plano global para um futuro melhor, com
              foco em desenvolvimento sustentável, que abrange dimensões
              sociais, ambientais e económicas.
            </p>

            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-2">
                <CheckCheck
                  className="text-yellow-400 mt-1 flex-shrink-0"
                  size={20}
                />
                <p className="m-0 font-poppins">
                  <span className="font-semibold">Agenda 2030:</span> Os ODS são
                  parte integrante da Agenda 2030, um plano global da ONU para a
                  erradicação da pobreza e o desenvolvimento sustentável.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCheck
                  className="text-yellow-400 mt-1 flex-shrink-0"
                  size={20}
                />
                <p className="m-0 font-poppins">
                  <span className="font-semibold">Objetivos:</span> Acabar com a
                  pobreza e a fome, garantir saúde e educação de qualidade,
                  combater as desigualdades e as mudanças climáticas, e promover
                  a igualdade de género.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCheck
                  className="text-yellow-400 mt-1 flex-shrink-0"
                  size={20}
                />
                <p className="m-0 font-poppins">
                  <span className="font-semibold">Metas:</span> Cada objetivo
                  tem metas específicas para serem alcançadas até 2030.
                </p>
              </div>
            </div>

            <p className="mt-6 font-poppins">
              Nosso trabalho busca excelência com responsabilidade e ética.
              Valorizamos a experiência do usuário e promovemos inovação com
              propósito.
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2 md:w-1/2 flex items-center justify-center">
          <div className="relative w-full h-80 md:h-[500px]">
            <Image
              src="/assets/img/logo.png"
              alt="Logo CogniTec"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center my-16">
        <motion.div
          className="h-1 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '80%', opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="order-1 md:w-1/2">
          <div className="w-full flex items-center justify-center">
            <div className="relative w-full h-80 md:h-[500px]">
              <Image
                src="/assets/img/onu.jpeg"
                alt="Imagem ilustrativa"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="order-2 md:w-1/2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <HeartPulse
                className="text-yellow-400 flex-shrink-0 mt-1"
                size={36}
              />
              <div className="text-left font-poppins">
                <h3 className="text-xl  font-medium mb-2">
                  Melhorar a qualidade de vida de pacientes com Alzheimer
                </h3>
                <p>
                  Desenvolver soluções tecnológicas para melhorar a interação
                  dos pacientes com Alzheimer, proporcionando uma navegação
                  intuitiva e segura, e facilitando o acompanhamento por
                  cuidadores e familiares.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Pill className="text-yellow-400 flex-shrink-0 mt-1" size={36} />
              <div className="text-left font-poppins">
                <h3 className="text-xl font-medium mb-2">Combater epidemias</h3>
                <p>
                  Acabar com epidemias de AIDS, tuberculose, malária e doenças
                  tropicais negligenciadas, além de combater hepatite, doenças
                  transmitidas pela água e outras.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldPlus
                className="text-yellow-400 flex-shrink-0 mt-1"
                size={36}
              />
              <div className="text-left font-poppins">
                <h3 className="text-xl font-medium mb-2">
                  Cobertura universal de saúde
                </h3>
                <p>
                  Alcançar a cobertura universal de saúde, incluindo proteção
                  financeira, acesso a serviços de saúde essenciais e
                  medicamentos/vacinas seguros e eficazes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Smile className="text-yellow-400 flex-shrink-0 mt-1" size={36} />
              <div className="text-left font-poppins">
                <h3 className="text-xl font-medium mb-2">
                  Saúde mental e bem-estar
                </h3>
                <p>
                  Reforçar a prevenção e o tratamento do uso de substâncias e
                  promover a saúde mental e o bem-estar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
