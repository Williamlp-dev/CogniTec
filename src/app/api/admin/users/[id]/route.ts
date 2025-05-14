import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

interface RouteParams {
  params: {
    id: string
  }
}

/**
 * DELETE handler for deleting a user by ID
 * Uses the correct type signature for Next.js App Router dynamic route handlers
 */
export async function DELETE(_request: Request, { params }: RouteParams): Promise<Response> {
  try {
    // Verify authentication and admin status
    const session = await getServerSession(authOptions)

    if (!session || session.user.isAdmin !== true) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const userId = params.id

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Delete the user
    await db.user.delete({
      where: { id: userId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir usuário:", error)
    return NextResponse.json({ error: "Erro ao excluir usuário" }, { status: 500 })
  }
}
