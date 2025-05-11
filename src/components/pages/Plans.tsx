import { Check, X } from 'lucide-react'
import TitleSection from '../ui/titlesection'

export default function Plans() {
  return (
    <section className="overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <TitleSection subtitle="Serviços" title="Conheça Nossos Planos" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Plano Gratuito */}
          <div className="bg-stone-100 rounded-xs shadow-md p-8 flex flex-col h-full">
            <div className="text-xl font-poppins mb-2">Plano Gratuito</div>
            <div className="text-gray-700 mb-4">
              Ideal para familiares que desejam experimentar as funcionalidades
              básicas do app.
            </div>
            <div className="flex text-amber-400 py-5">
              <div className="relative align-baseline text-xl font-bold">
                R$
              </div>
              <div className="text-5xl font-bold">0</div>
              <div className="text-gray-300 ml-1 mt-2 text-lg">/ mês</div>
            </div>
            <a
              className="w-full bg-stone-100 border border-gray-700 text-gray-500 text-center font-poppins py-3 px-4 rounded mb-2 hover:bg-yellow-400 transition-colors"
              href="#gratuito"
            >
              Comece Gratuitamente
            </a>
            <div className="text-sm text-gray-500 mb-6 text-center">
              Não requer cartão de crédito
            </div>

            <div className="space-y-3 mt-auto">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Acesso ao diário do paciente</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Lembretes de medicamentos</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Suporte básico por e-mail</span>
              </div>
              <div className="flex items-center">
                <X className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400 line-through">
                  Monitoramento por IA
                </span>
              </div>
              <div className="flex items-center">
                <X className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400 line-through">
                  Relatórios detalhados para médicos
                </span>
              </div>
              <div className="flex items-center">
                <X className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400 line-through">
                  Suporte prioritário
                </span>
              </div>
            </div>
          </div>

          {/* Plano Profissional */}
          <div className="rounded-xs shadow-md p-6 bg-stone-100 flex flex-col h-full relative">
            <div className="absolute -top-4 right-6 bg-yellow-500 text-black px-4 py-1 rounded-xs text-sm font-bold">
              Popular
            </div>
            <div className="text-xl font-poppins mb-2">Plano Profissional</div>
            <div className="text-gray-700 mb-4">
              Perfeito para cuidadores que precisam de recursos avançados de
              monitoramento.
            </div>
            <div className="flex text-amber-400 py-5">
              <div className="relative align-baseline text-xl font-bold">
                R$
              </div>
              <div className="text-5xl font-bold">39</div>
              <div className="text-gray-300 ml-1 mt-2 text-lg">/ mês</div>
            </div>
            <a
              className="w-full bg-yellow-500 text-gray-500 text-center font-poppins py-3 px-4 rounded mb-2 hover:bg-yellow-600 transition-colors"
              href="#profissional"
            >
              Assinar Agora
            </a>
            <div className="text-sm text-gray-500 mb-6 text-center">
              Cancele a qualquer momento
            </div>

            <div className="space-y-3 mt-auto">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Acesso ao diário do paciente</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Lembretes de medicamentos</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Suporte básico por e-mail</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Monitoramento por IA</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Relatórios detalhados para médicos</span>
              </div>
              <div className="flex items-center">
                <X className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400 line-through">
                  Suporte prioritário
                </span>
              </div>
            </div>
          </div>

          {/* Plano Clínico */}
          <div className="bg-stone-100 rounded-xs shadow-md p-6 flex flex-col h-full">
            <div className="text-xl font-poppins mb-2">Plano Clínico</div>
            <div className="text-gray-700 mb-4">
              Desenvolvido para clínicas e profissionais de saúde com múltiplos
              pacientes.
            </div>
            <div className="flex text-amber-400 py-5">
              <div className="relative align-baseline text-xl font-bold">
                R$
              </div>
              <div className="text-5xl font-bold">99</div>
              <div className="text-gray-300 ml-1 mt-2 text-lg">/ mês</div>
            </div>
            <a
              className="w-full bg-stone-100 border border-gray-700 text-gray-500 text-center font-poppins py-3 px-4 rounded mb-2 hover:bg-yellow-400 transition-colors"
              href="#clinico"
            >
              Fale com um Consultor
            </a>
            <div className="text-sm text-gray-500 mb-6 text-center">
              Planos personalizados disponíveis
            </div>

            <div className="space-y-3 mt-auto">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Acesso ao diário do paciente</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Lembretes de medicamentos</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Suporte básico por e-mail</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Monitoramento por IA</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Relatórios detalhados para médicos</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Suporte prioritário</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Painel multi-pacientes</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Integração com sistemas clínicos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
