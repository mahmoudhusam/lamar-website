import { getContentMany } from '@/lib/content';
import SocialLinksForm from './SocialLinksForm';

export default async function SettingsPage() {
  const ifoRows = [
    { label: 'Admin URL', value: '/admin (this page)', href: undefined },
    { label: 'Public Site', value: '/', href: '/' },
    {
      label: 'Cache Duration',
      value: '1 hour (content saves bypass this instantly)',
      href: undefined,
    },
  ];

  const socialKeys = [
    'social_facebook',
    'social_instagram',
    'social_tiktok',
    'social_youtube',
  ];
  const socialDefaults = await getContentMany(socialKeys);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-archivo)',
            color: '#14181D',
            fontSize: '1.5rem',
            fontWeight: 800,
            marginBottom: '0.25rem',
          }}
        >
          Settings
        </h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
          Site-wide configuration.
        </p>
      </div>

      {/* About This Site card */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(20,24,29,0.10)',
          borderRadius: 8,
          padding: '1.75rem',
          maxWidth: 480,
          marginBottom: '2rem',
        }}
      >
        <p
          style={{
            color: '#5B6470',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          About This Site
        </p>
        {ifoRows.map((row, i) => (
          <div
            key={row.label}
            style={{
              borderTop: i === 0 ? 'none' : '1px solid rgba(20,24,29,0.10)',
              paddingTop: i === 0 ? 0 : '0.85rem',
              marginTop: i === 0 ? 0 : '0.85rem',
            }}
          >
            <p
              style={{
                color: '#97A0AC',
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
              }}
            >
              {row.label}
            </p>
            {row.href ? (
              <a
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#1A6B60',
                  fontSize: '0.87rem',
                  textDecoration: 'none',
                }}
              >
                {row.value}
              </a>
            ) : (
              <p style={{ color: '#14181D', fontSize: '0.87rem' }}>
                {row.value}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Social Media Links card */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(20,24,29,0.10)',
          borderRadius: 8,
          padding: '1.75rem',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-archivo)',
              color: '#14181D',
              fontSize: '1.15rem',
              fontWeight: 800,
              marginBottom: '0.25rem',
            }}
          >
            Social Media Links
          </h2>
          <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
            Edits appear instantly on the public site.
          </p>
        </div>
        <SocialLinksForm defaults={socialDefaults} />
      </div>
    </div>
  );
}
