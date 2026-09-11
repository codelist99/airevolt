import { NextResponse } from "next/server"

// Affiliate enrollment is intentionally disabled until its dashboard receives
// the same signed-session protection as the main admin area.
export async function GET() {
  return NextResponse.json({ error: "Affiliate access is temporarily unavailable" }, { status: 503 })
}

export async function POST() {
  return NextResponse.json({ error: "Affiliate enrollment is temporarily unavailable" }, { status: 503 })
}
