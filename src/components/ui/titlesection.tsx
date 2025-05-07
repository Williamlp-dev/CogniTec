import React from 'react'

interface TitleSectionProps {
  title: string
  subtitle: string
  lineColor?: string
}

export default function TitleSection({
  title = 'Conheça nossos serviços',
  subtitle = 'Serviços',
  lineColor = 'bg-yellow-400',
}: TitleSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-start mb-4">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mr-2">
          {subtitle}
        </p>
        <div className={`w-16 h-1 ${lineColor}`} />
      </div>
      <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-6">
        {title}
      </h2>
    </div>
  )
}
