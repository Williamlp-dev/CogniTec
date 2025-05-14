"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, LayoutDashboard } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function UserProfile() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/",
      })
    } catch (error) {
      console.error("Error during logout:", error)
      setIsLoading(false)
    }
  }

  const navigateToProfile = () => {
    router.push("/perfil")
  }

  const navigateToSettings = () => {
    router.push("/perfil/configuracoes")
  }

  const navigateToAdminDashboard = () => {
    router.push("/admin/dashboard")
  }

  const getInitials = () => {
    if (!session?.user?.name) return "U"
    return session.user.name.charAt(0).toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
            <AvatarFallback className="bg-yellow-400 text-black font-medium">{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
          <p className="text-xs leading-none text-gray-500">{session?.user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={navigateToProfile} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        {/* Adicionar este bloco condicional para mostrar o link da dashboard apenas para administradores */}
        {session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <DropdownMenuItem onClick={navigateToAdminDashboard} className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard Admin</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer" disabled={isLoading}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? "Saindo..." : "Sair"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
