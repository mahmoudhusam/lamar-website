import { t, type Lang } from '@/lib/i18n'
import { getContent } from '@/lib/content'

export default async function HeroSection({ lang }: { lang: Lang }) {
  const tr = t[lang].hero
  const wa = await getContent('whatsapp_number', '31684054528')

  return (
    <section
      id="hero"
      style={{
        background: 'var(--bg)',
        padding: '7rem 3.5rem 4rem',
      }}
    >
      <div
        className="hero-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: '3.5rem',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
          {/* Trust / star pill */}
          <div className="rv" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 999, padding: '0.5rem 1rem', boxShadow: '0 4px 16px rgba(20,24,29,0.05)', marginBottom: '1.75rem' }}>
            <span style={{ display: 'inline-flex', gap: 2 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} style={{ color: 'var(--teal2)', fontSize: '0.9rem' }}>★</span>
              ))}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--white)', fontWeight: 500 }}>{tr.trustBadge}</span>
          </div>

          {/* Headline */}
          <h1 className="rv d1" style={{ fontFamily: 'var(--font-archivo)', fontWeight: 900, fontSize: 'clamp(2.6rem, 5vw, 5rem)', lineHeight: 1.02, letterSpacing: '-0.02em', color: 'var(--white)', marginBottom: '1.5rem' }}>
            {tr.headlineA}
            <br />
            <span style={{ color: 'var(--teal2)' }}>{tr.headlineB}</span>
          </h1>

          {/* Sub */}
          <p className="rv d2" style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--white2)', fontWeight: 300, maxWidth: 480, marginBottom: '2.25rem' }}>
            {tr.sub}
          </p>

          {/* CTAs */}
          <div className="rv d2" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <a href="/offerte-aanvragen" className="btn-teal" style={{ background: 'var(--teal)', color: '#FFFFFF', padding: '0.95rem 2rem', fontFamily: 'var(--font-outfit)', fontSize: '0.82rem', letterSpacing: '0.01em', textDecoration: 'none', fontWeight: 700, borderRadius: 999, display: 'inline-block', transition: 'background 0.2s' }}>
              {tr.quoteCta}
            </a>
            <a href="/werkwijze" className="btn-outline" style={{ border: '1px solid var(--border2)', color: 'var(--white)', padding: '0.95rem 2rem', fontFamily: 'var(--font-outfit)', fontSize: '0.82rem', letterSpacing: '0.01em', textDecoration: 'none', fontWeight: 600, borderRadius: 999, display: 'inline-block', transition: 'border-color 0.2s, color 0.2s' }}>
              {tr.processCta}
            </a>
          </div>

          {/* WhatsApp */}
          <a className="rv d2" href={`https://wa.me/${wa}`} style={{ color: 'var(--teal)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            📲 {tr.whatsappCta}
          </a>
        </div>

        {/* Right: rounded video card */}
        <div className="rv hero-media" style={{ position: 'relative', width: '100%', aspectRatio: '1/1', maxWidth: 560, marginLeft: 'auto', borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 60px rgba(20,24,29,0.18)', background: 'var(--bg2)' }}>
          <video autoPlay muted loop playsInline poster="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/hero-placeholder.mp4" type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', top: 16, right: 16, width: 34, height: 34, borderRadius: 8, background: 'rgba(20,24,29,0.45)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
        </div>
      </div>
    </section>
  )
}
