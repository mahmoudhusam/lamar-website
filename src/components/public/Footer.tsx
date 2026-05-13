const LogoMark = () => (
  <svg width="26" height="22" viewBox="0 0 120 100">
    <polygon points="0,90 55,5 95,5 70,90" fill="#A0A0A0" />
    <polygon points="60,10 115,10 120,90 75,90" fill="#4BBFBF" />
    <polyline points="63,58 78,42 93,58" fill="none" stroke="white" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
    <rect x="68" y="58" width="20" height="16" fill="white" rx="1" />
    <rect x="74" y="64" width="8" height="10" fill="#4BBFBF" />
  </svg>
)

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#our-work' },
  { label: 'Contact',  href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '1.75rem 3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <LogoMark />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--white)' }}>Lamar</span>
          <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 300, fontSize: '0.42rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6A6766' }}>Stukadoor en Onderhoud</span>
        </div>
      </a>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="footer-link" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white2)', textDecoration: 'none', transition: 'color 0.2s' }}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <span style={{ fontSize: '0.68rem', color: 'rgba(242,238,230,0.2)', fontFamily: 'var(--font-archivo)' }}>
        © 2025 LAMAR Renovation &amp; Decoration. All rights reserved.
      </span>
    </footer>
  )
}
