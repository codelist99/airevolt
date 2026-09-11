import { type NextRequest, NextResponse } from "next/server"
import { isAdminRequest } from "@/lib/admin-auth"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const sql = getDb()
  const data = await sql`SELECT id, page_url, referrer, tracking_id, email, utm_source, utm_medium, utm_campaign, created_at FROM page_visits ORDER BY created_at DESC LIMIT 500`
  return NextResponse.json({ success: true, data })
}
