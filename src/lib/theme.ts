// Client-safe theme constants and helpers (no server-only imports).
// The server-side loader lives in `@/lib/themeServer`.

export const THEME_DEFAULTS = { primary: '#1A6B60', accent: '#2ABFA8' }
export const THEME_KEYS = ['theme_primary', 'theme_accent']

const HEX = /^#[0-9a-fA-F]{6}$/

/** Only allow plain 6-digit hex — the value is injected into a style attribute. */
export function safeHex(value: string | undefined, fallback: string): string {
  return value && HEX.test(value) ? value : fallback
}

export type Theme = { primary: string; accent: string }

/** A few one-click palettes for the admin. */
export const THEME_PRESETS: { name: string; primary: string; accent: string }[] = [
  { name: 'Teal (standaard)', primary: '#1A6B60', accent: '#2ABFA8' },
  { name: 'Blauw',            primary: '#1E5A8A', accent: '#3B9BD8' },
  { name: 'Groen',            primary: '#2F6B34', accent: '#5FB85F' },
  { name: 'Oranje',           primary: '#B5531F', accent: '#F08A3C' },
  { name: 'Paars',            primary: '#5B3A8A', accent: '#9B6FD8' },
  { name: 'Antraciet',        primary: '#2A2F36', accent: '#6B7785' },
]
