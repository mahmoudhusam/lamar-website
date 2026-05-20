import { t, type Lang } from '@/lib/i18n';


export default function Footer({ lang }: { lang: Lang }) {
  const tr = t[lang].footer;

  return (
    <footer
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        padding: '1.75rem 3.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <a
        href="#hero"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
        }}
      >
        <img
          src="lamar_icon.svg"
          alt=""
          style={{ height: 26, width: 'auto', display: 'block' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'var(--font-archivo)',
              fontWeight: 800,
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              color: 'var(--white)',
            }}
          >
            Lamar
          </span>
          <span
            style={{
              fontFamily: 'var(--font-archivo)',
              fontWeight: 300,
              fontSize: '0.42rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#6A6766',
            }}
          >
            Stukadoor en Onderhoud
          </span>
        </div>
      </a>

      <ul
        style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {tr.links.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="footer-link"
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--white2)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <span
        style={{
          fontSize: '0.68rem',
          color: 'rgba(242,238,230,0.2)',
          fontFamily: 'var(--font-archivo)',
        }}
      >
        {tr.copy}
      </span>
    </footer>
  );
}
