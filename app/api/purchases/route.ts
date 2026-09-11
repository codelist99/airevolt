import { type NextRequest, NextResponse } from "next/server"
import { isAdminRequest } from "@/lib/admin-auth"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const sql = getDb()
  const data = await sql`SELECT id, first_name, last_name, email, phone, amount, card_last_four, transaction_id, product_type, created_at FROM purchases ORDER BY created_at DESC LIMIT 500`
  return NextResponse.json({ success: true, data })
}
