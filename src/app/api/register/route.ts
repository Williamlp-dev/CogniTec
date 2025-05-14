import { db } from "@/lib/db"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import { z } from "zod"

const cpfSchema = z.string().length(11, "CPF deve ter 11 dígitos").regex(/^\d+$/, "CPF deve conter apenas números")

const crmSchema = z
  .string()
  .min(4, "CRM deve ter no mínimo 4 caracteres")
  .max(10, "CRM deve ter no máximo 10 caracteres")

const phoneSchema = z
  .string()
  .min(10, "Telefone deve ter no mínimo 10 dígitos")
  .max(11, "Telefone deve ter no máximo 11 dígitos")
  .regex(/^\d+$/, "Telefone deve conter apenas números")

const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "Senha deve conter letras e números"),
  userType: z.enum(["familiar", "cuidador", "medico"], {
    errorMap: () => ({ message: "Tipo de usuário inválido" }),
  }),
  document: z.string(),
  phone: phoneSchema,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Dados recebidos:", body)

    const { name, email, password, userType, document, phone } = registerSchema.parse(body)

    if (userType === "medico") {
      try {
        crmSchema.parse(document)
      } catch (error) {
        return NextResponse.json({ error: "CRM inválido. Deve ter entre 4 e 10 caracteres." }, { status: 400 })
      }
    } else {
      try {
        cpfSchema.parse(document)
      } catch (error) {
        return NextResponse.json({ error: "CPF inválido. Deve ter 11 dígitos numéricos." }, { status: 400 })
      }
    }

    const cleanDocument = document.replace(/\D/g, "")
    const cleanPhone = phone.replace(/\D/g, "")

    const existingEmail = await db.user.findUnique({
      where: { email },
    })

    if (existingEmail) {
      return NextResponse.json({ error: "Email já cadastrado. Por favor, use outro email." }, { status: 409 })
    }

    const existingDocument = await db.user.findFirst({
      where: { document: cleanDocument },
    })

    if (existingDocument) {
      return NextResponse.json(
        {
          error:
            userType === "medico"
              ? "CRM já cadastrado. Por favor, verifique seus dados."
              : "CPF já cadastrado. Por favor, verifique seus dados.",
        },
        { status: 409 },
      )
    }

    const existingPhone = await db.user.findFirst({
      where: { phone: cleanPhone },
    })

    if (existingPhone) {
      return NextResponse.json({ error: "Telefone já cadastrado. Por favor, use outro número." }, { status: 409 })
    }

    const hashedPassword = await hash(password, 10)

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType,
        document: cleanDocument,
        phone: cleanPhone,
      },
    })

    console.log("Usuário criado com sucesso:", user.id)

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao registrar usuário:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "Erro interno do servidor. Tente novamente mais tarde." }, { status: 500 })
  }
}
