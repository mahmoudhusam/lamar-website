import type { CSSProperties } from 'react'
import { prisma } from '@/lib/prisma'
import UploadForm from '@/components/admin/UploadForm'
import DeleteButton from '@/components/admin/DeleteButton'
import AssignSlotForm from '@/components/admin/AssignSlotForm'
import { uploadImage, deleteImage, assignSlot } from './actions'

const SLOT_LABELS = [
  { letter: 'A', role: 'Wide Feature' },
  { letter: 'B', role: 'Top Middle' },
  { letter: 'C', role: 'Tall Right' },
  { letter: 'D', role: 'Mid Left' },
  { letter: 'E', role: 'Mid Right' },
  { letter: 'F', role: 'Bottom Left' },
  { letter: 'G', role: 'Bottom Right' },
]

// Mirrors the public site cellStyles exactly
const BENTO_CELLS: CSSProperties[] = [
  { gridColumn: '1 / 6',  gridRow: '1 / 2' }, // Slot A
  { gridColumn: '6 / 9',  gridRow: '1 / 2' }, // Slot B
  { gridColumn: '9 / 13', gridRow: '1 / 3' }, // Slot C
  { gridColumn: '1 / 4',  gridRow: '2 / 3' }, // Text card (static)
  { gridColumn: '4 / 7',  gridRow: '2 / 3' }, // Slot D
  { gridColumn: '7 / 9',  gridRow: '2 / 3' }, // Slot E
  { gridColumn: '1 / 5',  gridRow: '3 / 4' }, // Slot F
  { gridColumn: '5 / 9',  gridRow: '3 / 4' }, // Slot G
  { gridColumn: '9 / 13', gridRow: '3 / 4' }, // Teal CTA (static)
]

