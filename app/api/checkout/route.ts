import { NextResponse } from "next/server"
import { z } from "zod"
import { processPayment } from "@/lib/authorize-net"
import { getDb } from "@/lib/db"

const PRODUCTS = {
  "main-47": { amount: 47, nextPath: "/upsell-1" },
  "upsell-97": { amount: 97, nextPath: "/confirmation" },
  "downsell-47": { amount: 47, nextPath: "/confirmation" },
} as const

const checkoutSchema = z.object({
  productType: z.enum(["main-47", "upsell-97", "downsell-47"]),
  opaqueDataDescriptor: z.string().min(1).max(100),
  opaqueDataValue: z.string().min(1).max(5000),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(2).max(200),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().length(2).transform((value) => value.toUpperCase()),
  zip: z.string().trim().min(5).max(10),
})

export async function POST(request: Request) {
  try {
    const checkout = checkoutSchema.parse(await request.json())
    const product = PRODUCTS[checkout.productType]
    const result = await processPayment({ ...checkout, amount: product.amount })
    if (!result.success) return NextResponse.json({ error: result.message }, { status: 402 })

    try {
      const sql = getDb()
      await sql`INSERT INTO purchases
        (first_name, last_name, email, phone, amount, card_last_four, transaction_id, product_type)
        VALUES (${checkout.firstName}, ${checkout.lastName}, ${checkout.email.toLowerCase()}, ${checkout.phone}, ${product.amount}, ${result.cardLastFour}, ${result.transactionId}, ${checkout.productType})`
    } catch (storageError) {
      // Never invite a customer to retry a payment that was already captured.
      console.error("Approved transaction could not be stored:", result.transactionId, storageError)
    }
    return NextResponse.json({ success: true, nextPath: product.nextPath })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please check all checkout fields and try again." }, { status: 400 })
    console.error("Checkout failed:", error)
    return NextResponse.json({ error: "Checkout is temporarily unavailable. Call (858) 257-1162 for help." }, { status: 500 })
  }
}
