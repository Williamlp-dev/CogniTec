import type { Metadata } from 'next'
import { Montserrat, Oxanium, Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header/header'

const oxanium = Oxanium({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-oxanium',
})
const montserrat = Montserrat({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-monstserrat',
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'CogniTec',
  description: 'CogniTec Website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${oxanium.variable} ${montserrat.variable} ${poppins.variable}`}
    >
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
