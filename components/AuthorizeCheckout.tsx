"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { LockKeyhole, Phone } from "lucide-react"

type ProductType = "main-47" | "upsell-97" | "downsell-47"
type FormData = {
  firstName: string; lastName: string; email: string; phone: string
  address: string; city: string; state: string; zip: string
  cardNumber: string; expirationMonth: string; expirationYear: string; cardCode: string
}

declare global {
  interface Window {
    Accept?: {
      dispatchData: (data: unknown, callback: (response: AcceptResponse) => void) => void
    }
  }
}

type AcceptResponse = {
  opaqueData?: { dataDescriptor: string; dataValue: string }
  messages?: { resultCode?: string; message?: Array<{ text?: string }> }
}

const EMPTY_FORM: FormData = {
  firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "",
  cardNumber: "", expirationMonth: "", expirationYear: "", cardCode: "",
}

export default function AuthorizeCheckout({ productType = "main-47" }: { productType?: ProductType }) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [scriptReady, setScriptReady] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const amount = productType === "upsell-97" ? 97 : 47
  const isSandbox = process.env.NEXT_PUBLIC_AUTHORIZENET_ENVIRONMENT === "sandbox"
  const acceptScript = isSandbox ? "https://jstest.authorize.net/v1/Accept.js" : "https://js.authorize.net/v1/Accept.js"

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("leadData") || "{}")
      setForm((current) => ({ ...current, ...Object.fromEntries(Object.entries(saved).filter(([key]) => key in current)) }))
    } catch { /* Ignore malformed local data. */ }
  }, [])

  function update(name: keyof FormData, value: string) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError("")
    if (!window.Accept || !scriptReady) return setError("Secure checkout is still loading. Please try again.")
    const apiLoginID = process.env.NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID
    const clientKey = process.env.NEXT_PUBLIC_AUTHORIZENET_CLIENT_KEY
    if (!apiLoginID || !clientKey) return setError("Secure checkout is not configured. Please call (858) 257-1162.")

    setSubmitting(true)
    window.Accept.dispatchData({
      authData: { apiLoginID, clientKey },
      cardData: {
        cardNumber: form.cardNumber.replace(/\D/g, ""),
        month: form.expirationMonth,
        year: form.expirationYear,
        cardCode: form.cardCode,
        zip: form.zip,
        fullName: `${form.firstName} ${form.lastName}`,
      },
    }, async (acceptResponse) => {
      if (acceptResponse.messages?.resultCode !== "Ok" || !acceptResponse.opaqueData) {
        setError(acceptResponse.messages?.message?.[0]?.text || "Please check your card details.")
        setSubmitting(false)
        return
      }

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productType,
            ...Object.fromEntries(Object.entries(form).filter(([key]) => !["cardNumber", "expirationMonth", "expirationYear", "cardCode"].includes(key))),
            opaqueDataDescriptor: acceptResponse.opaqueData.dataDescriptor,
            opaqueDataValue: acceptResponse.opaqueData.dataValue,
          }),
        })
        const result = await response.json()
        if (!response.ok) throw new Error(result.error || "Payment was not approved.")
        window.location.href = result.nextPath
      } catch (paymentError) {
        setError(paymentError instanceof Error ? paymentError.message : "Payment was not approved.")
        setSubmitting(false)
      }
    })
  }

  return (
    <>
      <Script src={acceptScript} strategy="afterInteractive" onLoad={() => setScriptReady(true)} onError={() => setError("Secure payment service could not load.")} />
      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="bg-slate-900 px-6 py-5 text-white">
          <div className="flex items-center justify-between gap-4"><div><p className="text-sm text-slate-300">Complete your order</p><h1 className="text-2xl font-bold">AI Revolution Access</h1></div><p className="text-3xl font-black">${amount}</p></div>
        </div>
        <form onSubmit={submit} className="space-y-6 p-6 md:p-8">
          <section><h2 className="mb-4 text-lg font-bold text-slate-900">Contact information</h2><div className="grid gap-4 sm:grid-cols-2"><Field label="First name" name="firstName" value={form.firstName} update={update} /><Field label="Last name" name="lastName" value={form.lastName} update={update} /><Field label="Email" name="email" type="email" value={form.email} update={update} /><Field label="Phone" name="phone" type="tel" value={form.phone} update={update} /></div></section>
          <section><h2 className="mb-4 text-lg font-bold text-slate-900">Billing address</h2><div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Street address" name="address" value={form.address} update={update} /></div><Field label="City" name="city" value={form.city} update={update} /><Field label="State (2 letters)" name="state" maxLength={2} value={form.state} update={update} /><Field label="ZIP code" name="zip" value={form.zip} update={update} /></div></section>
          <section><h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900"><LockKeyhole className="h-5 w-5" /> Secure card payment</h2><div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Card number" name="cardNumber" inputMode="numeric" autoComplete="cc-number" value={form.cardNumber} update={update} /></div><Field label="Expiration month (MM)" name="expirationMonth" inputMode="numeric" maxLength={2} autoComplete="cc-exp-month" value={form.expirationMonth} update={update} /><Field label="Expiration year (YYYY)" name="expirationYear" inputMode="numeric" maxLength={4} autoComplete="cc-exp-year" value={form.expirationYear} update={update} /><Field label="Security code" name="cardCode" inputMode="numeric" maxLength={4} autoComplete="cc-csc" value={form.cardCode} update={update} /></div></section>
          {error && <div role="alert" className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">{error}</div>}
          <button type="submit" disabled={submitting || !scriptReady} className="w-full rounded-full bg-[#5B5FED] px-6 py-4 text-lg font-bold text-white transition hover:bg-[#4A4EDD] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "PROCESSING..." : `COMPLETE ORDER — $${amount}`}</button>
          <div className="border-t pt-5 text-center"><p className="mb-2 text-sm text-slate-600">Prefer to order by phone or need help?</p><a href="tel:+18582571162" className="inline-flex items-center gap-2 text-xl font-bold text-[#5B5FED]"><Phone className="h-5 w-5" />(858) 257-1162</a></div>
        </form>
      </div>
    </>
  )
}

function Field({ label, name, value, update, type = "text", ...props }: { label: string; name: keyof FormData; value: string; update: (name: keyof FormData, value: string) => void; type?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "onChange" | "type">) {
  return <label className="block text-sm font-medium text-slate-700">{label}<input {...props} name={name} type={type} value={value} onChange={(event) => update(name, event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#5B5FED] focus:ring-2 focus:ring-[#5B5FED]/20" required /></label>
}
