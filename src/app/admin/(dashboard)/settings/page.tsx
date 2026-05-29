export default function SettingsPage() {
  const infoRows = [
    { label: 'Admin URL',       value: '/admin (this page)',                           href: undefined },
    { label: 'Public Site',     value: '/',                                            href: '/' },
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

      {/* About This Site card */}
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
