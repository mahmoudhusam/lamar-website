'use client'

import { useState } from 'react'
import { t, type Lang } from '@/lib/i18n'

export default function FAQSection({
  lang,
  heading,
  items,
}: {
  lang: Lang
  heading?: string
  items?: { q: string; a: string }[]
}) {
  const tr = t[lang].faq
  const faqHeading = heading ?? tr.heading
  const faqItems = items ?? tr.items
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" style={{ background: 'linear-gradient(120deg, var(--teal2) 0%, var(--teal) 100%)', padding: '7rem 3.5rem' }}>
      <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '4rem', maxWidth: 1200, margin: '0 auto', alignItems: 'center' }}>
        <h2 className="rv" style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2.2rem,4vw,3.6rem)', lineHeight: 1.05, letterSpacing: '-0.01em', color: '#FFFFFF', margin: 0 }}>
          {faqHeading}
        </h2>

        <div className="rv">
          {faqItems.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.25)' }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.5rem 0', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: 'clamp(1.05rem,1.6vw,1.35rem)', color: '#FFFFFF', lineHeight: 1.3 }}>{it.q}</span>
                  <span style={{ flexShrink: 0, width: 26, height: 26, color: '#FFFFFF', transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'none', fontSize: '1.6rem', lineHeight: '26px', textAlign: 'center' }}>+</span>
                </button>
                <div style={{ maxHeight: isOpen ? 320 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.35s ease', opacity: isOpen ? 1 : 0 }}>
                  <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.88)', fontWeight: 300, paddingBottom: '1.5rem', margin: 0, maxWidth: 620 }}>{it.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