// imageSlots[i] maps to slotMap[i] (slot index 0–6)
// BENTO_CELLS index: 0=A,1=B,2=C,(3=text),4=D,5=E,6=F,7=G,(8=CTA)
// Slot index →  cellIndex: 0→0, 1→1, 2→2, 3→4, 4→5, 5→6, 6→7
const SLOT_TO_CELL = [0, 1, 2, 4, 5, 6, 7]

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: 'asc' } })
  const n = items.length

  const slotMap: Record<number, typeof items[0] | undefined> = {}
  for (let i = 0; i < 7; i++) slotMap[i] = undefined
  for (const item of items) {
    if (item.order >= 0 && item.order <= 6) {
      slotMap[item.order] = item
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#F2EEE6', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Gallery
        </h1>
        <p style={{ color: '#6B6B68', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
          {n} photo{n !== 1 ? 's' : ''} in library
        </p>
        <p style={{ color: '#6B6B68', fontSize: '0.85rem' }}>
          Assign photos to the 7 slots below — they appear on the public site in that exact layout.
        </p>
      </div>

      <UploadForm action={uploadImage} />

      {/* Zone 1 — Bento Preview */}
      <div style={{ marginTop: '2.5rem', marginBottom: '0.75rem' }}>
        <p style={{ color: '#9A9A96', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Bento Preview
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: '130px 100px 130px',
          gap: 6,
          borderRadius: 8,
          overflow: 'hidden',
          marginBottom: '2.5rem',
        }}
      >
        {/* Render all 9 bento cells */}
        {BENTO_CELLS.map((cellStyle, cellIndex) => {
          // Static text card
          if (cellIndex === 3) {
            return (
              <div
                key="text-card"
                style={{
                  ...cellStyle,
                  background: '#131310',
                  border: '1px solid #2A2A28',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '0.75rem',
                }}
              >
                <div style={{ fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4A4A48', marginBottom: '0.3rem' }}>
                  Specialty
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F2EEE6', lineHeight: 1.2 }}>
                  Gypsum &amp; Decoration
                </div>
              </div>
            )
          }
          // Static teal CTA
          if (cellIndex === 8) {
            return (
              <div
                key="cta"
                style={{
                  ...cellStyle,
                  background: '#1A6B60',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '2rem', color: '#F2EEE6', fontWeight: 900 }}>→</span>
              </div>
            )
          }

          // Image slot — find which slot index this cell corresponds to
          const slotIndex = SLOT_TO_CELL.indexOf(cellIndex)
          const photo = slotMap[slotIndex]
          const label = SLOT_LABELS[slotIndex]

          if (photo) {
            return (
              <div
                key={`slot-${slotIndex}`}
                style={{
                  ...cellStyle,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 3,
                  backgroundImage: `url('${photo.url}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Dark gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,4,3,0.6) 0%, transparent 60%)' }} />
                {/* Letter badge */}
                <div style={{
                  position: 'absolute', top: 6, left: 6,
                  background: 'rgba(42,191,168,0.9)', color: '#0C0C0A',
                  fontSize: '0.65rem', fontWeight: 800, lineHeight: 1,
                  padding: '0.2rem 0.4rem', borderRadius: 3,
                }}>
                  {label.letter}
                </div>
                {/* Unassign button */}
                <form action={assignSlot.bind(null, photo.id, -1)} style={{ position: 'absolute', top: 6, right: 6 }}>
                  <button
                    type="submit"
                    title="Unassign"
                    style={{
                      background: 'rgba(200,40,40,0.85)',
                      border: 'none',
                      borderRadius: 3,
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      width: 20,
                      height: 20,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </form>
                {/* Caption */}
                {photo.caption && (
                  <div style={{
                    position: 'absolute', bottom: 6, left: 6, right: 6,
                    color: 'rgba(242,238,230,0.9)', fontSize: '0.55rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {photo.caption}
                  </div>
                )}
              </div>
            )
          }

          // Empty slot placeholder
          return (
            <div
              key={`slot-${slotIndex}`}
              style={{
                ...cellStyle,
                background: '#1A1A18',
                border: '1px dashed #3A3A38',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <span style={{ color: '#2ABFA8', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1 }}>
                {label.letter}
              </span>
              <span style={{ color: '#4A4A48', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {label.role}
              </span>
              <span style={{ color: '#2A2A28', fontSize: '1rem', lineHeight: 1, marginTop: 2 }}>+</span>
            </div>
          )
        })}
      </div>

      {/* Zone 2 — Photo Library */}
      <div style={{ marginBottom: '0.75rem' }}>
        <p style={{ color: '#9A9A96', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
          Photo Library
        </p>
        <p style={{ color: '#6B6B68', fontSize: '0.78rem' }}>
          Click &quot;Assign&quot; on any photo to place it in a slot above.
        </p>
      </div>

      {items.length === 0 ? (
        <p style={{ color: '#6B6B68', fontSize: '0.85rem', marginTop: '1rem' }}>
          No photos yet. Upload one above.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {items.map((item) => {
            const isAssigned = item.order >= 0 && item.order <= 6
            const slotLabel = isAssigned ? SLOT_LABELS[item.order] : null
            const boundAssign = assignSlot.bind(null, item.id)

            return (
              <div
                key={item.id}
                style={{
                  background: '#1A1A18',
                  border: '1px solid #2A2A28',
                  borderLeft: isAssigned ? '3px solid #2ABFA8' : '1px solid #2A2A28',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.caption ?? ''}
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {/* Caption + slot badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <p style={{
                      color: item.caption ? '#9A9A96' : '#4A4A48',
                      fontSize: '0.75rem',
                      flex: 1,
                      minWidth: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.caption ?? 'No caption'}
                    </p>
                    {slotLabel ? (
                      <span style={{
                        background: 'rgba(42,191,168,0.12)',
                        border: '1px solid rgba(42,191,168,0.25)',
                        color: '#2ABFA8',
                        fontSize: '0.65rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 4,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}>
                        Slot {slotLabel.letter}
                      </span>
                    ) : (
                      <span style={{
                        background: 'transparent',
                        color: '#4A4A48',
                        fontSize: '0.65rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 4,
                        border: '1px solid #2A2A28',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}>
                        Unassigned
                      </span>
                    )}
                  </div>

                  {/* Assign slot form */}
                  <AssignSlotForm currentSlot={item.order} action={boundAssign} />

                  {/* Delete */}
                  <DeleteButton action={deleteImage.bind(null, item.id)} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
