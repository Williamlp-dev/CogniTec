import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import type React from 'react'
import './globals.css'
import { AuthProvider } from '@/components/auth/auth-provider'
import { Header } from '@/components/header/header'

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
      className={`${poppins.variable}`}
    >
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
