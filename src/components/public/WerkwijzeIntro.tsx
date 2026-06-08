function Icon({ name }: { name: string }) {
  const p = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--teal2)', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'send') return (<svg {...p}><path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9 22 2z" /></svg>)
  if (name === 'chat') return (<svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>)
  if (name === 'cal') return (<svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" /></svg>)
  return (<svg {...p}><path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 0 5.6-5.6l-2.6 2.6-2.1-.4-.4-2.1z" /></svg>)
}

const STEPS = [
  { tag: 'Stap 1', title: 'Inventarisatie', text: "U deelt uw foto's, wensen en afmetingen. Snel en eenvoudig.", icon: 'send' },
  { tag: 'Stap 2', title: 'Advies',         text: 'Wij stellen een passend plan op met een heldere, vaste prijs.', icon: 'chat' },
  { tag: 'Stap 3', title: 'Planning',       text: 'Na akkoord leggen wij alles vast en plannen we samen de startdatum.', icon: 'cal' },
  { tag: 'Stap 4', title: 'Uitvoering',     text: 'Wij voeren het stuc- en schilderwerk vakkundig uit en leveren netjes op.', icon: 'tool' },
]

export default function WerkwijzeIntro() {
  return (
    <section id="werkwijze-intro" style={{ background: 'var(--bg)', padding: '5rem 3.5rem 4rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 className="rv" style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2.2rem,4vw,3.6rem)', lineHeight: 1.05, letterSpacing: '-0.01em', color: 'var(--white)', margin: 0 }}>
          Zo pakken wij het aan
        </h1>
        <p className="rv d1" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--white2)', fontWeight: 300, marginTop: '1rem', marginBottom: '3rem' }}>
          Helder, eerlijk en zonder omwegen.
        </p>
        <div className="ww-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {STEPS.map((s, i) => (
            <div key={i} className={`rv d${i + 1}`} style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 18, padding: '1.75rem', boxShadow: '0 10px 30px rgba(20,24,29,0.06)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <span style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(42,191,168,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={s.icon} />
              </span>
              <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--white)' }}>{s.tag} · {s.title}</div>
              <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--white2)', fontWeight: 300 }}>{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
