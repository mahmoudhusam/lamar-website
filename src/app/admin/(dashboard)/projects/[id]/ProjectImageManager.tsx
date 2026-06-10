'use client'

import { useActionState, useEffect, useState } from 'react'

type UploadState = { ok: boolean; error?: string } | null
type UploadAction = (prev: UploadState, formData: FormData) => Promise<UploadState>
type DeleteAction = (imageId: string, projectId: string) => Promise<void>
type SetCoverAction = (projectId: string, imageUrl: string) => Promise<void>

type Image = { id: string; url: string; caption: string | null; order: number }

const inputStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(20,24,29,0.10)',
  borderRadius: 4,
  padding: '0.6rem 0.75rem',
  fontSize: '0.87rem',
  color: '#14181D',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#5B6470',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  display: 'block',
  marginBottom: '0.5rem',
}

function UploadForm({ uploadAction }: { uploadAction: UploadAction }) {
  const [state, formAction, pending] = useActionState(uploadAction, null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!state?.ok) return
    setShowSuccess(true)
    const t = setTimeout(() => setShowSuccess(false), 3000)
    return () => clearTimeout(t)
  }, [state])

  return (
    <form
      action={formAction}
      style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 560, marginBottom: '2rem' }}
    >
      <div>
        <label style={labelStyle}>Image File *</label>
        <input type="file" name="file" accept="image/*" required style={{ ...inputStyle, padding: '0.5rem 0.75rem' }} />
      </div>
      <div>
        <label style={labelStyle}>Caption (optional)</label>
        <input type="text" name="caption" placeholder="e.g. Living room after gypsum work" style={inputStyle} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: '#5B6470' }}>
          <input type="checkbox" name="set_cover" style={{ accentColor: '#2ABFA8' }} />
          Set as cover image
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="submit"
          disabled={pending}
          style={{ background: '#1A6B60', color: '#FFFFFF', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontSize: '0.83rem', fontWeight: 700, cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.65 : 1 }}
        >
          {pending ? 'Uploading…' : 'Upload Image'}
        </button>
        {showSuccess && <span style={{ fontSize: '0.78rem', color: '#1A6B60' }}>Uploaded ✓</span>}
        {state && !state.ok && state.error && <span style={{ fontSize: '0.78rem', color: '#F87171' }}>{state.error}</span>}
      </div>
    </form>
  )
}

export default function ProjectImageManager({
  images,
  coverImageUrl,
  projectId,
  uploadAction,
  deleteAction,
  setCoverAction,
}: {
  images: Image[]
  coverImageUrl: string | null
  projectId: string
  uploadAction: UploadAction
  deleteAction: DeleteAction
  setCoverAction: SetCoverAction
}) {
  return (
    <div>
      <UploadForm uploadAction={uploadAction} />

      {images.length === 0 ? (
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>No images yet. Upload the first one above.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {images.map((img) => {
            const isCover = img.url === coverImageUrl
            return (
              <div
                key={img.id}
                style={{ background: '#FFFFFF', borderRadius: 6, overflow: 'hidden', border: isCover ? '2px solid #2ABFA8' : '1px solid rgba(20,24,29,0.10)', position: 'relative' }}
              >
                {/* Cover badge */}
                {isCover && (
                  <div style={{ position: 'absolute', top: 8, left: 8, background: '#2ABFA8', color: '#FFFFFF', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', borderRadius: 3, zIndex: 1 }}>
                    Cover
                  </div>
                )}

                {/* Image */}
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#F2F5F8' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.caption ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>

                {/* Caption */}
                {img.caption && (
                  <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.72rem', color: '#5B6470' }}>{img.caption}</div>
                )}

                {/* Actions */}
                <div style={{ padding: '0.5rem 0.75rem 0.75rem', display: 'flex', gap: '0.5rem' }}>
                  {!isCover && (
                    <form action={setCoverAction.bind(null, projectId, img.url)}>
                      <button type="submit" style={{ background: 'rgba(42,191,168,0.1)', border: '1px solid rgba(42,191,168,0.25)', color: '#1A6B60', borderRadius: 4, padding: '0.3rem 0.65rem', fontSize: '0.68rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        Set Cover
                      </button>
                    </form>
                  )}
                  <form action={deleteAction.bind(null, img.id, projectId)}>
                    <button
                      type="submit"
                      onClick={(e) => { if (!confirm('Delete this image?')) e.preventDefault() }}
                      style={{ background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.2)', color: '#F87171', borderRadius: 4, padding: '0.3rem 0.65rem', fontSize: '0.68rem', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
