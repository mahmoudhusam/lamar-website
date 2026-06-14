import { prisma } from '@/lib/prisma'

export async function getContent(key: string, fallback: string): Promise<string> {
  try {
    const row = await prisma.content.findUnique({ where: { key } })
    return row?.value || fallback
  } catch {
    return fallback
  }
}

export async function getLanguage(): Promise<'nl'> {
  return 'nl'
}

export async function getContentMany(
  keys: string[]
): Promise<Record<string, string>> {
  try {
    const rows = await prisma.content.findMany({ where: { key: { in: keys } } })
    const map: Record<string, string> = {}
    for (const row of rows) map[row.key] = row.value
    return map
  } catch {
    return {}
  }
}

/**
 * Upsert a batch of content key/value pairs in a single transaction.
 * Shared by the admin content editors (about, contact, offerte, werkwijze, settings).
 */
export async function setContentKeys(entries: Record<string, string>): Promise<void> {
  const keys = Object.keys(entries)
  await prisma.$transaction(
    keys.map((key) =>
      prisma.content.upsert({
        where: { key },
        update: { value: entries[key] },
        create: { key, value: entries[key] },
      })
    )
  )
}
