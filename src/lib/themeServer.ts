import { cache } from 'react'
import { getContentMany } from '@/lib/content'
import { THEME_DEFAULTS, THEME_KEYS, safeHex, type Theme } from '@/lib/theme'

export const getTheme = cache(async (): Promise<Theme> => {
  const c = await getContentMany(THEME_KEYS)
  return {
    primary: safeHex(c['theme_primary'], THEME_DEFAULTS.primary),
    accent: safeHex(c['theme_accent'], THEME_DEFAULTS.accent),
  }
})
