import { prisma } from '@/lib/prisma'
import { t, type Lang } from '@/lib/i18n'

const P = 'https://images.pexels.com/photos'

const placeholders = [
  { caption: 'Living Room Gypsum',     url: `${P}/2736139/pexels-photo-2736139.jpeg?auto=compress&cs=tinysrgb&w=900&h=520&fit=crop`,   fallback: 'linear-gradient(145deg,#2A8070 0%,#1A5848 50%,#082820 100%)' },
  { caption: 'Kitchen Renovation',     url: `${P}/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=520&fit=crop`,   fallback: 'linear-gradient(160deg,#3A9080 0%,#1A6855 55%,#0A3025 100%)' },
  { caption: 'Full House Restoration', url: `${P}/5691530/pexels-photo-5691530.jpeg?auto=compress&cs=tinysrgb&w=800&h=720&fit=crop`,   fallback: 'linear-gradient(140deg,#226860 0%,#144840 50%,#082420 100%)' },
  { caption: 'Ceiling Detail Work',    url: `${P}/16764180/pexels-photo-16764180.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`, fallback: 'linear-gradient(150deg,#2A7868 0%,#185848 50%,#083028 100%)' },
  { caption: 'Interior Painting',      url: `${P}/5493654/pexels-photo-5493654.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop`,   fallback: 'linear-gradient(135deg,#225858 0%,#124040 50%,#082828 100%)' },
  { caption: 'Bathroom Renovation',    url: `${P}/7045358/pexels-photo-7045358.jpeg?auto=compress&cs=tinysrgb&w=800&h=520&fit=crop`,   fallback: 'linear-gradient(155deg,#2A8878 0%,#186858 50%,#083430 100%)' },
  { caption: 'Wall Restoration',       url: `${P}/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=800&h=520&fit=crop`,   fallback: 'linear-gradient(145deg,#1A7068 0%,#105050 50%,#062C2C 100%)' },
]

const cellStyles: React.CSSProperties[] = [
  { gridColumn: '1 / 6',  gridRow: '1 / 2' },
  { gridColumn: '6 / 9',  gridRow: '1 / 2' },
  { gridColumn: '9 / 13', gridRow: '1 / 3' },
  { gridColumn: '1 / 4',  gridRow: '2 / 3' },
  { gridColumn: '4 / 7',  gridRow: '2 / 3' },
  { gridColumn: '7 / 9',  gridRow: '2 / 3' },
  { gridColumn: '1 / 5',  gridRow: '3 / 4' },
  { gridColumn: '5 / 9',  gridRow: '3 / 4' },
  { gridColumn: '9 / 13', gridRow: '3 / 4' },
]

function ImageCell({ item, style }: { item: { url: string; caption: string; fallback?: string }; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, overflow: 'hidden', borderRadius: 3, position: 'relative', cursor: 'pointer', background: item.fallback ?? 'var(--bg3)' }}>
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${item.url}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,4,3,0.72) 0%, rgba(4,4,3,0.1) 40%, transparent 100%)', display: 'flex', alignItems: 'flex-end', padding: '1.25rem' }}>
        <span style={{ fontSize: '0.67rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,238,230,0.92)', fontFamily: 'var(--font-archivo)', fontWeight: 500 }}>
          {item.caption}
        </span>
      </div>
    </div>
  )
}

export default async function GallerySection({ lang }: { lang: Lang }) {
  const tr = t[lang].gallery
  const dbItems = await prisma.galleryItem.findMany({
    where: { order: { gte: 0, lte: 6 } },
  }).catch(() => [])
  const useDb = dbItems.length > 0
  const slotMap: Record<number, { url: string; caption: string }> = {}
  for (const item of dbItems) {
    slotMap[item.order] = { url: item.url, caption: item.caption ?? '' }
  }
  const imageSlots = Array.from({ length: 7 }, (_, i) =>
    slotMap[i] ?? placeholders[i]
  )

  return (
    <section id="our-work" style={{ padding: '8rem 3.5rem', background: 'var(--bg2)' }}>
      {/* Header */}
      <div className="rv" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem' }}>
        <div>
          <div style={{ fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--teal2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'block', width: '1.5rem', height: 1, background: 'var(--teal2)', flexShrink: 0 }} />
            {tr.tag}
          </div>
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.9rem,3vw,2.8rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: 'var(--white)', marginBottom: 0 }}>
            {tr.heading}
          </h2>
        </div>
        <a
          href="#our-work"
          className="view-all"
          style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white2)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: 2, borderBottom: '1px solid var(--border2)', transition: 'color 0.2s, border-color 0.2s' }}
        >
          {tr.viewAll}
        </a>
      </div>

      {/* Bento grid */}
      <div className="rv d1 gallery-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: '260px 200px 260px', gap: '0.75rem' }}>
        <ImageCell item={imageSlots[0]} style={cellStyles[0]} />
        <ImageCell item={imageSlots[1]} style={cellStyles[1]} />
        <ImageCell item={imageSlots[2]} style={cellStyles[2]} />
        {/* Text card */}
        <div style={{ ...cellStyles[3], background: 'var(--bg3)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.75rem', border: '1px solid var(--border)', borderRadius: 3 }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--white2)', marginBottom: '0.6rem', fontFamily: 'var(--font-archivo)' }}>{tr.specialtyLabel}</div>
          <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--white)', lineHeight: 1.25 }}>{tr.specialtyText}</div>
        </div>
        <ImageCell item={imageSlots[3]} style={cellStyles[4]} />
        <ImageCell item={imageSlots[4]} style={cellStyles[5]} />
        <ImageCell item={imageSlots[5]} style={cellStyles[6]} />
        <ImageCell item={imageSlots[6]} style={cellStyles[7]} />
        {/* Teal CTA */}
        <div style={{ ...cellStyles[8], background: 'var(--teal)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem', borderRadius: 3 }}>
          <div style={{ fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,238,230,0.75)', fontFamily: 'var(--font-archivo)' }}>{tr.ctaLabel}</div>
          <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 900, fontSize: '3.5rem', color: 'var(--white)', lineHeight: 1 }}>→</div>
        </div>
      </div>
    </section>
  )
}
