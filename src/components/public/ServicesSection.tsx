import { getContentMany } from '@/lib/content'
import { t, type Lang } from '@/lib/i18n'

const services = [
  {
    key: 'service_gypsum',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ABFA8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    key: 'service_decoration',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ABFA8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    key: 'service_painting',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ABFA8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    key: 'service_restoration',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ABFA8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
]

const delays = ['d1', 'd2', 'd3', 'd4']

export default async function ServicesSection({ lang }: { lang: Lang }) {
  const tr = t[lang].services
  const content = await getContentMany(services.map((s) => s.key))

  return (
    <section id="services" style={{ padding: '8rem 3.5rem', background: 'var(--bg2)' }}>
      <div className="rv">
        <div style={{ fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--teal2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ display: 'block', width: '1.5rem', height: 1, background: 'var(--teal2)', flexShrink: 0 }} />
          {tr.tag}
        </div>
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.9rem,3vw,2.8rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: 'var(--white)' }}>
          {tr.heading} <span style={{ color: 'var(--teal2)' }}>{tr.headingTeal}</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '3.5rem' }}>
        {services.map((svc, i) => {
          const svcTr = tr.items[svc.key] ?? { name: svc.key, fallback: '' }
          return (
            <div
              key={svc.key}
              className={`svc-card rv ${delays[i]}`}
              style={{
                background: 'var(--bg3)',
                border: '1px solid var(--border)',
                borderRadius: 3,
                padding: '2.25rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
            >
              <div style={{ width: 44, height: 44, background: 'rgba(42,191,168,0.1)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {svc.icon}
              </div>
              <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)', letterSpacing: '-0.01em' }}>
                {svcTr.name}
              </div>
              <div style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'var(--white2)', fontWeight: 300 }}>
                {content[svc.key] ?? svcTr.fallback}
              </div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--teal2)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: 'auto', fontFamily: 'var(--font-archivo)', fontWeight: 500 }}>
                {tr.learnMore}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
