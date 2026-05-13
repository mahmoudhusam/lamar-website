const steps = [
  {
    num: '01',
    title: 'Free Consultation',
    desc: 'We visit your space, listen to your vision, and assess exactly what needs to be done — no obligation, no pressure.',
  },
  {
    num: '02',
    title: 'Clear Quote',
    desc: 'You receive a detailed, transparent quote within 48 hours. No hidden costs, no surprises — just an honest breakdown of the work.',
  },
  {
    num: '03',
    title: 'We Get to Work',
    desc: 'Our team arrives on schedule, works cleanly and efficiently, and keeps you informed throughout every stage of the project.',
  },
  {
    num: '04',
    title: 'Final Handover',
    desc: 'We do a walkthrough together, make sure everything meets your expectations, and only leave when you\'re fully satisfied.',
  },
]

const delays = ['d1', 'd2', 'd3', 'd4']

export default function ProcessSection() {
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
          Our Approach
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
          How We <span style={{ color: 'var(--teal2)' }}>Work</span>
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

        {steps.map((step, i) => (
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
