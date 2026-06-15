import { getContentMany } from '@/lib/content'
import { type Lang } from '@/lib/i18n'
import { getSiteText } from '@/lib/siteText'

interface Testimonial {
  quote: string
  name: string
  location: string
}

const fallbacks: Testimonial[] = [
  { quote: "Het gipswerk dat ze in onze woonkamer hebben gedaan is werkelijk schitterend. Netjes, nauwkeurig en voor op schema opgeleverd. We zijn ontzettend tevreden met het resultaat.", name: 'Jan de Vries', location: 'Amsterdam' },
  { quote: 'LAMAR heeft onze hele begane grond getransformeerd. Een professioneel team, uitstekende communicatie van begin tot eind, en het decoratiewerk overtrof alles wat we ons hadden voorgesteld. Van harte aanbevolen.', name: 'Sophie Bakker', location: 'Rotterdam' },
  { quote: "Ze hebben ons jaren-'60 huis prachtig gerestaureerd — wanden, plafonds, schilderwerk, alles. De aandacht voor detail was opmerkelijk. We schakelen LAMAR zeker weer in voor ons volgende project.", name: 'Mark Timmers', location: 'Utrecht' },
]

const AVATAR_COLORS = ['#D14B3D', '#3B6FB0', '#1FA463']

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function parse(raw: string | undefined, fallback: Testimonial): Testimonial {
  if (!raw) return fallback
  try { return JSON.parse(raw) as Testimonial } catch { return fallback }
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

export default async function TestimonialsSection({ headingA, headingAccent, headingB, sub }: { lang?: Lang; headingA?: string; headingAccent?: string; headingB?: string; sub?: string }) {
  const tx = await getSiteText()
  const content = await getContentMany(['testimonial_1', 'testimonial_2', 'testimonial_3'])
  const testimonials = [
    parse(content['testimonial_1'], fallbacks[0]),
    parse(content['testimonial_2'], fallbacks[1]),
    parse(content['testimonial_3'], fallbacks[2]),
  ]

  return (
    <section id="testimonials" style={{ padding: '8rem 3.5rem', background: 'var(--bg)' }}>
      <div className="rv" style={{ maxWidth: 1200, margin: '0 auto 3.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,3.6vw,3.2rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: 'var(--white)', marginBottom: '1rem' }}>
          {headingA ?? tx('home_testimonials_heading')} <span style={{ color: 'var(--teal2)' }}>{headingAccent ?? tx('home_testimonials_heading_accent')}</span>{headingB ? ` ${headingB}` : ''}
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--white2)', fontWeight: 300, maxWidth: 640 }}>{sub ?? tx('home_testimonials_sub')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', maxWidth: 1200, margin: '0 auto' }}>
        {testimonials.map((tm, i) => (
          <div key={i} className={`tcard rv ${['d1', 'd2', 'd3'][i]}`} style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, padding: '1.75rem', boxShadow: '0 10px 30px rgba(20,24,29,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                <span style={{ width: 42, height: 42, borderRadius: '50%', background: AVATAR_COLORS[i], color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                  {initials(tm.name)}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tm.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--white3)', fontWeight: 300 }}>{tm.location}</div>
                </div>
              </div>
              <GoogleG />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ display: 'inline-flex', gap: 1 }}>
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: '#FBBC04', fontSize: '0.95rem' }}>★</span>
                ))}
              </span>
              <span style={{ width: 15, height: 15, borderRadius: '50%', background: '#4285F4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--white2)', fontWeight: 300, margin: 0, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {tm.quote}
            </p>

            <span style={{ fontSize: '0.82rem', color: 'var(--white3)', fontWeight: 400, marginTop: 'auto' }}>Lees verder</span>
          </div>
        ))}
      </div>
    </section>
  )
}
