"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(session?.user?.name || "")
  const [email, setEmail] = useState(session?.user?.email || "")

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await update({
        ...session,
        user: {
          ...session?.user,
          name,
          email,
        },
      })

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar seu perfil.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = () => {
    if (!session?.user?.name) return "U"
    return session.user.name.charAt(0).toUpperCase()
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-0 shadow-lg md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-white">Foto de Perfil</CardTitle>
                  <CardDescription className="text-gray-200">Esta é sua foto de perfil atual.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="border-2 border-gray-200 h-32 w-32 mb-4">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                    <AvatarFallback className="text-4xl bg-yellow-400 text-black">{getInitials()}</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-0 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white" htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={name}
                        disabled
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="bg-gray-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white" htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        disabled
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="bg-gray-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white" htmlFor="userType">Tipo de Usuário</Label>
                      <Input id="userType" value={session?.user?.userType || ""} disabled className="bg-gray-100" />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="bg-gray-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Preferências</CardTitle>
                <CardDescription className="text-gray-400">Gerencie suas preferências de notificação e privacidade.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-red-500">Configurações de preferências em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
