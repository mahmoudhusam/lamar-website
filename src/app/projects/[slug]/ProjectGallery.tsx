'use client'

import { useState, useEffect, useCallback } from 'react'

type Image = { id: string; url: string; caption: string | null; order: number }

export default function ProjectGallery({ images }: { images: Image[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = () => setLightboxIndex(null)
  const goPrev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), [])
  const goNext = useCallback(() => setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, goPrev, goNext])

  if (images.length === 0) {
    return <p style={{ color: 'var(--white2)', fontSize: '0.95rem', paddingTop: '2rem' }}>No images in this project yet.</p>
  }

  return (
    <>
      {/* Image grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setLightboxIndex(index)}
            style={{
              padding: 0,
              border: 'none',
              borderRadius: 3,
              overflow: 'hidden',
              cursor: 'pointer',
              background: 'var(--bg3)',
              display: 'block',
              position: 'relative',
              aspectRatio: '4/3',
              transition: 'transform 0.2s',
              width: '100%',
            }}
            className="gallery-thumb"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.caption ?? ''}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              className="gallery-thumb-img"
            />
            {img.caption && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1rem 0.75rem', background: 'linear-gradient(to top, rgba(4,4,3,0.8) 0%, transparent 100%)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,238,230,0.9)', fontFamily: 'var(--font-archivo)', textAlign: 'left' }}>
                {img.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(4,4,3,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{ position: 'fixed', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'var(--white2)', fontSize: '2rem', cursor: 'pointer', zIndex: 1001, lineHeight: 1, padding: '0.5rem' }}
            aria-label="Close"
          >
            ×
          </button>

          {/* Counter */}
          <div style={{ position: 'fixed', top: '1.75rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', letterSpacing: '0.16em', color: 'var(--white2)', fontFamily: 'var(--font-archivo)', zIndex: 1001 }}>
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              style={{ position: 'fixed', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(242,238,230,0.08)', border: '1px solid var(--border2)', borderRadius: 3, color: 'var(--white)', fontSize: '1.5rem', cursor: 'pointer', padding: '0.75rem 1rem', zIndex: 1001, lineHeight: 1, transition: 'background 0.2s' }}
              aria-label="Previous"
              className="lb-prev"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 'min(90vw, 1200px)', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].caption ?? ''}
              style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 3, display: 'block' }}
            />
            {images[lightboxIndex].caption && (
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white2)', fontFamily: 'var(--font-archivo)', textAlign: 'center' }}>
                {images[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Next */}
          {lightboxIndex < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              style={{ position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(242,238,230,0.08)', border: '1px solid var(--border2)', borderRadius: 3, color: 'var(--white)', fontSize: '1.5rem', cursor: 'pointer', padding: '0.75rem 1rem', zIndex: 1001, lineHeight: 1, transition: 'background 0.2s' }}
              aria-label="Next"
              className="lb-next"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  )
}
