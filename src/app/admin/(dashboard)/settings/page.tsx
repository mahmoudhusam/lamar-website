import { prisma } from '@/lib/prisma'
import { saveLanguage } from './actions'

export default async function SettingsPage() {
  const settings = await prisma.settings.findUnique({ where: { id: 'default' } })
  const lang = settings?.language ?? 'nl'

  const saveEn = saveLanguage.bind(null, 'en')
  const saveNl = saveLanguage.bind(null, 'nl')

  const activeStyle: React.CSSProperties = {
    background: '#2ABFA8',
    color: '#0C0C0A',
    border: '1px solid #2ABFA8',
    borderRadius: 6,
    padding: '0.55rem 1.5rem',
    fontSize: '0.83rem',
    fontWeight: 700,
    cursor: 'pointer',
  }

  const inactiveStyle: React.CSSProperties = {
    background: 'transparent',
    color: '#9A9A96',
    border: '1px solid #2A2A28',
    borderRadius: 6,
    padding: '0.55rem 1.5rem',
    fontSize: '0.83rem',
    fontWeight: 500,
    cursor: 'pointer',
  }

  const infoRows = [
    { label: 'Admin URL',       value: '/admin (this page)',                          href: undefined },
    { label: 'Public Site',     value: '/',                                           href: '/' },
    { label: 'Cache Duration',  value: '1 hour (content saves bypass this instantly)', href: undefined },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#F2EEE6', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Settings
        </h1>
        <p style={{ color: '#6B6B68', fontSize: '0.85rem' }}>
          Site-wide configuration.
        </p>
      </div>

      {/* Language card */}
      <div
        style={{
          background: '#1A1A18',
          border: '1px solid #2A2A28',
          borderRadius: 8,
          padding: '1.75rem',
          maxWidth: 480,
        }}
      >
        <p style={{ color: '#9A9A96', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Site Language
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <form action={saveNl}>
            <button type="submit" style={lang === 'nl' ? activeStyle : inactiveStyle}>
              Nederlands
            </button>
          </form>
          <form action={saveEn}>
            <button type="submit" style={lang === 'en' ? activeStyle : inactiveStyle}>
              English
            </button>
          </form>
        </div>
        <p style={{ color: '#6B6B68', fontSize: '0.78rem', marginTop: '1rem' }}>
          The public site updates within 1 hour, or immediately after any content save from the other editor pages.
        </p>
      </div>

      {/* About This Site card */}
      <div
        style={{
          background: '#1A1A18',
          border: '1px solid #2A2A28',
          borderRadius: 8,
          padding: '1.75rem',
          maxWidth: 480,
          marginTop: '1rem',
        }}
      >
        <p style={{ color: '#9A9A96', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          About This Site
        </p>
        {infoRows.map((row, i) => (
          <div
            key={row.label}
            style={{
              borderTop: i === 0 ? 'none' : '1px solid #2A2A28',
              paddingTop: i === 0 ? 0 : '0.85rem',
              marginTop: i === 0 ? 0 : '0.85rem',
            }}
          >
            <p style={{ color: '#6B6B68', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              {row.label}
            </p>
            {row.href ? (
              <a
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2ABFA8', fontSize: '0.87rem', textDecoration: 'none' }}
              >
                {row.value}
              </a>
            ) : (
              <p style={{ color: '#F2EEE6', fontSize: '0.87rem' }}>{row.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
