'use client'

import { useEffect, useState } from 'react'

const LogoMark = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 0.875)} viewBox="0 0 120 100">
    <polygon points="0,90 55,5 95,5 70,90" fill="#A0A0A0" />
    <polygon points="60,10 115,10 120,90 75,90" fill="#4BBFBF" />
    <polyline
      points="63,58 78,42 93,58"
      fill="none"
      stroke="white"
      strokeWidth="7"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <rect x="68" y="58" width="20" height="16" fill="white" rx="1" />
    <rect x="74" y="64" width="8" height="10" fill="#4BBFBF" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: '1.1rem 3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.4s, border-bottom 0.4s',
          background: scrolled ? 'rgba(12,12,10,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <LogoMark size={32} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-archivo)',
                fontWeight: 800,
                fontSize: '1.05rem',
                letterSpacing: '0.1em',
                color: 'var(--white)',
                lineHeight: 1,
              }}
            >
              Lamar
            </span>
            <span
              style={{
                fontFamily: 'var(--font-archivo)',
                fontWeight: 300,
                fontSize: '0.45rem',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: 'var(--white2)',
                lineHeight: 1,
                marginTop: 3,
              }}
            >
              Stukadoor en Onderhoud
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {(['About', 'Services', 'Our Work'] as const).map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(' ', '-')}`}
              style={{
                textDecoration: 'none',
                fontSize: '0.78rem',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--white2)',
                transition: 'color 0.2s',
                fontFamily: 'var(--font-archivo)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--white2)')}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              background: 'var(--teal)',
              color: 'var(--white)',
              padding: '0.6rem 1.5rem',
              borderRadius: 2,
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-archivo)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}
          >
            Contact Us
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="flex md:hidden flex-col gap-[5px] cursor-pointer p-1 bg-transparent border-none"
          aria-label="Menu"
          style={{ zIndex: 210 }}
        >
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: 'var(--white)',
              borderRadius: 2,
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: 'var(--white)',
              borderRadius: 2,
              transition: 'transform 0.3s, opacity 0.3s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background: 'var(--white)',
              borderRadius: 2,
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 199,
            background: 'rgba(12,12,10,0.98)',
            backdropFilter: 'blur(18px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {[
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Our Work', href: '#our-work' },
            { label: 'Reviews', href: '#testimonials' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              style={{
                textDecoration: 'none',
                fontFamily: 'var(--font-archivo)',
                fontWeight: 700,
                fontSize: '2rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--white2)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--white2)')}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            style={{
              background: 'var(--teal)',
              color: 'var(--white)',
              padding: '0.9rem 2.5rem',
              borderRadius: 2,
              textDecoration: 'none',
              fontFamily: 'var(--font-archivo)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '0.75rem',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}
          >
            Contact Us
          </a>
        </div>
      )}
    </>
  )
}
