"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  // Example notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [appNotifications, setAppNotifications] = useState(true)

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Configurações salvas",
        description: "Suas preferências foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar suas configurações.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Configurações</h1>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Gerencie como você recebe notificações.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificações por Email</Label>
                  <p className="text-sm text-gray-500">Receba atualizações e lembretes por email.</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                  <p className="text-sm text-gray-500">Receba alertas importantes por mensagem de texto.</p>
                </div>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="app-notifications">Notificações no Aplicativo</Label>
                  <p className="text-sm text-gray-500">Receba notificações dentro do aplicativo.</p>
                </div>
                <Switch id="app-notifications" checked={appNotifications} onCheckedChange={setAppNotifications} />
              </div>

              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacidade</CardTitle>
              <CardDescription>Gerencie suas configurações de privacidade.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Configurações de privacidade em breve.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados da Conta</CardTitle>
              <CardDescription>Gerencie seus dados pessoais.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full sm:w-auto">
                Exportar Dados
              </Button>
              <Button variant="destructive" className="w-full sm:w-auto">
                Excluir Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
