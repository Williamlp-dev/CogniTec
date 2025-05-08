"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Bem-vindo, {session?.user?.name}!</h2>
          <p className="mb-4">
            Você está logado como: <span className="font-medium">{session?.user?.userType}</span>
          </p>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Informações da conta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{session?.user?.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Tipo de usuário</p>
                <p className="font-medium capitalize">{session?.user?.userType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
