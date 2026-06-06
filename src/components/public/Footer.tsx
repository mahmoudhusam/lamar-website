import { getContentMany } from '@/lib/content'
import { t, type Lang } from '@/lib/i18n'

const fallbacks: Record<string, string> = {
  contact_phone:    '+31 00 000 0000',
  contact_email:    'info@lamar-renovatie.nl',
  contact_location: 'Nederland',
  contact_hours:    'Ma – Za · 08:00 – 18:00',
}

const circle: React.CSSProperties = {
  width: 40, height: 40, borderRadius: '50%', background: 'var(--white)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#FFFFFF', textDecoration: 'none', flexShrink: 0,
}

export default async function Footer({ lang }: { lang: Lang }) {
  const tr = t[lang].footer
  const c = await getContentMany(Object.keys(fallbacks))
  const get = (k: string) => c[k] ?? fallbacks[k]
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '4rem 3.5rem 2rem' }}>
      <div className="site-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem', maxWidth: 1100, margin: '0 auto' }}>
        {/* Brand + contact */}
        <div>
          <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--white)', marginBottom: '1.25rem' }}>
            LAMAR Stukadoor en Onderhoud
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--white2)', lineHeight: 2, fontWeight: 300 }}>
            <div>{get('contact_location')}</div>
            <div style={{ marginTop: '0.75rem' }}>T: {get('contact_phone')}</div>
            <div>E: {get('contact_email')}</div>
            <div>{get('contact_hours')}</div>
          </div>
          {/* Socials — replace href placeholders with the client's real links */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
            <a href="https://wa.me/000000000000" aria-label="WhatsApp" style={circle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" style={circle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" style={circle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Pages */}
        <div>
          <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--white)', marginBottom: '1.25rem' }}>
            {tr.pagesLabel}
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {tr.links.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="footer-link" style={{ fontSize: '0.9rem', color: 'var(--white2)', textDecoration: 'none', fontWeight: 300, transition: 'color 0.2s' }}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--white3)' }}>
        © {year} LAMAR Stukadoor en Onderhoud. Alle rechten voorbehouden.
      </div>
    </footer>
  )
}
