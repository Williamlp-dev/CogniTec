import type { LucideIcon } from 'lucide-react'

interface CardProps {
  title: string
  description: string
  Icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
}

export default function CardSc({
  title,
  description,
  Icon,
  iconColor = 'text-black',
  iconBgColor = 'bg-amber-400',
}: CardProps) {
  return (
    <div className="h-full font-poppins rounded-xloverflow-hidden shadow-md border border-gray-300 bg-white transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
      <div className="p-6 sm:p-8 flex flex-col items-center text-center h-full">
        <div className={`mb-5 ${iconBgColor} p-3.5 rounded-xl`}>
          <Icon
            className={iconColor}
            size={28}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
        <h3 className="text-lg sm:text-xl font-medium mb-3 text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  )
}
