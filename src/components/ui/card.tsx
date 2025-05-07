import { HeartPulse } from 'lucide-react'
import React from 'react'

export default function Card({
  title = 'Desenvolvimento De Soluções Para Pacientes Com Alzheimer',
  description = 'Criaremos tecnologias acessíveis e inovadoras para melhorar a interação e bem-estar dos pacientes com Alzheimer',
  Icon = HeartPulse,
}) {
  return (
    <div className="w-full max-w-sm mx-auto rounded-xs overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 bg-amber-400 p-4 rounded-xl">
          <Icon className="text-black" size={24} />
        </div>
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  )
}
