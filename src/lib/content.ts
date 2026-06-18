import { prisma } from '@/lib/prisma'

/**
 * Default Dutch "Over ons" / About copy. Shared between the public page and the
 * admin editor so the editor never pre-fills (and risks saving) a different
 * language than the site shows.
 */
export const ABOUT_FALLBACK = `Met meer dan tien jaar praktijkervaring in Nederland en daarbuiten brengen wij precisie en creatieve visie in elk project. Of het nu gaat om een volledige woningtransformatie of gedetailleerd gipswerk, ons team behandelt elke ruimte alsof het hun eigen is.

Wij zijn gespecialiseerd in gipswerk, interieurafwerking, schilderwerk en volledige woningrenovatie — met resultaten die de verwachtingen overtreffen, op tijd en binnen budget.`

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
