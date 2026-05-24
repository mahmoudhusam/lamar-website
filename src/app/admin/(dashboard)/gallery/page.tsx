import type { CSSProperties } from 'react'
import { prisma } from '@/lib/prisma'
import { removeProjectFromSlot, assignProjectToSlot } from './bentoActions'
import BentoAssignForm from './BentoAssignForm'
import Link from 'next/link'

const SLOT_LABELS = [
  { letter: 'A', role: 'Wide Feature' },
  { letter: 'B', role: 'Top Middle' },
  { letter: 'C', role: 'Tall Right' },
  { letter: 'D', role: 'Mid Left' },
  { letter: 'E', role: 'Mid Right' },
  { letter: 'F', role: 'Bottom Left' },
  { letter: 'G', role: 'Bottom Right' },
]

const BENTO_CELLS: CSSProperties[] = [
  { gridColumn: '1 / 6',  gridRow: '1 / 2' }, // cell 0 → Slot A
  { gridColumn: '6 / 9',  gridRow: '1 / 2' }, // cell 1 → Slot B
  { gridColumn: '9 / 13', gridRow: '1 / 3' }, // cell 2 → Slot C
  { gridColumn: '1 / 4',  gridRow: '2 / 3' }, // cell 3 → text card (static)
  { gridColumn: '4 / 7',  gridRow: '2 / 3' }, // cell 4 → Slot D
  { gridColumn: '7 / 9',  gridRow: '2 / 3' }, // cell 5 → Slot E
  { gridColumn: '1 / 5',  gridRow: '3 / 4' }, // cell 6 → Slot F
  { gridColumn: '5 / 9',  gridRow: '3 / 4' }, // cell 7 → Slot G
  { gridColumn: '9 / 13', gridRow: '3 / 4' }, // cell 8 → teal CTA (static)
]

// Maps cell index → slot index (skipping static cells 3 and 8)
const SLOT_TO_CELL = [0, 1, 2, 4, 5, 6, 7]

