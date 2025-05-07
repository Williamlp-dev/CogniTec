import {
  Cpu,
  HeartPulse,
  MessageSquareText,
  ShieldUser,
  Smartphone,
  Users2,
} from 'lucide-react'
import Image from 'next/image'
import Card from '../ui/card'
import TitleSection from '../ui/titlesection'

export default function Service() {
  return (
    <section className="min-h-screen pt-6">
      <div className="w-full container mx-auto px-4">
        <TitleSection subtitle="Serviços" title="Conheça Nossos Serviços" />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">
        {/* Card Original - Alzheimer */}
        <Card
          title="Desenvolvimento De Soluções Para Alzheimer"
          description="Criaremos tecnologias acessíveis e inovadoras para melhorar a interação e bem-estar dos pacientes com Alzheimer."
          Icon={HeartPulse}
        />

        {/* Card de Suporte */}
        <Card
          title="Suporte a Cuidadores e Familiares"
          description="Oferecemos ferramentas para facilitar o cuidado diário e melhorar a comunicação entre pacientes e cuidadores."
          Icon={Users2}
        />

        {/* Card de Monitoramento */}
        <Card
          title="Inteligência Artificial para Monitoramento de Pacientes"
          description="Implementamos IA para ajudar no monitoramento e na personalização do cuidado dos pacientes, proporcionando maior segurança e acompanhamento."
          Icon={Cpu}
        />

        {/* Card de APP */}
        <Card
          title="Aplicativo Cognitec"
          description="Desenvolvemos um aplicativo intuitivo para facilitar a navegação de pacientes com Alzheimer e a interação com seus cuidadores."
          Icon={Smartphone}
        />

        {/* Card de Privacidade */}
        <Card
          title="Segurança e Privacidade"
          description="Garantimos que todas as interações com a nossa tecnologia sejam seguras e que as informações dos pacientes sejam tratadas com a máxima privacidade."
          Icon={ShieldUser}
        />

        {/* Card de Suporte */}
        <Card
          title="Suporte e Assistência"
          description="Oferecemos suporte técnico para garantir que a tecnologia esteja sempre funcionando perfeitamente para pacientes e cuidadores."
          Icon={MessageSquareText}
        />
      </div>
      {/* Fim do card */}

      {/* IMG com Fundo preto */}
      <div className="relative w-full h-[220px] mt-8">
        <Image
          src="/assets/img/cabeca.jpg"
          alt="cabeca peca"
          fill
          className="object-cover brightness-50"
        />
        \{/* texto em cima da img */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre em Contato Conosco
          </h2>
          <p className="max-w-xl text-base md:text-lg mb-6">
            Saiba mais sobre como podemos ajudar na qualidade de vida de
            pacientes com Alzheimer e seus cuidadores. Entre em contato para
            mais informações e parceria.
          </p>

          <a
            href="/"
            className="px-6 py-2 border border-white rounded hover:bg-amber-400 hover:text-black transition"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
  )
}
