import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    // Verificar se o usuário está autenticado e é administrador
    const session = await getServerSession(authOptions)

    if (!session || session.user.isAdmin !== true) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const userId = params.id

    // Verificar se o usuário existe
    const user = await db.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Excluir o usuário
    await db.user.delete({
      where: { id: userId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir usuário:", error)
    return NextResponse.json({ error: "Erro ao excluir usuário" }, { status: 500 })
  }
}