import { config } from 'dotenv'
config({ path: '.env.local' })

import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { readFileSync } from 'node:fs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL_UNPOOLED! })
const prisma = new PrismaClient({ adapter })

/**
 * Imports content-export.json into the Content table of the target database.
 * Idempotent (upsert by key), so it is safe to run more than once. Run after
 * `npx prisma db push` has created the tables.
 */
async function main() {
  const raw = readFileSync('content-export.json', 'utf8')
  const data = JSON.parse(raw) as { key: string; value: string }[]
  if (!Array.isArray(data)) throw new Error('content-export.json must be an array of { key, value }')

  for (const { key, value } of data) {
    await prisma.content.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  }
  console.log(`Imported ${data.length} content rows into the database.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
