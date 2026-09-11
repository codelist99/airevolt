"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError("")

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (!response.ok) {
      setError("Incorrect password")
      setLoading(false)
      return
    }

    router.replace("/admin")
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-20">
      <form onSubmit={submit} className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Admin login</h1>
        <p className="mb-6 text-slate-600">AI Revolution reporting</p>
        <label className="mb-2 block font-medium text-slate-800" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          required
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="mt-6 w-full rounded-lg bg-[#5B5FED] px-4 py-3 font-bold text-white disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  )
}
