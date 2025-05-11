import {
  Cpu,
  HeartPulse,
  MessageSquareText,
  ShieldIcon as ShieldUser,
  Smartphone,
  Users2,
} from 'lucide-react'
import Image from 'next/image'
import CardSc from '../ui/cardsc'
import TitleSection from '../ui/titlesection'

export default function Service() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <TitleSection subtitle="Serviços" title="Conheça Nossos Serviços" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card Original - Alzheimer */}
          <CardSc
            title="Desenvolvimento De Soluções Para Alzheimer"
            description="Criaremos tecnologias acessíveis e inovadoras para melhorar a interação e bem-estar dos pacientes com Alzheimer."
            Icon={HeartPulse}
          />

          {/* Card de Suporte */}
          <CardSc
            title="Suporte a Cuidadores e Familiares"
            description="Oferecemos ferramentas para facilitar o cuidado diário e melhorar a comunicação entre pacientes e cuidadores."
            Icon={Users2}
          />

          {/* Card de Monitoramento */}
          <CardSc
            title="IA para Monitoramento de Pacientes"
            description="Implementamos IA para ajudar no monitoramento e na personalização do cuidado dos pacientes, proporcionando maior segurança."
            Icon={Cpu}
          />

          {/* Card de APP */}
          <CardSc
            title="Aplicativo Cognitec"
            description="Desenvolvemos um aplicativo intuitivo para facilitar a navegação de pacientes com Alzheimer e a interação com seus cuidadores."
            Icon={Smartphone}
          />

          {/* Card de Privacidade */}
          <CardSc
            title="Segurança e Privacidade"
            description="Garantimos que todas as interações com a nossa tecnologia sejam seguras e que as informações dos pacientes sejam tratadas com a máxima privacidade."
            Icon={ShieldUser}
          />

          {/* Card de Suporte */}
          <CardSc
            title="Suporte e Assistência"
            description="Oferecemos suporte técnico para garantir que a tecnologia esteja sempre funcionando perfeitamente para pacientes e cuidadores."
            Icon={MessageSquareText}
          />
        </div>
      </div>

      {/* Seção CTA com imagem de fundo */}
      <div className="relative w-full mt-20 h-[280px] sm:h-[320px] md:h-[360px]">
        <Image
          src="/assets/img/cabeca.jpg"
          alt="Imagem representativa de saúde mental"
          fill
          className="object-cover brightness-50"
          priority
        />
        {/* Conteúdo sobreposto à imagem */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Entre em Contato Conosco
          </h2>
          <p className="max-w-2xl text-sm sm:text-base md:text-lg mb-6 opacity-90">
            Saiba mais sobre como podemos ajudar na qualidade de vida de
            pacientes com Alzheimer e seus cuidadores. Entre em contato para
            mais informações e parceria.
          </p>

          <a
            href="/contato"
            className="px-6 py-3 border border-white rounded-md hover:bg-amber-400 hover:border-amber-400 hover:text-black transition-all duration-300 text-sm sm:text-base font-medium"
            aria-label="Saiba mais sobre nossos serviços"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
  )
}
