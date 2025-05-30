import { getToken } from "next-auth/jwt"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const isAuthenticated = !!token

  // Rotas que requerem autenticação
  const protectedRoutes = ["/dashboard", "/perfil"]

  // Rotas específicas por tipo de usuário
  const familiarRoutes = ["/familiar"]
  const cuidadorRoutes = ["/cuidador"]
  const medicoRoutes = ["/medico"]

  // Rotas de administrador
  const adminRoutes = ["/admin"]

  const path = req.nextUrl.pathname

  // Verificar se a rota atual requer autenticação
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

  // Verificar se a rota é específica para um tipo de usuário
  const isFamiliarRoute = familiarRoutes.some((route) => path.startsWith(route))
  const isCuidadorRoute = cuidadorRoutes.some((route) => path.startsWith(route))
  const isMedicoRoute = medicoRoutes.some((route) => path.startsWith(route))

  // Verificar se a rota é de administrador
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route))

  // Se a rota requer autenticação e o usuário não está autenticado
  if ((isProtectedRoute || isAdminRoute) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Se o usuário está autenticado e tenta acessar a página de login
  if (isAuthenticated && path === "/login") {
    // Se for admin, redirecionar para o dashboard de admin
    if (token.isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }
    // Se for usuário normal, redirecionar para o dashboard normal
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Verificar permissões baseadas no tipo de usuário
  if (isAuthenticated) {
    const userType = token.userType as string
    const isAdmin = token.isAdmin as boolean

    // Verificar acesso às rotas de administrador
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    if (isFamiliarRoute && userType !== "familiar") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    if (isCuidadorRoute && userType !== "cuidador") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    if (isMedicoRoute && userType !== "medico") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/perfil/:path*",
    "/familiar/:path*",
    "/cuidador/:path*",
    "/medico/:path*",
    "/admin/:path*",
    "/login",
  ],
}
