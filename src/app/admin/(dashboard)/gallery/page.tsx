import { prisma } from '@/lib/prisma'
import UploadForm from '@/components/admin/UploadForm'
import DeleteButton from '@/components/admin/DeleteButton'
import { uploadImage, deleteImage, reorderImage } from './actions'

const moveBtnStyle: React.CSSProperties = {
  background: '#0C0C0A',
  border: '1px solid #2A2A28',
  borderRadius: 4,
  color: '#9A9A96',
  fontSize: '0.75rem',
  padding: '0.3rem 0.7rem',
  cursor: 'pointer',
  lineHeight: 1,
  transition: 'border-color 0.15s, color 0.15s',
}

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: 'asc' } })
  const n = items.length
  const subtitle = `${n} photo${n !== 1 ? 's' : ''} · Upload up to any amount, first 7 appear on the site`

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#F2EEE6', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Gallery
        </h1>
        <p style={{ color: '#6B6B68', fontSize: '0.85rem' }}>{subtitle}</p>
      </div>

      <UploadForm action={uploadImage} />

      {items.length === 0 ? (
        <p style={{ color: '#6B6B68', fontSize: '0.85rem', marginTop: '2rem' }}>
          No photos yet. Upload one above.
        </p>
      ) : (
        <div
          style={{
            marginTop: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#1A1A18',
                border: '1px solid #2A2A28',
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
              <div style={{ padding: '1rem' }}>
                {/* Top row: caption + order badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem' }}>
                  <p
                    style={{
                      color: item.caption ? '#9A9A96' : '#4A4A48',
                      fontSize: '0.78rem',
                      flex: 1,
                      minWidth: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.caption ?? 'No caption'}
                  </p>
                  <span
                    style={{
                      background: '#0C0C0A',
                      border: '1px solid #2A2A28',
                      borderRadius: 4,
                      color: '#6B6B68',
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      flexShrink: 0,
                    }}
                  >
                    #{item.order}
                  </span>
                </div>
                {/* Bottom row: move + delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <form action={reorderImage.bind(null, item.id, 'up')}>
                    <button type="submit" className="move-btn" style={moveBtnStyle} title="Move up">
                      ↑ Move Up
                    </button>
                  </form>
                  <form action={reorderImage.bind(null, item.id, 'down')}>
                    <button type="submit" className="move-btn" style={moveBtnStyle} title="Move down">
                      ↓ Move Down
                    </button>
                  </form>
                  <DeleteButton action={deleteImage.bind(null, item.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
