import { getContentMany } from '@/lib/content'
import { t, type Lang } from '@/lib/i18n'
import ContactForm from './ContactForm'

const contactFallbacks: Record<string, string> = {
  contact_phone:     '+31 00 000 0000',
  contact_whatsapp:  '+31 00 000 0000',
  contact_email:     'info@lamar-renovatie.nl',
  contact_location:  'Nederland',
  contact_hours:     'Ma – Za · 08:00 – 18:00',
}

export default async function ContactSection({ lang }: { lang: Lang }) {
  const tr = t[lang].contact
  const content = await getContentMany(Object.keys(contactFallbacks))

  return (
    <section
      id="contact"
      style={{
        padding: '9rem 3.5rem',
        background: 'var(--bg)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '7rem',
        alignItems: 'start',
      }}
    >
      {/* Left */}
      <div>
        <div
          className="rv"
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
          className="rv d1"
          style={{
            fontFamily: 'var(--font-archivo)',
            fontWeight: 900,
            fontSize: 'clamp(2.2rem,4.5vw,4rem)',
            letterSpacing: '-0.03em',
            lineHeight: 0.92,
            color: 'var(--white)',
            marginBottom: '3.5rem',
            textTransform: 'uppercase',
          }}
        >
          {tr.h1}
          <br />
          <span style={{ color: 'var(--teal2)' }}>{tr.h2}</span>
          <br />
          {tr.h3}
        </h2>

        <div className="rv d2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {Object.keys(contactFallbacks).map((key) => (
            <div key={key} style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <div
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--teal2)',
                  marginBottom: '0.35rem',
                  fontFamily: 'var(--font-archivo)',
                }}
              >
                {tr.labels[key] ?? key}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--white)', fontWeight: 300 }}>
                {content[key] ?? contactFallbacks[key]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="rv d2">
        <ContactForm tr={t[lang].contactForm} />
      </div>
    </section>
  )
}
