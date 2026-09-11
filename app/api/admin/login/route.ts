import { NextResponse } from "next/server"
import { ADMIN_COOKIE, createAdminSession, isCorrectAdminPassword } from "@/lib/admin-auth"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    if (typeof password !== "string" || !isCorrectAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const session = createAdminSession()
    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_COOKIE, session.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: session.maxAge,
    })
    return response
  } catch (error) {
    console.error("Admin login failed:", error)
    return NextResponse.json({ error: "Admin login is not configured" }, { status: 503 })
  }
}
