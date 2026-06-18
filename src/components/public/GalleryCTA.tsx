'use client'
import { type CSSProperties } from 'react'
import Link from 'next/link'

export default function GalleryCTA({ style, label }: { style: CSSProperties; label: string }) {
  return (
    <Link
      href="/projects"
      style={{
        ...style,
        background: 'var(--teal)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2rem',
        borderRadius: 3,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal2)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}
    >
      <div style={{ fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,238,230,0.75)', fontFamily: 'var(--font-archivo)' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 900, fontSize: '3.5rem', color: 'var(--white)', lineHeight: 1 }}>
        →
      </div>
    </Link>
  )
}
