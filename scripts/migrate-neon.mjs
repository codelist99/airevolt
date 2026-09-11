import { readFileSync } from "node:fs"
import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required")

const sql = neon(process.env.DATABASE_URL)
const schema = readFileSync(new URL("./003_create_neon_schema.sql", import.meta.url), "utf8")

for (const statement of schema.split(";").map((value) => value.trim()).filter(Boolean)) {
  await sql.query(statement)
}

const tables = await sql.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name")
console.log(`Neon schema ready: ${tables.map((row) => row.table_name).join(", ")}`)
