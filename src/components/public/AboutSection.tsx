import { getContent } from '@/lib/content'

const P = 'https://images.pexels.com/photos'

const quals = [
  'Gypsum & Plaster',
  'Interior Decoration',
  'Painting & Finishing',
  'House Restoration',
  'On-Time Delivery',
  'Quality Guaranteed',
]

const FALLBACK_TEXT = `With over a decade of hands-on experience across the Netherlands and beyond, we bring precision and creative vision to every project. Whether a full home transformation or detailed gypsum decoration, our team treats every space as if it were their own.

We specialise in gypsum work, interior decoration, painting, and complete house restoration — delivering results that exceed expectations, on time and on budget.`

export default async function AboutSection() {
  const aboutText = await getContent('about_text', FALLBACK_TEXT)
  const paragraphs = aboutText.split('\n\n').filter(Boolean)

  return (
    <section id="about" style={{ padding: '9rem 3.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', background: 'var(--bg)' }}>
      {/* Left text */}
      <div>
        <div className="rv" style={{ fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--teal2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ display: 'block', width: '1.5rem', height: 1, background: 'var(--teal2)', flexShrink: 0 }} />
          About LAMAR
        </div>
        <h2 className="rv d1" style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.9rem,3vw,2.8rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: 'var(--white)', marginBottom: '1.75rem' }}>
          We Don&apos;t Just Renovate.<br />We <span style={{ color: 'var(--teal2)' }}>Transform.</span>
        </h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="rv d2" style={{ fontSize: '0.95rem', lineHeight: 1.82, color: 'var(--white2)', fontWeight: 300, marginBottom: '1rem' }}>
            {p}
          </p>
        ))}
        <div className="rv d3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', marginTop: '2rem' }}>
          {quals.map((q) => (
            <div key={q} className="qual-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.85rem', color: 'var(--white2)', padding: '0.8rem 1rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 3, transition: 'border-color 0.2s, color 0.2s' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--teal2)', flexShrink: 0 }} />
              {q}
            </div>
          ))}
        </div>
      </div>

      {/* Right image */}
      <div className="rvl" style={{ position: 'relative', paddingBottom: '1.5rem', paddingRight: '1.5rem' }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '4/5',
          backgroundColor: '#3A5A50',
            backgroundImage: `url('${P}/13067890/pexels-photo-13067890.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(12,12,10,0.5) 100%)' }} />
        </div>
        {/* Badge */}
        <div style={{ position: 'absolute', bottom: 0, left: '-1rem', background: 'var(--teal)', padding: '1.75rem 1.5rem', borderRadius: 3, textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 900, fontSize: '2.6rem', color: 'var(--white)', lineHeight: 1, display: 'block' }}>12+</span>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,238,230,0.7)', marginTop: '0.35rem', display: 'block', lineHeight: 1.6 }}>
            Years of<br />Experience
          </span>
        </div>
        {/* Float card */}
        <div style={{ position: 'absolute', top: '2rem', right: 0, background: 'var(--bg3)', border: '1px solid var(--border)', padding: '1.25rem 1.5rem', borderRadius: 3 }}>
          <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--white)', display: 'block', lineHeight: 1 }}>200+</span>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white2)', marginTop: '0.3rem', display: 'block' }}>
            Projects<br />Completed
          </span>
        </div>
      </div>
    </section>
  )
}
