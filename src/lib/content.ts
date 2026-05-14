import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export async function getContent(key: string, fallback: string): Promise<string> {
  try {
    const row = await prisma.content.findUnique({ where: { key } })
    return row?.value ?? fallback
  } catch {
    return fallback
  }
}

export const getLanguage = cache(async (): Promise<'en' | 'nl'> => {
  try {
    const settings = await prisma.settings.findUnique({ where: { id: 'default' } })
    return settings?.language === 'en' ? 'en' : 'nl'
  } catch {
    return 'nl'
  }
})

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
