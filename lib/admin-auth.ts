import { createHmac, timingSafeEqual } from "crypto"
import type { NextRequest } from "next/server"

export const ADMIN_COOKIE = "airevolt_admin"
const SESSION_DURATION_SECONDS = 60 * 60 * 12

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured")
  return secret
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex")
}

export function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS
  const payload = String(expires)
  return {
    value: `${payload}.${sign(payload)}`,
    maxAge: SESSION_DURATION_SECONDS,
  }
}

export function isValidAdminSession(value?: string) {
  if (!value) return false
  const [expires, suppliedSignature] = value.split(".")
  if (!expires || !suppliedSignature || Number(expires) <= Date.now() / 1000) return false

  const expected = Buffer.from(sign(expires), "hex")
  const supplied = Buffer.from(suppliedSignature, "hex")
  return expected.length === supplied.length && timingSafeEqual(expected, supplied)
}

export function isAdminRequest(request: NextRequest) {
  return isValidAdminSession(request.cookies.get(ADMIN_COOKIE)?.value)
}

export function isCorrectAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) throw new Error("ADMIN_PASSWORD is not configured")

  const actualBuffer = Buffer.from(password)
  const expectedBuffer = Buffer.from(expected)
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)
}
