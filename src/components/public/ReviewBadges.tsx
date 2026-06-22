import { getContent } from '@/lib/content'

type Badge = {
  platform: string
  rating: string
  reviews: string
  url: string
  enabled: boolean
}

// Fixed, supported platforms in display order.
const ORDER = ['google', 'facebook', 'trustpilot', 'werkspot']

function Stars() {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ color: '#FBBC04', fontSize: '0.95rem' }}>★</span>
      ))}
    </span>
  )
}

function Logo({ platform }: { platform: string }) {
  if (platform === 'google') {
    // Reused from TestimonialsSection.tsx
    return (
      <svg width="30" height="30" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
    )
  }
  if (platform === 'facebook') {
    // Reused path from Footer.tsx, filled in the Facebook brand blue.
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  }
  if (platform === 'trustpilot') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#00B67A" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.5l7.1-.6z" />
      </svg>
    )
  }
  // werkspot — simple branded lettered badge
  return (
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        background: '#FF6B00',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-archivo)',
        fontWeight: 800,
        fontSize: '1rem',
        flexShrink: 0,
      }}
    >
      W
    </span>
  )
}

export default async function ReviewBadges() {
  const raw = await getContent('review_badges', '[]')

  let badges: Badge[] = []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) badges = parsed as Badge[]
  } catch {
    badges = []
  }

  // A badge shows once it's enabled and has a score. URL and review count are
  // optional — without a URL the card simply isn't a link.
  const visible = badges
    .filter(
      (b) =>
        b &&
        b.enabled === true &&
        typeof b.rating === 'string' &&
        b.rating.trim() !== ''
    )
    .sort((a, b) => ORDER.indexOf(a.platform) - ORDER.indexOf(b.platform))

  if (visible.length === 0) return null

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: '1px solid var(--border)',
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(20,24,29,0.05)',
    padding: '1.25rem 1.75rem',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
    minWidth: 130,
    flex: '0 1 150px',
  }

  return (
    <section style={{ background: 'var(--bg)', padding: '2.5rem 1.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: 1000, margin: '0 auto' }}>
        {visible.map((b) => {
          const hasUrl = typeof b.url === 'string' && b.url.trim() !== ''
          const inner = (
            <>
              <Logo platform={b.platform} />
              <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--white)', lineHeight: 1.1 }}>
                {b.rating}
              </span>
              <Stars />
              {b.reviews.trim() !== '' && (
                <span style={{ fontSize: '0.72rem', color: 'var(--white3)', fontWeight: 400 }}>
                  {b.reviews} reviews
                </span>
              )}
            </>
          )

          return hasUrl ? (
            <a key={b.platform} href={b.url} target="_blank" rel="noopener noreferrer" style={cardStyle}>
              {inner}
            </a>
          ) : (
            <div key={b.platform} style={cardStyle}>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
