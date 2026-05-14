import { t, type Lang } from '@/lib/i18n'

export default function ProcessSection({ lang }: { lang: Lang }) {
  const tr = t[lang].process
  const delays = ['d1', 'd2', 'd3', 'd4']

  return (
    <section id="process" style={{ padding: '8rem 3.5rem', background: 'var(--bg)' }}>
      <div className="rv">
        <div
          style={{
            fontSize: '0.63rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--teal2)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span style={{ display: 'block', width: '1.5rem', height: 1, background: 'var(--teal2)', flexShrink: 0 }} />
          {tr.tag}
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-archivo)',
            fontWeight: 800,
            fontSize: 'clamp(1.9rem,3vw,2.8rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.01em',
            color: 'var(--white)',
          }}
        >
          {tr.heading} <span style={{ color: 'var(--teal2)' }}>{tr.headingTeal}</span>
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          marginTop: '3.5rem',
          position: 'relative',
        }}
      >
        {/* Connecting line */}
        <div
          className="process-line"
          style={{
            position: 'absolute',
            top: 28,
            left: 'calc(12.5% + 1rem)',
            right: 'calc(12.5% + 1rem)',
            height: 1,
            background: 'linear-gradient(to right, var(--teal) 0%, var(--teal2) 100%)',
            zIndex: 0,
          }}
        />

        {tr.steps.map((step, i) => (
          <div
            key={step.num}
            className={`rv ${delays[i]}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 1.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--bg2)',
                border: '1px solid var(--teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.75rem',
                flexShrink: 0,
                transition: 'background 0.3s, border-color 0.3s',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-archivo)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: 'var(--teal2)',
                  letterSpacing: '0.08em',
                }}
              >
                {step.num}
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-archivo)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--white)',
                marginBottom: '0.75rem',
                letterSpacing: '-0.01em',
              }}
            >
              {step.title}
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                lineHeight: 1.72,
                color: 'var(--white2)',
                fontWeight: 300,
              }}
            >
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
