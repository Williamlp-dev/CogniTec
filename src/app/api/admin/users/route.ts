import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Verificar se o usuário está autenticado e é administrador
    const session = await getServerSession(authOptions)

    if (!session || session.user.isAdmin !== true) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Buscar todos os usuários
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        document: true,
        phone: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 })
  }
}
