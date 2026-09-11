import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminLogoutButton from "@/components/AdminLogoutButton"
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-auth"
import { getDb } from "@/lib/db"

export const dynamic = "force-dynamic"

type Lead = { id: string; first_name: string; last_name: string; email: string; phone: string; created_at: string }
type Purchase = Lead & { amount: string; transaction_id: string; product_type: string; card_last_four: string | null }

export default async function AdminPage() {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login")

  const sql = getDb()
  const [leads, purchases, visitCount] = await Promise.all([
    sql`SELECT id, first_name, last_name, email, phone, created_at FROM leads ORDER BY created_at DESC LIMIT 250` as unknown as Promise<Lead[]>,
    sql`SELECT id, first_name, last_name, email, phone, amount, card_last_four, transaction_id, product_type, created_at FROM purchases ORDER BY created_at DESC LIMIT 250` as unknown as Promise<Purchase[]>,
    sql`SELECT count(*)::int AS count FROM page_visits`,
  ])
  const revenue = purchases.reduce((sum, purchase) => sum + Number(purchase.amount), 0)

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div><h1 className="text-3xl font-bold">Admin Dashboard</h1><p className="text-slate-600">Secure lead and purchase reporting</p></div>
          <AdminLogoutButton />
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Metric label="Leads" value={leads.length.toLocaleString()} />
          <Metric label="Purchases" value={purchases.length.toLocaleString()} />
          <Metric label="Revenue" value={revenue.toLocaleString("en-US", { style: "currency", currency: "USD" })} />
        </div>
        <p className="mb-8 text-sm text-slate-500">Recorded page visits: {Number(visitCount[0]?.count || 0).toLocaleString()}</p>
        <DataSection title="Recent purchases">
          <table className="w-full min-w-[850px] text-left text-sm"><thead><tr className="border-b bg-slate-50"><Th>Date</Th><Th>Customer</Th><Th>Email</Th><Th>Phone</Th><Th>Product</Th><Th>Amount</Th><Th>Transaction</Th></tr></thead><tbody>{purchases.map((purchase) => <tr key={purchase.id} className="border-b last:border-0"><Td>{formatDate(purchase.created_at)}</Td><Td>{purchase.first_name} {purchase.last_name}</Td><Td>{purchase.email}</Td><Td>{purchase.phone}</Td><Td>{purchase.product_type}</Td><Td>${Number(purchase.amount).toFixed(2)}</Td><Td>{purchase.transaction_id}</Td></tr>)}</tbody></table>
        </DataSection>
        <DataSection title="Recent leads">
          <table className="w-full min-w-[700px] text-left text-sm"><thead><tr className="border-b bg-slate-50"><Th>Date</Th><Th>Name</Th><Th>Email</Th><Th>Phone</Th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.id} className="border-b last:border-0"><Td>{formatDate(lead.created_at)}</Td><Td>{lead.first_name} {lead.last_name}</Td><Td>{lead.email}</Td><Td>{lead.phone}</Td></tr>)}</tbody></table>
        </DataSection>
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-white p-6 shadow-sm"><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div> }
function DataSection({ title, children }: { title: string; children: React.ReactNode }) { return <section className="mb-8 overflow-hidden rounded-xl bg-white shadow-sm"><h2 className="border-b px-6 py-4 text-xl font-bold">{title}</h2><div className="overflow-x-auto">{children}</div></section> }
function Th({ children }: { children: React.ReactNode }) { return <th className="px-4 py-3 font-semibold">{children}</th> }
function Td({ children }: { children: React.ReactNode }) { return <td className="px-4 py-3">{children}</td> }
function formatDate(value: string) { return new Date(value).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" }) }
