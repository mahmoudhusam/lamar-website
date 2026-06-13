'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { t, type Lang } from '@/lib/i18n';

export default function Navbar({ lang }: { lang: Lang }) {
  const tr = t[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || '/';
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => { setMenuOpen(false); document.body.style.overflow = ''; };
  const toggleMenu = () => { const next = !menuOpen; setMenuOpen(next); document.body.style.overflow = next ? 'hidden' : ''; };

  const desktopLinks = [
    { label: tr.about, href: '/over-ons' },
    { label: tr.projects, href: '/projects' },
    { label: tr.infohub, href: '/infohub' },
    { label: tr.contact, href: '/contact' },
  ];
  const mobileLinks = [...desktopLinks];

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          padding: '1rem 3.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'box-shadow 0.3s',
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border)',
          boxShadow: scrolled ? '0 4px 20px rgba(20,24,29,0.07)' : 'none',
        }}
      >
        {/* Left: logo + links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.75rem' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/lamar_icon.svg" alt="" style={{ height: 42, width: 'auto', display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '0.06em', color: 'var(--white)', lineHeight: 1 }}>Lamar</span>
              <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 300, fontSize: '0.56rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--white2)', lineHeight: 1, marginTop: 3 }}>Stukadoor en Onderhoud</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {desktopLinks.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <a key={href} href={href}
                  style={{ position: 'relative', textDecoration: 'none', fontSize: '0.82rem', fontWeight: active ? 700 : 500, letterSpacing: '0.04em', color: active ? 'var(--teal)' : 'var(--white2)', transition: 'color 0.2s', fontFamily: 'var(--font-outfit)', paddingBottom: 4 }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--white)'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--white2)'; }}
                >
                  {label}
                  {active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, borderRadius: 2, background: 'var(--teal2)' }} />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/offerte-aanvragen" className="hidden md:inline-block"
            style={{ background: 'var(--teal)', color: '#FFFFFF', padding: '0.7rem 1.6rem', borderRadius: 999, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.02em', fontFamily: 'var(--font-outfit)', transition: 'background 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--teal2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--teal)')}
          >{t[lang].hero.quoteCta}</a>

          <button onClick={toggleMenu} className="flex md:hidden flex-col gap-1.25 cursor-pointer p-1 bg-transparent border-none" aria-label="Menu" style={{ zIndex: 210 }}>
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)', borderRadius: 2, transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)', borderRadius: 2, transition: 'transform 0.3s, opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)', borderRadius: 2, transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 199, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(18px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          {mobileLinks.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <a key={href} href={href} onClick={closeMenu}
                style={{ textDecoration: 'none', fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '2rem', letterSpacing: '0.04em', color: active ? 'var(--teal)' : 'var(--white2)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--white)'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--white2)'; }}
              >{label}</a>
            );
          })}
          <a href="/offerte-aanvragen" onClick={closeMenu}
            style={{ background: 'var(--teal)', color: '#FFFFFF', padding: '0.9rem 2.5rem', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1rem', marginTop: '0.75rem' }}
          >{t[lang].hero.quoteCta}</a>
        </div>
      )}
    </>
  );
}
