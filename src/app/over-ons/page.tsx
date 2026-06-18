import { getContent, ABOUT_FALLBACK } from '@/lib/content'
import { t } from '@/lib/i18n'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import ContactSection from '@/components/public/ContactSection'
import RevealObserver from '@/components/public/RevealObserver'

export const revalidate = 3600

export const metadata = {
  title: 'Over ons',
  description: 'Leer LAMAR Stukadoor en Onderhoud kennen: vakmanschap in stucwerk, afwerking en renovatie met meer dan 200 voltooide projecten in Nederland.',
  alternates: { canonical: '/over-ons' },
}

const IMG = 'https://images.pexels.com/photos/5493654/pexels-photo-5493654.jpeg?auto=compress&cs=tinysrgb&w=800&h=1150&fit=crop'
const SHADES = ['#2ABFA8', '#23A18F', '#1D8576', '#166B5E']

type Principle = { title: string; text: string }

function NestedPrinciple({ items, idx }: { items: Principle[]; idx: number }) {
  const it = items[idx]
  const hasChild = idx < items.length - 1
  const isOuter = idx === 0
  return (
    <div style={{ background: SHADES[idx], borderRadius: isOuter ? 26 : 20, padding: '1.3rem 0.9rem 0.9rem', boxShadow: isOuter ? '0 24px 60px rgba(26,107,96,0.28)' : 'none' }}>
      <div style={{ padding: '0 0.6rem', marginBottom: hasChild ? '0.95rem' : '0.5rem' }}>
        <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.05rem', color: '#FFFFFF', marginBottom: 5 }}>{it.title}</div>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', fontWeight: 300 }}>{it.text}</div>
      </div>
      {hasChild && <NestedPrinciple items={items} idx={idx + 1} />}
    </div>
  )
}

export default async function OverOnsPage() {
  const lang = 'nl' as const
  const tr = t[lang].overOns
  const aboutText = await getContent('about_text', ABOUT_FALLBACK)
  const paragraphs = aboutText.split('\n\n').filter(Boolean)

  return (
    <>
      <Navbar lang={lang} />
      <main style={{ paddingTop: 75 }}>
        <section id="over-intro" style={{ background: 'var(--bg)', padding: '6rem 3.5rem' }}>
          <div className="over-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', maxWidth: 1200, margin: '0 auto', alignItems: 'center' }}>
            <div className="rv">
              <h1 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2.2rem,4vw,3.4rem)', lineHeight: 1.05, letterSpacing: '-0.01em', color: 'var(--white)', marginBottom: '1.25rem' }}>
                {tr.headingA} <span style={{ color: 'var(--teal2)' }}>{tr.headingAccent}</span> {tr.headingB}
              </h1>
              {paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--white2)', fontWeight: 300, marginBottom: '1rem', maxWidth: 520 }}>{p}</p>
              ))}
              <div style={{ marginTop: '2rem' }}>
                <NestedPrinciple items={tr.principles} idx={0} />
              </div>
            </div>
            <div className="over-img rv" style={{ width: '100%', height: 680, borderRadius: 28, overflow: 'hidden', boxShadow: '0 30px 60px rgba(20,24,29,0.18)', backgroundImage: `url('${IMG}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
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