export default async function GalleryPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { title: 'asc' },
    include: {
      images: { orderBy: { order: 'asc' }, take: 1 },
      _count: { select: { images: true } },
    },
  }).catch(() => [])

  const slotMap: Record<number, typeof projects[0] | undefined> = {}
  for (const project of projects) {
    if (project.bentoSlot >= 0 && project.bentoSlot <= 6) {
      slotMap[project.bentoSlot] = project
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#F2EEE6', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Homepage Gallery
        </h1>
        <p style={{ color: '#6B6B68', fontSize: '0.85rem' }}>
          Assign projects to the 7 bento slots. Each slot shows the project&apos;s cover image on the homepage.
        </p>
        {projects.length === 0 && (
          <p style={{ color: '#F87171', fontSize: '0.82rem', marginTop: '0.5rem' }}>
            No published projects yet.{' '}
            <Link href="/admin/projects/new" style={{ color: '#2ABFA8' }}>Create one →</Link>
          </p>
        )}
      </div>

      {/* ── Bento Preview ── */}
      <p style={{ color: '#9A9A96', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Bento Preview
      </p>
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
        {BENTO_CELLS.map((cellStyle, cellIndex) => {
          if (cellIndex === 3) {
            return (
              <div key="text-card" style={{ ...cellStyle, background: '#131310', border: '1px solid #2A2A28', borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0.75rem' }}>
                <div style={{ fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4A4A48', marginBottom: '0.3rem' }}>Specialty</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F2EEE6', lineHeight: 1.2 }}>Gypsum &amp; Decoration</div>
              </div>
            )
          }
          if (cellIndex === 8) {
            return (
              <div key="cta" style={{ ...cellStyle, background: '#1A6B60', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', color: '#F2EEE6', fontWeight: 900 }}>→</span>
              </div>
            )
          }

          const slotIndex = SLOT_TO_CELL.indexOf(cellIndex)
          const project = slotMap[slotIndex]
          const label = SLOT_LABELS[slotIndex]
          const cover = project?.coverImageUrl ?? project?.images[0]?.url ?? null

          if (project) {
            return (
              <div key={`slot-${slotIndex}`} style={{ ...cellStyle, position: 'relative', overflow: 'hidden', borderRadius: 3, background: cover ? 'var(--bg3)' : '#1A1A18' }}>
                {cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cover} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,4,3,0.7) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(42,191,168,0.9)', color: '#0C0C0A', fontSize: '0.6rem', fontWeight: 800, padding: '0.2rem 0.4rem', borderRadius: 3 }}>
                  {label.letter}
                </div>
                <form action={removeProjectFromSlot.bind(null, project.id)} style={{ position: 'absolute', top: 6, right: 6 }}>
                  <button type="submit" title="Remove from slot" style={{ background: 'rgba(200,40,40,0.85)', border: 'none', borderRadius: 3, color: '#fff', fontSize: '0.75rem', fontWeight: 700, width: 20, height: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                    ×
                  </button>
                </form>
                <div style={{ position: 'absolute', bottom: 6, left: 6, right: 28, color: 'rgba(242,238,230,0.9)', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {project.title}
                </div>
              </div>
            )
          }

          return (
            <div key={`slot-${slotIndex}`} style={{ ...cellStyle, background: '#1A1A18', border: '1px dashed #3A3A38', borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <span style={{ color: '#2ABFA8', fontSize: '0.9rem', fontWeight: 700 }}>{label.letter}</span>
              <span style={{ color: '#4A4A48', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label.role}</span>
              <span style={{ color: '#2A2A28', fontSize: '1rem', marginTop: 2 }}>+</span>
            </div>
          )
        })}
      </div>

      {/* ── Project Library ── */}
      <p style={{ color: '#9A9A96', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        Project Library
      </p>
      <p style={{ color: '#6B6B68', fontSize: '0.78rem', marginBottom: '1.25rem' }}>
        Use the dropdown on each project to assign it to a slot.
      </p>

      {projects.length === 0 ? (
        <p style={{ color: '#6B6B68', fontSize: '0.85rem' }}>
          No published projects.{' '}
          <Link href="/admin/projects/new" style={{ color: '#2ABFA8' }}>Create your first project →</Link>
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {projects.map((project) => {
            const isAssigned = project.bentoSlot >= 0 && project.bentoSlot <= 6
            const slotLabel = isAssigned ? SLOT_LABELS[project.bentoSlot] : null
            const cover = project.coverImageUrl ?? project.images[0]?.url ?? null
            const boundAssign = assignProjectToSlot.bind(null, project.id)

            return (
              <div
                key={project.id}
                style={{ background: '#1A1A18', border: isAssigned ? '1px solid rgba(42,191,168,0.3)' : '1px solid #2A2A28', borderLeft: isAssigned ? '3px solid #2ABFA8' : '1px solid #2A2A28', borderRadius: 8, padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ width: 60, height: 42, borderRadius: 3, overflow: 'hidden', background: '#131310', flexShrink: 0 }}>
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3A3A38' }}>📷</div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#F2EEE6', fontWeight: 600, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.title}</div>
                  <div style={{ color: '#6B6B68', fontSize: '0.72rem', marginTop: 2 }}>{project._count.images} image{project._count.images !== 1 ? 's' : ''}</div>
                </div>

                {slotLabel ? (
                  <span style={{ background: 'rgba(42,191,168,0.12)', border: '1px solid rgba(42,191,168,0.25)', color: '#2ABFA8', fontSize: '0.65rem', padding: '0.2rem 0.6rem', borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Slot {slotLabel.letter}
                  </span>
                ) : (
                  <span style={{ border: '1px solid #2A2A28', color: '#4A4A48', fontSize: '0.65rem', padding: '0.2rem 0.6rem', borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Unassigned
                  </span>
                )}

                <BentoAssignForm currentSlot={project.bentoSlot} action={boundAssign} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
