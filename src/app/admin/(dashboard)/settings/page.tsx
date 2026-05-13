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
        <p style={{ color: '#6B6B68', fontSize: '0.75rem', marginTop: '1rem' }}>
          Language switching on the public site is coming in Phase 5.
        </p>
      </div>
    </div>
  )
}
