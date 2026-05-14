import { t, type Lang } from '@/lib/i18n'

export default function TickerSection({ lang }: { lang: Lang }) {
  const items = t[lang].ticker
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
        overflow: 'hidden',
        padding: '0.9rem 0',
      }}
    >
      <div className="ticker-track" style={{ display: 'flex', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-archivo)',
              fontWeight: 700,
              fontSize: '0.68rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: item.accent ? 'var(--teal2)' : 'var(--white2)',
              padding: '0 2.5rem',
              borderRight: '1px solid var(--border)',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
