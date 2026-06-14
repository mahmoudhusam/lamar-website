import { articles } from '@/lib/infohub'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import ContactSection from '@/components/public/ContactSection'
import RevealObserver from '@/components/public/RevealObserver'

export const revalidate = 3600

export const metadata = {
  title: 'Infohub',
  description: 'Praktische uitleg over stucwerk, plafonds, sausklaar afwerken en renovatie. Antwoorden op de meestgestelde vragen van LAMAR.',
  alternates: { canonical: '/infohub' },
}

const HERO_IMG = 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=1400&h=800&fit=crop'

export default function InfohubPage() {
  const lang = 'nl' as const
  return (
    <>
      <Navbar lang={lang} />
      <main>
        <style>{`.info-card{transition:transform .2s}.info-card:hover{transform:translateY(-4px)}.info-card:hover .info-pill{background:var(--teal2)}`}</style>

        {/* Hero */}
        <section id="info-top" style={{ background: 'var(--bg)', padding: '6rem 3.5rem 0' }}>
          <div className="info-hero rv" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', borderRadius: 28, overflow: 'hidden', minHeight: 520, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', backgroundImage: `linear-gradient(rgba(255,255,255,0.45), rgba(255,255,255,0.25)), url('${HERO_IMG}')`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '3rem' }}>
            <h1 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.9rem,3.8vw,3.4rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: 'var(--white)', margin: 0, maxWidth: 900 }}>
              Infohub: inspiratie, technieken en stucverhalen
            </h1>
            <div className="info-hero-card" style={{ marginTop: '2rem', maxWidth: 560, background: 'rgba(20,24,29,0.92)', borderRadius: 20, padding: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>Alles wat u moet weten</div>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.8)', fontWeight: 300, marginBottom: '1.25rem' }}>
                Welkom in de infohub, waar inspiratie en vakmanschap samenkomen. Hier komt stucwerk tot leven door verhalen, inzichten en bewezen technieken uit de praktijk — van subtiele wandafwerking tot uitgesproken structuren.
              </p>
              <a href="#info-cards" style={{ background: '#FFFFFF', color: 'var(--white)', padding: '0.6rem 1.5rem', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Lees meer</a>
            </div>
          </div>
        </section>

        {/* Card grid */}
        <section id="info-cards" style={{ background: 'var(--bg)', padding: '4rem 3.5rem 6rem' }}>
          <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
            {articles.map((a) => (
              <a key={a.slug} href={`/infohub/${a.slug}`} className="info-card rv" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(150deg, var(--teal2) 0%, var(--teal) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', boxShadow: '0 18px 40px rgba(26,107,96,0.18)' }}>
                  <span style={{ position: 'absolute', top: -30, right: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                  <span style={{ position: 'absolute', bottom: -40, left: -30, width: 170, height: 170, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                  <h3 style={{ position: 'relative', fontFamily: 'var(--font-archivo)', fontWeight: 900, fontSize: 'clamp(1.4rem,2.4vw,2rem)', lineHeight: 1.05, letterSpacing: '0.01em', textTransform: 'uppercase', color: '#FFFFFF', textAlign: 'center', margin: 0 }}>{a.title}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1rem', color: 'var(--white)' }}>{a.title}</span>
                  <span className="info-pill" style={{ background: 'var(--teal)', color: '#FFFFFF', padding: '0.45rem 1.1rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', transition: 'background 0.2s' }}>Lees meer</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <TestimonialsSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  )
}
