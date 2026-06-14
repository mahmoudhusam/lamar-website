'use client'

import { useState, useCallback, useRef } from 'react'
import type { SlotProject } from './GallerySection'
import GalleryCTA from './GalleryCTA'

type Props = {
  slots: SlotProject[]
  specialtyLabel: string
  specialtyText: string
  ctaLabel: string
}

const cellStyles: React.CSSProperties[] = [
  { gridColumn: '1 / 6',  gridRow: '1 / 2' },
  { gridColumn: '6 / 9',  gridRow: '1 / 2' },
  { gridColumn: '9 / 13', gridRow: '1 / 3' },
  { gridColumn: '1 / 4',  gridRow: '2 / 3' }, // text card
  { gridColumn: '4 / 7',  gridRow: '2 / 3' },
  { gridColumn: '7 / 9',  gridRow: '2 / 3' },
  { gridColumn: '1 / 5',  gridRow: '3 / 4' },
  { gridColumn: '5 / 9',  gridRow: '3 / 4' },
  { gridColumn: '9 / 13', gridRow: '3 / 4' }, // teal CTA
]

// cell index → slot index (-1 = static cell)
const CELL_TO_SLOT = [0, 1, 2, -1, 3, 4, 5, 6, -1]

export default function BentoGrid({ slots, specialtyLabel, specialtyText, ctaLabel }: Props) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = useCallback((cellIndex: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setHoveredCell(cellIndex)
  }, [])

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setHoveredCell(null), 120)
  }, [])

  return (
    <>
      <style>{`
        .bento-cell { position: relative; }
        .bento-img-inner { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .bento-cell:hover .bento-img-inner { transform: scale(1.05); }
        .bento-popup {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          z-index: 100;
          background: rgba(12,12,10,0.97);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(242,238,230,0.13);
          border-radius: 12px;
          padding: 1.5rem;
          min-width: 460px;
          max-width: 560px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.18s ease, transform 0.18s ease;
          box-shadow: 0 24px 48px rgba(0,0,0,0.6);
        }
        .bento-popup.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }
        .bento-cell:nth-child(1) .bento-popup,
        .bento-cell:nth-child(2) .bento-popup { left: 0; transform: translateY(6px); }
        .bento-cell:nth-child(1) .bento-popup.visible,
        .bento-cell:nth-child(2) .bento-popup.visible { transform: translateY(0); }
        .bento-cell:nth-child(3) .bento-popup { left: auto; right: 0; transform: translateY(6px); }
        .bento-cell:nth-child(3) .bento-popup.visible { transform: translateY(0); }
        @media (hover: none) { .bento-popup { display: none !important; } }
      `}</style>

      <div
        className="rv d1 gallery-bento"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: '260px 200px 260px', gap: '0.75rem' }}
      >
        {cellStyles.map((style, cellIndex) => {
          const slotIndex = CELL_TO_SLOT[cellIndex]

          // Static text card
          if (cellIndex === 3) {
            return (
              <div key="text-card" style={{ ...style, background: 'var(--bg3)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.75rem', border: '1px solid var(--border)', borderRadius: 3 }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--white2)', marginBottom: '0.6rem', fontFamily: 'var(--font-archivo)' }}>{specialtyLabel}</div>
                <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--white)', lineHeight: 1.25 }}>{specialtyText}</div>
              </div>
            )
          }

          // Teal CTA
          if (cellIndex === 8) {
            return <GalleryCTA key="cta" style={style} label={ctaLabel} />
          }

          // Image slot
          const project = slots[slotIndex]
          const hasRealProject = !!project?.slug
          const cover = project?.coverImageUrl ?? null
          const popupImages = project?.images ?? []
          const isHovered = hoveredCell === cellIndex
          const hasPopup = hasRealProject && popupImages.length > 0

          const cellContent = (
            <>
              {/* Background image */}
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 3 }}>
                {cover ? (
                  <div
                    className="bento-img-inner"
                    style={{ position: 'absolute', inset: 0, backgroundImage: `url('${cover}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, var(--teal) 0%, var(--bg2) 100%)' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,4,3,0.72) 0%, rgba(4,4,3,0.1) 40%, transparent 100%)' }} />
              </div>

              {/* Caption */}
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.67rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,238,230,0.92)', fontFamily: 'var(--font-archivo)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {project?.title ?? ''}
                </span>
                {hasRealProject && (
                  <span style={{ fontSize: '0.6rem', color: 'var(--teal2)', fontFamily: 'var(--font-archivo)', flexShrink: 0, marginLeft: '0.5rem' }}>→</span>
                )}
              </div>

              {/* Hover popup */}
              {hasPopup && (
                <div className={`bento-popup${isHovered ? ' visible' : ''}`}>
                  <p style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1rem', color: 'var(--white)', marginBottom: '1rem', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {project.title}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(popupImages.length, 2)}, 1fr)`, gap: '0.5rem', marginBottom: '1rem' }}>
                    {popupImages.slice(0, 2).map((img) => (
                      <div key={img.id} style={{ aspectRatio: '16/9', borderRadius: 6, overflow: 'hidden', background: 'var(--bg2)' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={img.caption ?? ''} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--white2)', letterSpacing: '0.08em' }}>
                      {popupImages.length} foto{popupImages.length !== 1 ? "'s" : ''}
                    </span>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal2)', fontFamily: 'var(--font-archivo)', fontWeight: 600 }}>
                      Bekijk project →
                    </span>
                  </div>
                </div>
              )}
            </>
          )

          if (hasRealProject) {
            return (
              <a
                key={`cell-${cellIndex}`}
                href={`/projects/${project.slug}`}
                className="bento-cell"
                style={{ ...style, display: 'block', borderRadius: 3, overflow: 'visible', position: 'relative', cursor: 'pointer', textDecoration: 'none' }}
                onMouseEnter={() => handleEnter(cellIndex)}
                onMouseLeave={handleLeave}
              >
                {cellContent}
              </a>
            )
          }

          return (
            <div
              key={`cell-${cellIndex}`}
              className="bento-cell"
              style={{ ...style, borderRadius: 3, overflow: 'hidden', position: 'relative' }}
            >
              {cellContent}
            </div>
          )
        })}
      </div>
    </>
  )
}
