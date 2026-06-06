'use client'

import { useEffect, useRef, useState } from 'react'
import { t, type Lang } from '@/lib/i18n'

export default function WhatsAppSection({ lang }: { lang: Lang }) {
  const tr = t[lang].chat
  const total = tr.messages.length
  const [visible, setVisible] = useState(0)
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const timers: ReturnType<typeof setTimeout>[] = []
    const run = () => {
      setVisible(0)
      for (let i = 1; i <= total; i++) {
        timers.push(setTimeout(() => setVisible(i), i * 1100))
      }
      timers.push(setTimeout(run, total * 1100 + 2800))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [started, total])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{
        padding: '8rem 3.5rem',
        background: 'var(--bg)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'center',
      }}
    >
      <style>{`
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-bubble { animation: chatIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes pulseDot { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>

      {/* Left: intro */}
      <div>
        <div className="rv" style={{ fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--teal2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ display: 'block', width: '1.5rem', height: 1, background: 'var(--teal2)', flexShrink: 0 }} />
          {tr.tag}
        </div>
        <h2 className="rv d1" style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.9rem,3vw,2.8rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: 'var(--white)', marginBottom: '1.5rem' }}>
          {tr.heading} <span style={{ color: 'var(--teal2)' }}>{tr.headingTeal}</span>
        </h2>
        <p className="rv d2" style={{ fontSize: '0.98rem', lineHeight: 1.8, color: 'var(--white2)', fontWeight: 300, maxWidth: 440, marginBottom: '2.25rem' }}>
          {tr.sub}
        </p>
        {/* WhatsApp CTA — replace 000000000000 with the client's real number */}
        <a
          className="rv d3 btn-fill"
          href="https://wa.me/000000000000"
          style={{ background: 'var(--white)', color: 'var(--bg)', padding: '0.875rem 2rem', fontFamily: 'var(--font-outfit)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s, color 0.2s' }}
        >
          📲 {tr.cta}
        </a>
      </div>

      {/* Right: phone mockup */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 300, height: 600, background: '#0a0a08', borderRadius: 44, padding: 12, border: '1px solid var(--border2)', boxShadow: '0 30px 70px rgba(0,0,0,0.55)', flexShrink: 0 }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 32, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'var(--bg2)' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.9rem 1rem', background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--white2)', fontSize: '1.1rem', lineHeight: 1 }}>‹</span>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--white)', flexShrink: 0 }}>L</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tr.contactName}</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--teal2)' }}>{tr.online}</div>
              </div>
              <span style={{ color: 'var(--white2)', fontSize: '0.9rem' }}>📞</span>
            </div>

            {/* Chat area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 8, padding: '0.9rem', overflow: 'hidden' }}>
              {tr.messages.slice(0, visible).map((m, i) => {
                const mine = m.from === 'me'
                return (
                  <div
                    key={i}
                    className="chat-bubble"
                    style={{
                      alignSelf: mine ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      background: mine ? 'var(--teal)' : 'var(--bg3)',
                      color: 'var(--white)',
                      border: mine ? 'none' : '1px solid var(--border)',
                      borderRadius: 14,
                      borderBottomRightRadius: mine ? 4 : 14,
                      borderBottomLeftRadius: mine ? 14 : 4,
                      padding: '0.5rem 0.7rem',
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', lineHeight: 1.45, fontWeight: 300 }}>{m.text}</div>
                    <div style={{ fontSize: '0.58rem', opacity: 0.6, marginTop: 3, textAlign: 'right' }}>
                      {m.time}{mine ? ' ✓✓' : ''}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Input bar (decorative) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.7rem 0.9rem', background: 'var(--bg3)', borderTop: '1px solid var(--border)' }}>
              <div style={{ flex: 1, background: 'var(--bg)', borderRadius: 20, padding: '0.5rem 0.85rem', fontSize: '0.72rem', color: 'var(--white3)' }}>Typ een bericht…</div>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontSize: '0.85rem', flexShrink: 0 }}>➤</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
