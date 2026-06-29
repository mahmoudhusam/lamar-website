import { config } from 'dotenv'
config({ path: '.env.local' })

import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { writeFileSync } from 'node:fs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL_UNPOOLED! })
const prisma = new PrismaClient({ adapter })

/**
 * Exports all site content (text, contact details, theme, social links,
 * review badges, …) from the Content table to content-export.json.
 * Run against the source database, then hand content-export.json to whoever
 * imports it into the new database with `npm run content:import`.
 */
async function main() {
  const rows = await prisma.content.findMany({ orderBy: { key: 'asc' } })
  const data = rows.map((r) => ({ key: r.key, value: r.value }))
  writeFileSync('content-export.json', JSON.stringify(data, null, 2))
  console.log(`Exported ${data.length} content rows → content-export.json`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
