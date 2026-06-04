import { t, type Lang } from '@/lib/i18n'

export default function HeroSection({ lang }: { lang: Lang }) {
  const tr = t[lang].hero

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: 'var(--bg2)',
        paddingTop: 75,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/hero-placeholder.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(12,12,10,0.92) 0%, rgba(12,12,10,0.55) 45%, rgba(12,12,10,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Foreground content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 860,
          margin: '0 auto',
          padding: '5rem 3.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Trust badge */}
        <div
          className="rv"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--teal2)',
            marginBottom: '2rem',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal2)', flexShrink: 0 }} />
          {tr.trustBadge}
        </div>

        {/* H1 */}
        <h1
          className="rv d1"
          style={{
            fontFamily: 'var(--font-archivo)',
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: 'var(--white)',
            marginBottom: '1.75rem',
          }}
        >
          {tr.headlineA}
          <br />
          <span style={{ color: 'var(--teal2)' }}>{tr.headlineB}</span>
        </h1>

        {/* Sub */}
        <p
          className="rv d2"
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: 'var(--white)',
            opacity: 0.85,
            fontWeight: 300,
            maxWidth: 520,
            marginBottom: '2.5rem',
          }}
        >
          {tr.sub}
        </p>

        {/* CTA row */}
        <div className="rv d2" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <a
            href="#contact"
            className="btn-fill"
            style={{
              background: 'var(--white)',
              color: 'var(--bg)',
              padding: '0.875rem 2rem',
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              borderRadius: 2,
              display: 'inline-block',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {tr.quoteCta}
          </a>
          <a
            href="#process"
            className="btn-line"
            style={{
              border: '1px solid var(--border2)',
              color: 'var(--white2)',
              padding: '0.875rem 2rem',
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 400,
              borderRadius: 2,
              display: 'inline-block',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            {tr.processCta}
          </a>
        </div>

        {/* WhatsApp link — replace 000000000000 with real number */}
        <a
          className="rv d2"
          href="https://wa.me/000000000000"
          style={{
            color: 'var(--teal2)',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-outfit)',
            fontWeight: 400,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          📲 {tr.whatsappCta}
        </a>
      </div>
    </section>
  )
}
