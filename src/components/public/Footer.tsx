import { getContentMany } from '@/lib/content'
import { t, type Lang } from '@/lib/i18n'

const fallbacks: Record<string, string> = {
  contact_phone:    '06 84054528',
  contact_email:    'lamarstukadoor@gmail.com',
  contact_location: 'Geurdeland 17 g, 6673 DR Andelst',
  contact_hours:    'Ma – Za · 08:00 – 18:00',
  whatsapp_number:  '31684054528',
}

const circle: React.CSSProperties = {
  width: 40, height: 40, borderRadius: '50%', background: 'var(--white)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#FFFFFF', textDecoration: 'none', flexShrink: 0,
}

export default async function Footer({ lang }: { lang: Lang }) {
  const tr = t[lang].footer
  const c = await getContentMany(Object.keys(fallbacks))
  const get = (k: string) => c[k] || fallbacks[k]
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
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
            <a href={`https://wa.me/${get('whatsapp_number')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={circle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1B9dyMWyi8/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={circle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/lamarstukadoor" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={circle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
            </a>
            <a href="https://www.tiktok.com/@lamarstukadoor" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={circle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.05.86.13V9.4a6.84 6.84 0 0 0-.86-.06A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V8.65a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.08z"/></svg>
            </a>
            <a href="https://www.youtube.com/@lamarstukadoorenonderhod6868" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={circle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
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
