import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getDb } from "@/lib/db"

const visitSchema = z.object({
  page_url: z.string().url().max(2000),
  tracking_id: z.string().max(100).optional().nullable(),
  email: z.string().email().max(320).optional().nullable(),
  utm_source: z.string().max(200).optional().nullable(),
  utm_medium: z.string().max(200).optional().nullable(),
  utm_campaign: z.string().max(200).optional().nullable(),
})

export async function POST(request: NextRequest) {
  try {
    const visit = visitSchema.parse(await request.json())
    const sql = getDb()
    await sql`INSERT INTO page_visits (page_url, referrer, tracking_id, email, utm_source, utm_medium, utm_campaign)
      VALUES (${visit.page_url}, ${request.headers.get("referer") || "direct"}, ${visit.tracking_id || null}, ${visit.email || null}, ${visit.utm_source || null}, ${visit.utm_medium || null}, ${visit.utm_campaign || null})`
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (!(error instanceof z.ZodError)) console.error("Visit tracking failed:", error)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
