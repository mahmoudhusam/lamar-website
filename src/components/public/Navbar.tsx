'use client'

import { useEffect, useState } from 'react'
import { t, type Lang } from '@/lib/i18n'

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

export default function Navbar({ lang }: { lang: Lang }) {
  const tr = t[lang].nav
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

  const desktopLinks = [
    { label: tr.about,    href: '#about'    },
    { label: tr.services, href: '#services' },
    { label: tr.ourWork,  href: '#our-work' },
  ]

  const mobileLinks = [
    { label: tr.about,    href: '#about'        },
    { label: tr.services, href: '#services'     },
    { label: tr.ourWork,  href: '#our-work'     },
    { label: tr.reviews,  href: '#testimonials' },
  ]

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
          {desktopLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
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
            {tr.contactUs}
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="flex md:hidden flex-col gap-1.25 cursor-pointer p-1 bg-transparent border-none"
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
          {mobileLinks.map(({ label, href }) => (
            <a
              key={href}
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
            {tr.contactUs}
          </a>
        </div>
      )}
    </>
  )
}
