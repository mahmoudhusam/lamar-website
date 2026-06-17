'use client'

import { useActionState, useEffect, useState } from 'react'
import { THEME_PRESETS, THEME_DEFAULTS, type Theme } from '@/lib/theme'
import { saveTheme } from './actions'

type State = { ok: boolean } | null

const HEX = /^#[0-9a-fA-F]{6}$/

function ColorField({
  label,
  name,
  value,
  onChange,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.78rem', color: '#14181D', marginBottom: '0.35rem' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <input
          type="color"
          value={HEX.test(value) ? value : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 44, height: 38, border: '1px solid rgba(20,24,29,0.10)', borderRadius: 6, padding: 2, background: '#FFFFFF', cursor: 'pointer' }}
          aria-label={label}
        />
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          style={{ width: 120, background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 6, color: '#14181D', padding: '0.5rem 0.65rem', fontSize: '0.85rem', fontFamily: 'monospace', outline: 'none' }}
        />
      </div>
    </div>
  )
}

export default function ThemeForm({ current }: { current: Theme }) {
  const [state, formAction, pending] = useActionState<State, FormData>(saveTheme, null)
  const [primary, setPrimary] = useState(current.primary)
  const [accent, setAccent] = useState(current.accent)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!state?.ok) return
    setShowSuccess(true)
    const id = setTimeout(() => setShowSuccess(false), 3000)
    return () => clearTimeout(id)
  }, [state])

  const valid = HEX.test(primary) && HEX.test(accent)

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Presets */}
      <div>
        <p style={{ fontSize: '0.72rem', color: '#5B6470', marginBottom: '0.6rem' }}>Quick palettes</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {THEME_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => { setPrimary(p.primary); setAccent(p.accent) }}
              title={p.name}
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', border: primary === p.primary && accent === p.accent ? '2px solid #14181D' : '1px solid rgba(20,24,29,0.12)', background: '#FFFFFF', borderRadius: 999, padding: '0.3rem 0.7rem 0.3rem 0.45rem', cursor: 'pointer', fontSize: '0.74rem', color: '#14181D' }}
            >
              <span style={{ display: 'flex' }}>
                <span style={{ width: 14, height: 14, borderRadius: '50% 0 0 50%', background: p.primary }} />
                <span style={{ width: 14, height: 14, borderRadius: '0 50% 50% 0', background: p.accent }} />
              </span>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pickers */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <ColorField label="Primary colour — dark (Hoofdkleur)" name="theme_primary" value={primary} onChange={setPrimary} />
        <ColorField label="Accent colour — bright (Accentkleur)" name="theme_accent" value={accent} onChange={setAccent} />
      </div>

      {/* Live preview */}
      <div style={{ border: '1px solid rgba(20,24,29,0.10)', borderRadius: 10, overflow: 'hidden', maxWidth: 360 }}>
        <div style={{ background: `linear-gradient(120deg, ${HEX.test(accent) ? accent : '#ccc'} 0%, ${HEX.test(primary) ? primary : '#999'} 100%)`, padding: '1.5rem', color: '#FFFFFF' }}>
          <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.1rem' }}>Preview</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>How the accent colours look on the site.</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '0.85rem 1.5rem', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <span style={{ background: HEX.test(primary) ? primary : '#999', color: '#FFFFFF', padding: '0.4rem 1rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700 }}>Button</span>
          <span style={{ color: HEX.test(accent) ? accent : '#999', fontSize: '0.8rem', fontWeight: 600 }}>Accent text</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="submit"
          disabled={pending || !valid}
          style={{ background: '#1A6B60', color: '#FFFFFF', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontSize: '0.83rem', fontWeight: 700, cursor: pending || !valid ? 'not-allowed' : 'pointer', opacity: pending || !valid ? 0.6 : 1 }}
        >
          {pending ? 'Saving…' : 'Save colours'}
        </button>
        <button
          type="button"
          onClick={() => { setPrimary(THEME_DEFAULTS.primary); setAccent(THEME_DEFAULTS.accent) }}
          style={{ background: 'none', border: 'none', color: '#97A0AC', fontSize: '0.78rem', cursor: 'pointer' }}
        >
          Reset to default
        </button>
        {!valid && <span style={{ fontSize: '0.76rem', color: '#E05C5C' }}>Enter a valid hex colour (#RRGGBB).</span>}
        {showSuccess && <span style={{ fontSize: '0.78rem', color: '#1A6B60' }}>Saved ✓</span>}
      </div>
    </form>
  )
}
