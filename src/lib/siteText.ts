import { cache } from 'react'
import { getContentMany } from '@/lib/content'
import { t } from '@/lib/i18n'

const nl = t.nl

/**
 * Registry of admin-editable homepage copy. Each field stores an override in
 * the Content table under `key`; when empty the hard-coded `fallback` (from the
 * i18n file) is used. The admin "Teksten" page renders these groups generically,
 * so adding a new editable phrase is just a new entry here.
 */
export type TextField = { key: string; label: string; fallback: string; multiline?: boolean }
export type TextGroup = { id: string; label: string; fields: TextField[] }

export const TEXT_GROUPS: TextGroup[] = [
  {
    id: 'hero',
    label: 'Hero (bovenaan de homepage)',
    fields: [
      { key: 'home_hero_headline_a', label: 'Titel — regel 1', fallback: nl.hero.headlineA },
      { key: 'home_hero_headline_b', label: 'Titel — regel 2 (accentkleur)', fallback: nl.hero.headlineB },
      { key: 'home_hero_sub', label: 'Subtekst', fallback: nl.hero.sub, multiline: true },
      { key: 'home_hero_trust', label: 'Beoordelings-badge', fallback: nl.hero.trustBadge },
      { key: 'home_hero_cta_quote', label: 'Knop — offerte', fallback: nl.hero.quoteCta },
      { key: 'home_hero_cta_process', label: 'Knop — werkwijze', fallback: nl.hero.processCta },
    ],
  },
  {
    id: 'process',
    label: 'Werkwijze / Proces',
    fields: [
      { key: 'home_process_heading_a', label: 'Titel — regel 1', fallback: nl.werkwijze.headingA },
      { key: 'home_process_heading_b', label: 'Titel — regel 2', fallback: nl.werkwijze.headingB },
      { key: 'home_process_heading_accent', label: 'Titel — accentwoord', fallback: nl.werkwijze.headingAccent },
      { key: 'home_process_sub', label: 'Subtekst', fallback: nl.werkwijze.sub, multiline: true },
    ],
  },
  {
    id: 'benefits',
    label: 'Voordelen',
    fields: [
      { key: 'home_benefits_heading_a', label: 'Titel — deel 1', fallback: nl.benefits.headingA },
      { key: 'home_benefits_heading_accent', label: 'Titel — accentwoord', fallback: nl.benefits.headingAccent },
      { key: 'home_benefits_heading_b', label: 'Titel — deel 2', fallback: nl.benefits.headingB },
      { key: 'home_benefits_sub', label: 'Subtekst', fallback: nl.benefits.sub, multiline: true },
    ],
  },
  {
    id: 'testimonials',
    label: 'Beoordelingen',
    fields: [
      { key: 'home_testimonials_heading', label: 'Titel', fallback: nl.testimonials.heading },
      { key: 'home_testimonials_heading_accent', label: 'Titel — accentwoord', fallback: nl.testimonials.headingTeal },
      { key: 'home_testimonials_sub', label: 'Subtekst', fallback: nl.testimonials.sub, multiline: true },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    fields: [
      { key: 'home_contact_quote', label: 'Quote-band', fallback: nl.contactCards.quote, multiline: true },
      { key: 'home_contact_heading', label: 'Titel', fallback: nl.contactCards.heading },
      { key: 'home_contact_sub', label: 'Subtekst', fallback: nl.contactCards.sub, multiline: true },
    ],
  },
]

export const TEXT_KEYS = TEXT_GROUPS.flatMap((g) => g.fields.map((f) => f.key))

const FALLBACKS: Record<string, string> = Object.fromEntries(
  TEXT_GROUPS.flatMap((g) => g.fields.map((f) => [f.key, f.fallback]))
)

/**
 * Request-cached resolver for editable copy. `cache()` dedupes the DB read so
 * every section component on a page shares a single query.
 * Usage: const tx = await getSiteText(); tx('home_hero_headline_a')
 */
export const getSiteText = cache(async () => {
  const overrides = await getContentMany(TEXT_KEYS)
  return (key: string): string => {
    const v = overrides[key]
    return v && v.trim() ? v : FALLBACKS[key] ?? ''
  }
})
