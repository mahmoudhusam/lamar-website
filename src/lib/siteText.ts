import { cache } from 'react'
import { getContentMany } from '@/lib/content'
import { t } from '@/lib/i18n'

const nl = t.nl

/**
 * Registry of admin-editable homepage copy. Each field stores an override in
 * the Content table under `key`; when empty the hard-coded `fallback` (from the
 * i18n file) is used. The admin "Texts" page renders these groups generically,
 * so adding a new editable phrase is just a new entry here.
 *
 * Labels are English (admin language) with the Dutch term in parentheses so the
 * Dutch client knows which piece of site copy each field maps to. `anchor` is
 * the homepage section id used by the "View on site" preview links.
 */
export type TextField = { key: string; label: string; fallback: string; multiline?: boolean }
export type TextGroup = { id: string; label: string; anchor: string; fields: TextField[] }

// Generated, index-aligned fields for the repeating list sections so they stay
// in sync with the i18n source arrays.
const benefitItemFields: TextField[] = nl.benefits.items.flatMap((it, i) => [
  { key: `home_benefits_item${i + 1}_title`, label: `Benefit ${i + 1} — title (Voordeel ${i + 1})`, fallback: it.title },
  { key: `home_benefits_item${i + 1}_text`, label: `Benefit ${i + 1} — text`, fallback: it.text, multiline: true },
])

const processStepFields: TextField[] = nl.werkwijze.steps.map((s, i) => ({
  key: `home_process_step${i + 1}`,
  label: `Step ${i + 1} — title (Stap ${i + 1})`,
  fallback: s.title,
}))

const faqFields: TextField[] = nl.faq.items.flatMap((it, i) => [
  { key: `home_faq_q${i + 1}`, label: `Question ${i + 1} (Vraag ${i + 1})`, fallback: it.q },
  { key: `home_faq_a${i + 1}`, label: `Answer ${i + 1} (Antwoord ${i + 1})`, fallback: it.a, multiline: true },
])

const contactCardFields: TextField[] = nl.contactCards.cards.flatMap((card, i) => [
  { key: `home_contact_card${i + 1}_title`, label: `Card ${i + 1} — title (Kaart ${i + 1})`, fallback: card.title },
  { key: `home_contact_card${i + 1}_text`, label: `Card ${i + 1} — text`, fallback: card.text, multiline: true },
  { key: `home_contact_card${i + 1}_btn`, label: `Card ${i + 1} — button (Knop)`, fallback: card.btn },
])

export const TEXT_GROUPS: TextGroup[] = [
  {
    id: 'hero',
    label: 'Hero — top of the homepage (Hero)',
    anchor: '#hero',
    fields: [
      { key: 'home_hero_headline_a', label: 'Title — line 1 (Titel)', fallback: nl.hero.headlineA },
      { key: 'home_hero_headline_b', label: 'Title — line 2, accent colour (Titel accent)', fallback: nl.hero.headlineB },
      { key: 'home_hero_sub', label: 'Subtext (Subtekst)', fallback: nl.hero.sub, multiline: true },
      { key: 'home_hero_trust', label: 'Rating badge (Beoordelings-badge)', fallback: nl.hero.trustBadge },
      { key: 'home_hero_cta_quote', label: 'Quote button (Knop offerte)', fallback: nl.hero.quoteCta },
      { key: 'home_hero_cta_process', label: 'Process button (Knop werkwijze)', fallback: nl.hero.processCta },
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp section (WhatsApp-sectie)',
    anchor: '#how-it-works',
    fields: [
      { key: 'home_whatsapp_heading', label: 'Title (Titel)', fallback: nl.chat.heading },
      { key: 'home_whatsapp_heading_accent', label: 'Title — accent word (Titel accent)', fallback: nl.chat.headingTeal },
    ],
  },
  {
    id: 'process',
    label: 'Process (Werkwijze)',
    anchor: '#process',
    fields: [
      { key: 'home_process_heading_a', label: 'Title — line 1 (Titel)', fallback: nl.werkwijze.headingA },
      { key: 'home_process_heading_b', label: 'Title — line 2', fallback: nl.werkwijze.headingB },
      { key: 'home_process_heading_accent', label: 'Title — accent word', fallback: nl.werkwijze.headingAccent },
      { key: 'home_process_sub', label: 'Subtext (Subtekst)', fallback: nl.werkwijze.sub, multiline: true },
      ...processStepFields,
    ],
  },
  {
    id: 'benefits',
    label: 'Benefits (Voordelen)',
    anchor: '#benefits',
    fields: [
      { key: 'home_benefits_heading_a', label: 'Title — part 1 (Titel)', fallback: nl.benefits.headingA },
      { key: 'home_benefits_heading_accent', label: 'Title — accent word', fallback: nl.benefits.headingAccent },
      { key: 'home_benefits_heading_b', label: 'Title — part 2', fallback: nl.benefits.headingB },
      { key: 'home_benefits_sub', label: 'Subtext (Subtekst)', fallback: nl.benefits.sub, multiline: true },
      ...benefitItemFields,
    ],
  },
  {
    id: 'testimonials',
    label: 'Reviews (Beoordelingen)',
    anchor: '#testimonials',
    fields: [
      { key: 'home_testimonials_heading', label: 'Title (Titel)', fallback: nl.testimonials.heading },
      { key: 'home_testimonials_heading_accent', label: 'Title — accent word', fallback: nl.testimonials.headingTeal },
      { key: 'home_testimonials_sub', label: 'Subtext (Subtekst)', fallback: nl.testimonials.sub, multiline: true },
    ],
  },
  {
    id: 'faq',
    label: 'FAQ (Veelgestelde vragen)',
    anchor: '#faq',
    fields: [
      { key: 'home_faq_heading', label: 'Title (Titel)', fallback: nl.faq.heading },
      ...faqFields,
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    anchor: '#contact',
    fields: [
      { key: 'home_contact_quote', label: 'Quote band (Quote-band)', fallback: nl.contactCards.quote, multiline: true },
      { key: 'home_contact_heading', label: 'Title (Titel)', fallback: nl.contactCards.heading },
      { key: 'home_contact_sub', label: 'Subtext (Subtekst)', fallback: nl.contactCards.sub, multiline: true },
      ...contactCardFields,
    ],
  },
  {
    id: 'footer',
    label: 'Footer',
    anchor: '',
    fields: [
      { key: 'footer_copy', label: 'Copyright text — year is added automatically (Copyright)', fallback: 'LAMAR Stukadoor en Onderhoud. Alle rechten voorbehouden.' },
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
