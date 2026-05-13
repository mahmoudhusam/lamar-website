import { prisma } from '@/lib/prisma'
import UploadForm from '@/components/admin/UploadForm'
import DeleteButton from '@/components/admin/DeleteButton'
import { uploadImage, deleteImage, reorderImage } from './actions'

const reorderBtnStyle: React.CSSProperties = {
  background: '#0C0C0A',
  border: '1px solid #2A2A28',
  borderRadius: 4,
  color: '#9A9A96',
  fontSize: '0.78rem',
  padding: '0.2rem 0.55rem',
  cursor: 'pointer',
  lineHeight: 1,
}

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#F2EEE6', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Gallery
        </h1>
        <p style={{ color: '#6B6B68', fontSize: '0.85rem' }}>{items.length} photo{items.length !== 1 ? 's' : ''}</p>
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
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
              <div style={{ padding: '0.75rem' }}>
                <p
                  style={{
                    color: item.caption ? '#9A9A96' : '#4A4A48',
                    fontSize: '0.78rem',
                    marginBottom: '0.75rem',
                    minHeight: '1.1rem',
                  }}
                >
                  {item.caption ?? 'No caption'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <form action={reorderImage.bind(null, item.id, 'up')}>
                    <button type="submit" style={reorderBtnStyle} title="Move up">↑</button>
                  </form>
                  <form action={reorderImage.bind(null, item.id, 'down')}>
                    <button type="submit" style={reorderBtnStyle} title="Move down">↓</button>
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
