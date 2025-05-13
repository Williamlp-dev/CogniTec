"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
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
      // Here you would typically call an API to update the user profile
      // For now, we'll just simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the session with the new data
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

  // Get first letter of user's name for avatar fallback
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
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Foto de Perfil</CardTitle>
                  <CardDescription>Esta é sua foto de perfil atual.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                    <AvatarFallback className="text-4xl bg-yellow-400 text-black">{getInitials()}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full">
                    Alterar Foto
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize suas informações pessoais.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userType">Tipo de Usuário</Label>
                      <Input id="userType" value={session?.user?.userType || ""} disabled className="bg-gray-100" />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>Gerencie suas configurações de segurança.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>

                  <Button type="submit" className="w-full">
                    Alterar Senha
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>Gerencie suas preferências de notificação e privacidade.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Configurações de preferências em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
