import { t, type Lang } from '@/lib/i18n'

const IMG = 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=1150&fit=crop'

const SHADES = ['#2ABFA8', '#23A18F', '#1D8576', '#166B5E']

function BIcon({ name }: { name: string }) {
  const p = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'clock') return (<svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>)
  if (name === 'phone') return (<svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)
  if (name === 'shield') return (<svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>)
  return (<svg {...p}><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/></svg>)
}

type BItem = { icon: string; title: string; text: string }

function NestedCard({ items, idx }: { items: BItem[]; idx: number }) {
  const it = items[idx]
  const hasChild = idx < items.length - 1
  const isOuter = idx === 0
  return (
    <div style={{ background: SHADES[idx], borderRadius: isOuter ? 26 : 20, padding: '1.15rem 0.7rem 0.7rem', boxShadow: isOuter ? '0 24px 60px rgba(26,107,96,0.28)' : 'none' }}>
      <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start', padding: '0 0.55rem', marginBottom: hasChild ? '0.85rem' : '0.45rem' }}>
        <span style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <BIcon name={it.icon} />
        </span>
        <div>
          <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1rem', color: '#FFFFFF', marginBottom: 4 }}>{it.title}</div>
          <div style={{ fontSize: '0.88rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', fontWeight: 300 }}>{it.text}</div>
        </div>
      </div>
      {hasChild && <NestedCard items={items} idx={idx + 1} />}
    </div>
  )
}

export default function BenefitsSection({ lang }: { lang: Lang }) {
  const tr = t[lang].benefits

  return (
    <section id="benefits" style={{ background: 'var(--bg2)', padding: '7rem 3.5rem' }}>
      <div className="ben-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', maxWidth: 1200, margin: '0 auto', alignItems: 'center' }}>
        <div className="rv">
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,3.4vw,3rem)', lineHeight: 1.08, letterSpacing: '-0.01em', color: 'var(--white)', marginBottom: '1rem' }}>
            {tr.headingA} <span style={{ color: 'var(--teal2)' }}>{tr.headingAccent}</span><br />{tr.headingB}
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--white2)', fontWeight: 300, maxWidth: 460, marginBottom: '2rem' }}>{tr.sub}</p>

          <NestedCard items={tr.items} idx={0} />
        </div>

        <div className="ben-img rv" style={{ width: '100%', height: 640, borderRadius: 28, overflow: 'hidden', boxShadow: '0 30px 60px rgba(20,24,29,0.18)', backgroundImage: `url('${IMG}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      </div>
    </section>
  )
}
