import { getContentMany } from '@/lib/content'
import { t, type Lang } from '@/lib/i18n'

interface Testimonial {
  quote: string
  name: string
  location: string
}

const fallbacks: Testimonial[] = [
  {
    quote: "The gypsum ceiling work they did in our living room is absolutely stunning. Clean, precise, and finished ahead of schedule. We couldn't be happier with the result.",
    name: 'Jan de Vries',
    location: 'Amsterdam, NL',
  },
  {
    quote: 'LAMAR transformed our entire ground floor. Professional team, excellent communication throughout, and the decoration work exceeded everything we imagined. Highly recommended.',
    name: 'Sophie Bakker',
    location: 'Rotterdam, NL',
  },
  {
    quote: "They restored our 1960s home beautifully — walls, ceilings, painting, everything. The attention to detail was remarkable. Will definitely use LAMAR again for our next project.",
    name: 'Mark Timmers',
    location: 'Utrecht, NL',
  },
]

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function parse(raw: string | undefined, fallback: Testimonial): Testimonial {
  if (!raw) return fallback
  try { return JSON.parse(raw) as Testimonial } catch { return fallback }
}

export default async function TestimonialsSection({ lang }: { lang: Lang }) {
  const tr = t[lang].testimonials
  const content = await getContentMany(['testimonial_1', 'testimonial_2', 'testimonial_3'])
  const testimonials = [
    parse(content['testimonial_1'], fallbacks[0]),
    parse(content['testimonial_2'], fallbacks[1]),
    parse(content['testimonial_3'], fallbacks[2]),
  ]

  return (
    <section id="testimonials" style={{ padding: '8rem 3.5rem', background: 'var(--bg2)' }}>
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
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginTop: '3.5rem',
        }}
      >
        {testimonials.map((testimonial, i) => {
          const featured = i === 1
          const delay = ['d1', 'd2', 'd3'][i]
          return (
            <div
              key={i}
              className={`rv ${delay}`}
              style={{
                background: featured ? 'var(--bg)' : 'var(--bg3)',
                border: `1px solid ${featured ? 'var(--teal)' : 'var(--border)'}`,
                borderRadius: 3,
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                transition: 'border-color 0.3s',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: 'var(--teal2)', fontSize: '0.85rem' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.78,
                  color: 'var(--white2)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  flex: 1,
                  margin: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-archivo)',
                    fontSize: '2rem',
                    color: 'var(--teal2)',
                    lineHeight: 0,
                    verticalAlign: '-0.5rem',
                    marginRight: 2,
                  }}
                >
                  &ldquo;
                </span>
                {testimonial.quote}
              </p>

              {/* Author */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'var(--teal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-archivo)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: 'var(--white)',
                    flexShrink: 0,
                  }}
                >
                  {initials(testimonial.name)}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-archivo)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: 'var(--white)',
                    }}
                  >
                    {testimonial.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--white2)', marginTop: 1 }}>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
