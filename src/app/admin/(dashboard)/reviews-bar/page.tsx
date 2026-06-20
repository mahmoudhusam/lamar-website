import { getContent } from '@/lib/content'
import ReviewBadgesForm, { type BadgeRow } from './ReviewBadgesForm'

export const dynamic = 'force-dynamic'

const PLATFORMS = ['google', 'facebook', 'trustpilot', 'werkspot']

type Badge = { platform: string; rating: string; reviews: string; url: string; enabled: boolean }

export default async function ReviewsBarPage() {
  const raw = await getContent('review_badges', '[]')

  let saved: Badge[] = []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) saved = parsed as Badge[]
  } catch {
    saved = []
  }

  const byPlatform: Record<string, Badge> = {}
  for (const b of saved) if (b && typeof b.platform === 'string') byPlatform[b.platform] = b

  const defaults: BadgeRow[] = PLATFORMS.map((p) => ({
    platform: p,
    enabled: byPlatform[p]?.enabled ?? false,
    rating: byPlatform[p]?.rating ?? '',
    reviews: byPlatform[p]?.reviews ?? '',
    url: byPlatform[p]?.url ?? '',
  }))

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Rating Badges
        </h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
          Shown under the homepage hero. Edits appear instantly.
        </p>
      </div>

      <ReviewBadgesForm defaults={defaults} />
    </div>
  )
}
