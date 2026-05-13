const P = 'https://images.pexels.com/photos'

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '52% 48%',
        background: 'var(--bg)',
        overflow: 'hidden',
        paddingTop: 75,
      }}
    >
      {/* Left */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '5rem 3rem 5rem 3.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Tag */}
        <div
          className="rv"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--teal2)',
            marginBottom: '2rem',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal2)', flexShrink: 0 }} />
          Renovation &amp; Decoration Specialists
        </div>

        {/* Title */}
        <h1
          className="rv d1"
          style={{
            fontFamily: 'var(--font-archivo)',
            fontWeight: 900,
            fontSize: 'clamp(3rem,5.8vw,6.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: 'var(--white)',
            textTransform: 'uppercase',
            marginBottom: '2.5rem',
          }}
        >
          We Build
          <br />
          <span style={{ color: 'var(--teal2)' }}>Spaces</span>
          <br />
          <span>That Last.</span>
        </h1>

        {/* Description */}
        <p
          className="rv d2"
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.78,
            color: 'var(--white2)',
            fontWeight: 300,
            maxWidth: 380,
            marginBottom: '2.5rem',
          }}
        >
          Gypsum work, interior decoration, painting, and full house restoration —
          delivered with craftsmanship that speaks for itself.
        </p>

        {/* CTAs */}
        <div className="rv d2" style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href="#our-work"
            className="btn-fill"
            style={{
              background: 'var(--white)',
              color: 'var(--bg)',
              padding: '0.875rem 2rem',
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              borderRadius: 2,
              display: 'inline-block',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            See Our Work
          </a>
          <a
            href="#contact"
            className="btn-line"
            style={{
              border: '1px solid var(--border2)',
              color: 'var(--white2)',
              padding: '0.875rem 2rem',
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 400,
              borderRadius: 2,
              display: 'inline-block',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            Get a Quote
          </a>
        </div>

        {/* Stats */}
        <div
          className="rv d3"
          style={{
            display: 'flex',
            gap: '2.5rem',
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          {[
            { n: '200+', l: 'Projects Done' },
            { n: '12+', l: 'Years Active' },
            { n: '100%', l: 'Satisfaction' },
          ].map(({ n, l }) => (
            <div key={l}>
              <span
                style={{
                  fontFamily: 'var(--font-archivo)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--white)',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                {n}
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--white2)',
                  display: 'block',
                  marginTop: 3,
                }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — image panel */}
      <div className="rvl" style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#2A5048',
            backgroundImage: `url('${P}/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 45%, var(--bg) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: '3rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,238,230,0.35)' }}>
            Premium Renovation Work
          </span>
          <span style={{ background: 'var(--teal)', color: 'var(--white)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.45rem 1rem', borderRadius: 2, fontFamily: 'var(--font-archivo)', fontWeight: 500 }}>
            Est. 2013
          </span>
        </div>
      </div>
    </section>
  )
}
