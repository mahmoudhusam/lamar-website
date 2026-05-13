const items = [
  { label: 'Gypsum Work', accent: true },
  { label: 'Interior Decoration', accent: false },
  { label: 'Painting', accent: true },
  { label: 'House Restoration', accent: false },
  { label: 'Ceiling Plaster', accent: true },
  { label: 'Wall Finishing', accent: false },
  { label: 'Full Renovation', accent: true },
  { label: 'Quality Guaranteed', accent: false },
]

export default function TickerSection() {
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
