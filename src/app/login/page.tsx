"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [userType, setUserType] = useState("familiar")
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Estados para o formulário de login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Estados para o formulário de registro
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [document, setDocument] = useState("")
  const [phone, setPhone] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [registerError, setRegisterError] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const switchToRegister = () => {
    setActiveTab("register")
    setLoginError("")
  }

  const switchToLogin = () => {
    setActiveTab("login")
    setRegisterError("")
  }

  const goToHome = () => {
    router.push("/")
  }

  // Função para lidar com o login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

    try {
      const result = await signIn("credentials", {
        email: loginEmail,
        password: loginPassword,
        redirect: false,
      })

      if (result?.error) {
        setLoginError("Email ou senha incorretos")
        toast({
          title: "Erro ao fazer login",
          description: "Email ou senha incorretos",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Login realizado com sucesso",
          description: "Redirecionando para o dashboard...",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      setLoginError("Ocorreu um erro ao fazer login. Tente novamente.")
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Atualizar a função handleRegister para exibir mensagens de erro mais específicas
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterError("")

    // Validações básicas
    if (!name || !email || !password || !document || !phone) {
      setRegisterError("Todos os campos são obrigatórios")
      setIsLoading(false)
      toast({
        title: "Erro no cadastro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      setRegisterError("A senha deve ter pelo menos 8 caracteres")
      setIsLoading(false)
      toast({
        title: "Erro no cadastro",
        description: "A senha deve ter pelo menos 8 caracteres",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      setRegisterError("Você deve aceitar os termos de uso e política de privacidade")
      setIsLoading(false)
      toast({
        title: "Erro no cadastro",
        description: "Você deve aceitar os termos de uso e política de privacidade",
        variant: "destructive",
      })
      return
    }

    try {
      // Remover formatação do documento e telefone antes de enviar
      const cleanDocument = document.replace(/\D/g, "")
      const cleanPhone = phone.replace(/\D/g, "")

      const requestData = {
        name,
        email,
        password,
        userType,
        document: cleanDocument,
        phone: cleanPhone,
      }

      console.log("Enviando dados de registro:", requestData)

      // Usar a URL absoluta para a API
      const apiUrl = `${window.location.origin}/api/register`
      console.log("URL da API:", apiUrl)

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      console.log("Status da resposta:", response.status)

      if (!response.ok) {
        let errorMessage = "Erro ao registrar usuário"

        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          console.error("Erro ao parsear resposta:", e)
          // Não tente ler o corpo da resposta novamente, pois já foi consumido
          console.error("Status da resposta:", response.status, response.statusText)
        }

        setRegisterError(errorMessage)
        toast({
          title: "Erro no cadastro",
          description: errorMessage,
          variant: "destructive",
        })
        return
      }

      const data = await response.json()
      console.log("Resposta do registro:", data)

      toast({
        title: "Cadastro realizado com sucesso",
        description: "Você já pode fazer login com suas credenciais",
      })

      // Limpar o formulário e mudar para a aba de login
      setName("")
      setEmail("")
      setPassword("")
      setDocument("")
      setPhone("")
      setAcceptTerms(false)
      switchToLogin()
    } catch (error) {
      console.error("Erro ao registrar:", error)
      setRegisterError("Ocorreu um erro ao registrar. Tente novamente.")
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao registrar. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para formatar o CPF/CRM
  const formatDocument = (value: string) => {
    if (userType === "medico") {
      // Formato para CRM: apenas números e letras, máximo 10 caracteres
      return value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10)
    } else {
      // Formato para CPF: apenas números, máximo 11 caracteres
      const cpf = value.replace(/\D/g, "").slice(0, 11)
      if (cpf.length <= 3) return cpf
      if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`
      if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`
    }
  }

  // Função para formatar o telefone
  const formatPhone = (value: string) => {
    const phone = value.replace(/\D/g, "").slice(0, 11)
    if (phone.length <= 2) return phone
    if (phone.length <= 6) return `(${phone.slice(0, 2)}) ${phone.slice(2)}`
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`
  }

  return (
    <main className="min-h-screen pt-8 pb-12 px-4 bg-gradient-to-b from-gray-900 to-black">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-start mb-6">
          <Button
            variant="ghost"
            className="text-white hover:text-yellow-400 hover:bg-transparent flex items-center gap-2"
            onClick={goToHome}
          >
            <ArrowLeft size={16} />
            <span>Voltar para página inicial</span>
          </Button>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo à CogniTec</h1>
            <p className="text-gray-400">Acesse sua conta ou crie um novo cadastro</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>

            {/* Tab de Login */}
            <TabsContent value="login">
              <Card className="border-0 shadow-lg bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <form className="space-y-4" onSubmit={handleLogin}>
                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

                    <div className="space-y-2">
                      <Label htmlFor="email-login" className="text-white">
                        E-mail
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email-login"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10 bg-gray-700 border-gray-600 text-white"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-login" className="text-white">
                          Senha
                        </Label>
                        <Link href="/esqueci-senha" className="text-xs text-yellow-400 hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password-login"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 bg-gray-700 border-gray-600 text-white"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6 text-gray-400 hover:text-white"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                      disabled={isLoading}
                    >
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>

                    <div className="text-center text-sm text-gray-400 mt-4">
                      Não tem uma conta?{" "}
                      <button type="button" className="text-yellow-400 hover:underline" onClick={switchToRegister}>
                        Cadastre-se
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Registro */}
            <TabsContent value="register">
              <Card className="border-0 shadow-lg bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <form className="space-y-4" onSubmit={handleRegister}>
                    {registerError && <p className="text-red-500 text-sm">{registerError}</p>}

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Nome completo
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="Seu nome completo"
                          className="pl-10 bg-gray-700 border-gray-600 text-white"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-register" className="text-white">
                        E-mail
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email-register"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10 bg-gray-700 border-gray-600 text-white"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password-register" className="text-white">
                        Senha
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password-register"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 8 caracteres"
                          className="pl-10 bg-gray-700 border-gray-600 text-white"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6 text-gray-400 hover:text-white"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400">Mínimo de 8 caracteres, incluindo letras e números</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Tipo de usuário</Label>
                      <RadioGroup
                        defaultValue="familiar"
                        className="flex flex-col space-y-2"
                        value={userType}
                        onValueChange={(value) => {
                          setUserType(value)
                          setDocument("") // Limpar o documento ao mudar o tipo
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="familiar" id="familiar" className="border-gray-600" />
                          <Label htmlFor="familiar" className="text-white">
                            Familiar
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cuidador" id="cuidador" className="border-gray-600" />
                          <Label htmlFor="cuidador" className="text-white">
                            Cuidador
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medico" id="medico" className="border-gray-600" />
                          <Label htmlFor="medico" className="text-white">
                            Médico
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document" className="text-white">
                        {userType === "medico" ? "CRM" : "CPF"}
                      </Label>
                      <Input
                        id="document"
                        placeholder={userType === "medico" ? "Digite seu CRM" : "Digite seu CPF"}
                        className="bg-gray-700 border-gray-600 text-white"
                        value={document}
                        onChange={(e) => setDocument(formatDocument(e.target.value))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Telefone
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="(00) 00000-0000"
                          className="pl-10 bg-gray-700 border-gray-600 text-white"
                          value={phone}
                          onChange={(e) => setPhone(formatPhone(e.target.value))}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox
                        id="terms"
                        className="border-gray-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label htmlFor="terms" className="text-sm text-gray-300 leading-tight">
                          Aceito os{" "}
                          <Link href="/termos" className="text-yellow-400 hover:underline">
                            Termos de Uso
                          </Link>{" "}
                          e a{" "}
                          <Link href="/privacidade" className="text-yellow-400 hover:underline">
                            Política de Privacidade
                          </Link>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                      disabled={isLoading}
                    >
                      {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </Button>

                    <div className="text-center text-sm text-gray-400 mt-4">
                      Já tem uma conta?{" "}
                      <button type="button" className="text-yellow-400 hover:underline" onClick={switchToLogin}>
                        Faça login
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
