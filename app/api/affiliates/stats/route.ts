import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ error: "Affiliate reporting is temporarily unavailable" }, { status: 503 })
}
