"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { Eye, Search, Trash2, Users } from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState, useCallback } from "react"

// Tipo para os usuários
type User = {
  id: string
  name: string | null
  email: string | null
  userType: string | null
  document: string | null
  phone: string | null
  createdAt: string
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("todos")
  const [stats, setStats] = useState({
    total: 0,
    familiar: 0,
    cuidador: 0,
    medico: 0,
  })

  // Verificar autenticação
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  // Verificar se é administrador
  if (session?.user?.isAdmin !== true) {
    redirect("/dashboard")
  }

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (!response.ok) {
        throw new Error("Falha ao buscar usuários")
      }
      const data = await response.json()
      setUsers(data.users)
      setFilteredUsers(data.users)

      // Calcular estatísticas
      const stats = {
        total: data.users.length,
        familiar: data.users.filter((user: User) => user.userType === "familiar").length,
        cuidador: data.users.filter((user: User) => user.userType === "cuidador").length,
        medico: data.users.filter((user: User) => user.userType === "medico").length,
      }
      setStats(stats)
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de usuários",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Buscar usuários
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Filtrar usuários
  useEffect(() => {
    if (activeTab === "todos") {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.document?.includes(searchTerm),
        ),
      )
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.userType === activeTab &&
            (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.document?.includes(searchTerm)),
        ),
      )
    }
  }, [searchTerm, users, activeTab])

  // Excluir usuário
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Falha ao excluir usuário")
        }

        // Atualizar a lista de usuários
        setUsers(users.filter((user) => user.id !== userId))
        toast({
          title: "Sucesso",
          description: "Usuário excluído com sucesso",
        })
      } catch (error) {
        console.error("Erro ao excluir usuário:", error)
        toast({
          title: "Erro",
          description: "Não foi possível excluir o usuário",
          variant: "destructive",
        })
      }
    }
  }

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-white text-black">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800 border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Total de Usuários</CardTitle>
              <CardDescription className="text-gray-200">Todos os usuários cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-gray-100 mr-3" />
                <span className="text-3xl font-bold text-white">{stats.total}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Familiares</CardTitle>
              <CardDescription className="text-gray-200">Usuários do tipo familiar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-300 mr-3" />
                <span className="text-3xl font-bold text-white">{stats.familiar}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Cuidadores</CardTitle>
              <CardDescription className="text-gray-200">Usuários do tipo cuidador</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400 mr-3" />
                <span className="text-3xl font-bold text-white">{stats.cuidador}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Médicos</CardTitle>
              <CardDescription className="text-gray-200">Usuários do tipo médico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-400 mr-3" />
                <span className="text-3xl font-bold text-white">{stats.medico}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800 border-0 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Gerenciamento de Usuários</CardTitle>
            <CardDescription className="text-gray-200">
              Visualize, pesquise e gerencie todos os usuários cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-200" />
                <Input
                  placeholder="Buscar usuários..."
                  className="bg-gray-700 border-gray-600 text-white pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-4 w-full md:w-auto">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="familiar">Familiares</TabsTrigger>
                  <TabsTrigger value="cuidador">Cuidadores</TabsTrigger>
                  <TabsTrigger value="medico">Médicos</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {isLoading ? (
              <div className="text-center py-8">Carregando usuários...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-200">Nenhum usuário encontrado com os filtros atuais.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Nome</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Tipo</TableHead>
                      <TableHead className="text-white">Documento</TableHead>
                      <TableHead className="text-white">Telefone</TableHead>
                      <TableHead className="text-white">Data de Cadastro</TableHead>
                      <TableHead className="text-white text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium text-white">{user.name || "-"}</TableCell>
                        <TableCell className="text-white">{user.email || "-"}</TableCell>
                        <TableCell className="text-white capitalize">{user.userType || "-"}</TableCell>
                        <TableCell className="text-white">{user.document || "-"}</TableCell>
                        <TableCell className="text-white">{user.phone || "-"}</TableCell>
                        <TableCell className="text-white">{formatDate(user.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white hover:text-red-400 hover:bg-transparent"
                              title="Excluir usuário"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Excluir usuário</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
