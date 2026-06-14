/**
 * Centralised site constants used for SEO (metadata, sitemap, robots,
 * structured data). Override the base URL per-environment with
 * NEXT_PUBLIC_SITE_URL; the fallback matches the production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lamar-renovatie.nl'
).replace(/\/$/, '')

export const SITE_NAME = 'LAMAR Stukadoor en Onderhoud'

export const SITE_DESCRIPTION =
  'Professioneel stukadoorswerk, interieurafwerking, schilderwerk en woningrenovatie door LAMAR. Meer dan 200 projecten voltooid in Nederland. Kwaliteit die spreekt voor zich.'

/** Absolute URL helper for canonicals / OG / sitemap entries. */
export const absoluteUrl = (path = '') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
