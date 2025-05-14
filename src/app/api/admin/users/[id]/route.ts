import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse, NextRequest } from "next/server"

export async function DELETE(request: NextRequest) {
  try {

    const url = new URL(request.url)
    const id = url.pathname.split("/").pop()

    if (!id) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const session = await getServerSession(authOptions)

    if (!session || session.user.isAdmin !== true) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const user = await db.user.findUnique({
      where: { id },
    })

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    await db.user.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir usuário:", error)
    return NextResponse.json({ error: "Erro ao excluir usuário" }, { status: 500 })
  }
}
