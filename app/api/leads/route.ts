import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { isAdminRequest } from "@/lib/admin-auth"
import { getDb } from "@/lib/db"

const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(7).max(30),
})

export async function POST(request: NextRequest) {
  try {
    const lead = leadSchema.parse(await request.json())
    const sql = getDb()
    await sql`INSERT INTO leads (first_name, last_name, email, phone) VALUES (${lead.firstName}, ${lead.lastName}, ${lead.email.toLowerCase()}, ${lead.phone})`
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please provide valid contact information" }, { status: 400 })
    console.error("Lead storage failed:", error)
    return NextResponse.json({ error: "Unable to save your information" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const sql = getDb()
  const data = await sql`SELECT id, first_name, last_name, email, phone, created_at FROM leads ORDER BY created_at DESC LIMIT 500`
  return NextResponse.json({ success: true, data })
}
