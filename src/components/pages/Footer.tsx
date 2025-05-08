import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-black text-white font-poppins text-sm">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold tracking-wide">Cognitec</h3>
            <div className="flex items-start space-x-3 text-gray-300">
              <MapPin className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-sm">Recife, Pernambuco - Brasil</p>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone className="h-4 w-4 text-yellow-400 shrink-0" />
              <p className="text-sm">+55 (81) 99999-9999</p>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="h-4 w-4 text-yellow-400 shrink-0" />
              <p className="text-sm">cognitecst@gmail.com</p>
            </div>
            <div className="flex space-x-5 pt-2">
              <Link
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-lg font-semibold tracking-wide">Links Úteis</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Sobre a Cognitec
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-lg font-semibold tracking-wide">
              Nossos Serviços
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link
                  href="/servicos/tecnologia-assistiva"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Tecnologia Assistiva
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/inteligencia-artificial"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Inteligência Artificial
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/aplicativos-saude"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Aplicativos para Saúde
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/plataformas-cuidadores"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Plataformas para Cuidadores
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-lg font-semibold tracking-wide">Inscreva-se</h3>
            <p className="text-gray-300 text-sm">
              Assine nossos serviços e fique por dentro da Cognitec!
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="bg-gray-900 border-gray-800 text-sm h-9 focus:border-yellow-400 focus:ring-yellow-400/20"
              />
              <Button className="bg-yellow-400 text-nowrap hover:bg-yellow-500 text-black font-medium text-sm h-9 px-4">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              © 2025 Cognitec — Todos os direitos reservados
            </p>
            <p className="text-xs text-gray-500 mt-2 md:mt-0">
              Desenvolvido pela equipe da CogniTec • Consultoria em
              Acessibilidade
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
