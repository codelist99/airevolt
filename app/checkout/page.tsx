import AuthorizeCheckout from "@/components/AuthorizeCheckout"

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams
  const productType = product === "upsell-97" || product === "downsell-47" ? product : "main-47"
  return <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-8 md:py-14"><div className="mx-auto max-w-2xl"><AuthorizeCheckout productType={productType} /></div></main>
}
