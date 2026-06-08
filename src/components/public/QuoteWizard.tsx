'use client'

import { useEffect, useMemo, useState } from 'react'

const WA = '31684054528'

type KlusKey = 'stucwerk' | 'latex' | 'sauswerk' | 'lijstwerk'

const KLUS_OPTIONS: { key: KlusKey; label: string }[] = [
  { key: 'stucwerk',  label: 'Stucwerk' },
  { key: 'latex',     label: 'Latex spuitwerk' },
  { key: 'sauswerk',  label: 'Sauswerk' },
  { key: 'lijstwerk', label: 'Lijstwerk' },
]

const WONINGEN: { key: 'bestaand' | 'nieuwbouw'; label: string; sub: string }[] = [
  { key: 'bestaand',  label: 'Bestaande bouw', sub: 'Ouder dan 2 jaar' },
  { key: 'nieuwbouw', label: 'Nieuwbouw',      sub: 'Jonger dan 2 jaar' },
]

const MONTHS_NL = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
const WEEKDAYS_NL = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo']
const STEPS = ['Klusoverzicht', 'Beschikbaarheid', 'Uw gegevens']

type Measure = { wand: string; plafond: string; onbekend: boolean }
const emptyMeasure = (): Measure => ({ wand: '', plafond: '', onbekend: false })

const num = (s: string) => {
  const n = parseFloat(s.replace(',', '.'))
  return isNaN(n) ? 0 : n
}
const pad = (n: number) => String(n).padStart(2, '0')
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const fmtDate = (iso: string) => {
  const [, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS_NL[m - 1]}`
}
const fmtDateLong = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS_NL[m - 1]} ${y}`
}

function estimateDays(total: number): string {
  if (total <= 0) return '—'
  if (total <= 30) return '1–2 dagen'
  if (total <= 75) return '2–4 dagen'
  if (total <= 150) return '4–7 dagen'
  return '1–2 weken'
}

const labelStyle: React.CSSProperties = { fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white2)', fontFamily: 'var(--font-archivo)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }
const inputStyle: React.CSSProperties = { width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '0.85rem 1rem', fontSize: '0.95rem', color: 'var(--white)', fontFamily: 'var(--font-outfit)', outline: 'none', transition: 'border-color 0.2s' }
const sectionTitle: React.CSSProperties = { fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--white)', marginBottom: '0.25rem' }

export default function QuoteWizard() {
  const [step, setStep] = useState(0)
  const [woning, setWoning] = useState<'' | 'bestaand' | 'nieuwbouw'>('')
  const [selected, setSelected] = useState<KlusKey[]>([])
  const [measures, setMeasures] = useState<Record<KlusKey, Measure>>({
    stucwerk: emptyMeasure(), latex: emptyMeasure(), sauswerk: emptyMeasure(), lijstwerk: emptyMeasure(),
  })
  const [photos, setPhotos] = useState<{ id: string; file: File; url: string }[]>([])
  const [opmerkingen, setOpmerkingen] = useState('')
  const [dates, setDates] = useState<string[]>([])
  const [details, setDetails] = useState({ naam: '', email: '', telefoon: '', straat: '', postcode: '', plaats: '' })
  const [submitted, setSubmitted] = useState(false)

  const now = useMemo(() => new Date(), [])
  const [viewY, setViewY] = useState(now.getFullYear())
  const [viewM, setViewM] = useState(now.getMonth())
  const [today, setToday] = useState<Date | null>(null)
  useEffect(() => { setToday(new Date()) }, [])

  const toggleKlus = (k: KlusKey) =>
    setSelected((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]))

  const setMeasure = (k: KlusKey, field: keyof Measure, value: string | boolean) =>
    setMeasures((prev) => ({ ...prev, [k]: { ...prev[k], [field]: value } }))

  const measureTotal = (k: KlusKey) => {
    const m = measures[k]
    if (m.onbekend) return -1
    return num(m.wand) + num(m.plafond)
  }
  const grandTotal = selected.reduce((sum, k) => {
    const t = measureTotal(k)
    return sum + (t > 0 ? t : 0)
  }, 0)

  const klusTypeDone = woning !== '' && selected.length > 0
  const afmetingenDone = selected.some((k) => measureTotal(k) !== 0)
  const startdatumDone = dates.length > 0
  const gegevensDone = Object.values(details).every((v) => v.trim() !== '')

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const room = 5 - photos.length
    const add = files.slice(0, room).map((file) => ({
      id: (crypto.randomUUID?.() ?? String(Math.random())),
      file,
      url: URL.createObjectURL(file),
    }))
    setPhotos((p) => [...p, ...add])
    e.target.value = ''
  }
  function removePhoto(id: string) {
    setPhotos((p) => {
      const found = p.find((x) => x.id === id)
      if (found) URL.revokeObjectURL(found.url)
      return p.filter((x) => x.id !== id)
    })
  }

  const cells = useMemo(() => {
    const first = new Date(viewY, viewM, 1)
    const offset = (first.getDay() + 6) % 7
    const start = new Date(viewY, viewM, 1 - offset)
    const out = []
    for (let i = 0; i < 42; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
      const iso = toISO(d)
      const isPast = today ? d < new Date(today.getFullYear(), today.getMonth(), today.getDate()) : false
      out.push({ d, iso, inMonth: d.getMonth() === viewM, isPast, isSelected: dates.includes(iso) })
    }
    return out
  }, [viewY, viewM, dates, today])

  const prevMonth = () => { const m = viewM - 1; if (m < 0) { setViewM(11); setViewY((y) => y - 1) } else setViewM(m) }
  const nextMonth = () => { const m = viewM + 1; if (m > 11) { setViewM(0); setViewY((y) => y + 1) } else setViewM(m) }
  const toggleDate = (iso: string) =>
    setDates((prev) => (prev.includes(iso) ? prev.filter((x) => x !== iso) : [...prev, iso].sort()))

  function buildMessage(): string {
    const woningLabel = WONINGEN.find((w) => w.key === woning)?.label ?? '—'
    const lines: string[] = []
    lines.push('Hallo LAMAR, ik wil graag een offerte aanvragen.', '')
    lines.push(`Type woning: ${woningLabel}`)
    lines.push('Werkzaamheden:')
    selected.forEach((k) => {
      const label = KLUS_OPTIONS.find((o) => o.key === k)!.label
      const t = measureTotal(k)
      const suffix = t === -1 ? ' (m² nog onbekend)' : t > 0 ? ` (${t} m²)` : ''
      lines.push(`• ${label}${suffix}`)
    })
    if (grandTotal > 0) lines.push(`Geschatte duurtijd: ${estimateDays(grandTotal)}`)
    if (dates.length) lines.push(`Gewenste startdatum(s): ${dates.map(fmtDateLong).join(', ')}`)
    if (opmerkingen.trim()) lines.push(`Opmerkingen: ${opmerkingen.trim()}`)
    lines.push('', `Naam: ${details.naam}`, `E-mail: ${details.email}`, `Telefoon: ${details.telefoon}`)
    lines.push(`Adres: ${details.straat}, ${details.postcode} ${details.plaats}`)
    if (photos.length) lines.push('', `(${photos.length} foto's beschikbaar — die stuur ik los in deze chat.)`)
    return encodeURIComponent(lines.join('\n'))
  }

  function handleSubmit() {
    if (!gegevensDone) return
    // ── SWAP POINT: replace this with an API POST / email when the channel is decided ──
    window.open(`https://wa.me/${WA}?text=${buildMessage()}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const canNext = step === 0 ? klusTypeDone : true

  if (submitted) {
    return (
      <Shell>
        <div style={{ maxWidth: 560, margin: '4rem auto', textAlign: 'center', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 24, padding: '3.5rem 2rem', boxShadow: '0 20px 50px rgba(20,24,29,0.08)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--teal)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.75rem' }}>✓</div>
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--white)', marginBottom: '0.75rem' }}>Aanvraag verzonden!</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--white2)', fontWeight: 300, marginBottom: '2rem' }}>
            Bedankt voor uw aanvraag. We openen WhatsApp zodat u uw gegevens direct kunt versturen — we reageren snel met een heldere offerte.
          </p>
          <a href="/" style={{ background: 'var(--teal)', color: '#FFFFFF', padding: '0.85rem 2rem', borderRadius: 999, fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-outfit)' }}>Terug naar home</a>
        </div>
      </Shell>
    )
  }

  return (
    <Shell>
      <style>{`
        .oa-input:focus { border-color: var(--teal2) !important; }
        .oa-chip:hover { border-color: var(--teal2); }
        .oa-card-opt:hover { border-color: var(--teal2); }
        .oa-day:hover:not(:disabled):not(.sel) { background: var(--bg2); }
        .oa-btn-next:hover { background: var(--teal2) !important; }
        .oa-btn-prev:hover { border-color: var(--white) !important; color: var(--white) !important; }
        .oa-upload:hover { border-color: var(--teal2); }
        .oa-navmonth:hover { background: var(--bg2); }
      `}</style>

      {/* Stepper */}
      <div style={{ maxWidth: 1080, margin: '0 auto 2.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        {STEPS.map((s, i) => {
          const done = i < step
          const active = i === step
          const on = done || active
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', minWidth: 110 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: on ? 700 : 400, color: on ? 'var(--white)' : 'var(--white3)', fontFamily: 'var(--font-archivo)' }}>{s}</span>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: on ? 'var(--teal)' : '#FFFFFF', border: on ? 'none' : '2px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '0.7rem' }}>
                  {done ? '✓' : ''}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: done ? 'var(--teal)' : 'var(--border2)', marginTop: 26 }} />
              )}
            </div>
          )
        })}
      </div>

      <div className="oa-grid" style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: '1.75rem', alignItems: 'start' }}>
        {/* ── Form card ── */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 24, padding: '2.25rem', boxShadow: '0 20px 50px rgba(20,24,29,0.06)' }}>

          {step === 0 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.7rem', color: 'var(--white)', marginBottom: '0.4rem' }}>Wat voor klus heeft u?</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--white2)', fontWeight: 300, marginBottom: '2rem' }}>Selecteer de werkzaamheden en geef de afmetingen op.</p>

              <label style={labelStyle}>Type woning</label>
              <div className="oa-woning" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {WONINGEN.map((w) => {
                  const sel = woning === w.key
                  return (
                    <button key={w.key} type="button" className="oa-card-opt" onClick={() => setWoning(w.key)}
                      style={{ textAlign: 'center', cursor: 'pointer', background: sel ? 'var(--bg2)' : '#FFFFFF', border: sel ? '2px solid var(--teal2)' : '1px solid var(--border)', borderRadius: 16, padding: '1.5rem 1rem', transition: 'border-color 0.2s, background 0.2s', fontFamily: 'inherit' }}>
                      <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1rem', color: sel ? 'var(--teal)' : 'var(--white)', marginBottom: '0.25rem' }}>{w.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--white3)', fontWeight: 300 }}>{w.sub}</div>
                    </button>
                  )
                })}
              </div>

              <label style={labelStyle}>Type klus <span style={{ color: 'var(--teal2)' }}>*</span></label>
              <p style={{ fontSize: '0.8rem', color: 'var(--white3)', marginTop: '-0.25rem', marginBottom: '1rem' }}>Meerdere opties mogelijk</p>
              <div className="oa-chips" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                {KLUS_OPTIONS.map((o) => {
                  const sel = selected.includes(o.key)
                  return (
                    <button key={o.key} type="button" className="oa-chip" onClick={() => toggleKlus(o.key)}
                      style={{ position: 'relative', cursor: 'pointer', background: sel ? 'var(--bg2)' : '#FFFFFF', border: sel ? '2px solid var(--teal2)' : '1px solid var(--border)', borderRadius: 12, padding: '0.9rem 0.5rem', fontSize: '0.85rem', fontWeight: 600, color: sel ? 'var(--teal)' : 'var(--white)', fontFamily: 'var(--font-outfit)', transition: 'border-color 0.2s' }}>
                      {o.label}
                      {sel && <span style={{ position: 'absolute', top: 6, right: 6, width: 16, height: 16, borderRadius: '50%', background: 'var(--teal2)', color: '#FFFFFF', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>}
                    </button>
                  )
                })}
              </div>

              {selected.map((k) => {
                const m = measures[k]
                const total = m.onbekend ? 0 : num(m.wand) + num(m.plafond)
                const label = KLUS_OPTIONS.find((o) => o.key === k)!.label
                return (
                  <div key={k} style={{ border: '1px solid var(--border)', borderRadius: 16, padding: '1.25rem', marginBottom: '1rem', background: 'var(--bg)' }}>
                    <div style={{ ...sectionTitle, marginBottom: '1rem' }}>{label}</div>
                    <div className="oa-measure-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', opacity: m.onbekend ? 0.45 : 1 }}>
                      <div>
                        <label style={{ ...labelStyle, marginBottom: '0.35rem' }}>Wand m²</label>
                        <input className="oa-input" style={inputStyle} type="number" min="0" inputMode="decimal" value={m.wand} disabled={m.onbekend} onChange={(e) => setMeasure(k, 'wand', e.target.value)} placeholder="0" />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, marginBottom: '0.35rem' }}>Plafond m²</label>
                        <input className="oa-input" style={inputStyle} type="number" min="0" inputMode="decimal" value={m.plafond} disabled={m.onbekend} onChange={(e) => setMeasure(k, 'plafond', e.target.value)} placeholder="0" />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, marginBottom: '0.35rem' }}>Totaal</label>
                        <div style={{ ...inputStyle, background: 'rgba(42,191,168,0.1)', color: 'var(--teal)', fontWeight: 700, textAlign: 'center' }}>{total} m²</div>
                      </div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.85rem', fontSize: '0.82rem', color: 'var(--white2)', cursor: 'pointer' }}>
                      <input type="checkbox" checked={m.onbekend} onChange={(e) => setMeasure(k, 'onbekend', e.target.checked)} style={{ accentColor: 'var(--teal2)' }} />
                      Weet ik nog niet
                    </label>
                  </div>
                )
              })}

              <div style={{ marginTop: '1.5rem' }}>
                <label style={labelStyle}>Foto&apos;s van de ruimte</label>
                <p style={{ fontSize: '0.78rem', color: 'var(--white3)', marginTop: '-0.25rem', marginBottom: '0.85rem' }}>Optioneel · max 5 foto&apos;s</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {photos.map((p) => (
                    <div key={p.id} style={{ position: 'relative', width: 84, height: 84, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => removePhoto(p.id)} style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: '50%', background: 'rgba(20,24,29,0.7)', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '0.7rem', lineHeight: 1 }}>×</button>
                    </div>
                  ))}
                  {photos.length < 5 && (
                    <label className="oa-upload" style={{ width: 84, height: 84, borderRadius: 12, border: '1px dashed var(--border2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', color: 'var(--white2)', fontSize: '0.7rem', transition: 'border-color 0.2s' }}>
                      <span style={{ fontSize: '1.2rem' }}>＋</span>
                      Upload
                      <input type="file" accept="image/*" multiple onChange={onFiles} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={labelStyle}>Opmerkingen</label>
                <textarea className="oa-input" style={{ ...inputStyle, minHeight: 96, resize: 'vertical' }} value={opmerkingen} onChange={(e) => setOpmerkingen(e.target.value)} placeholder="Bijv. 'alleen de woonkamer' of 'eerst muren egaliseren'…" />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.7rem', color: 'var(--white)', marginBottom: '0.4rem' }}>Wanneer wilt u starten?</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--white2)', fontWeight: 300, marginBottom: '1.5rem' }}>Selecteer uw gewenste startdatum(s). Dit is niet bindend.</p>

              <div style={{ background: 'rgba(42,191,168,0.08)', border: '1px solid rgba(42,191,168,0.25)', borderRadius: 12, padding: '0.85rem 1rem', fontSize: '0.85rem', color: 'var(--teal)', marginBottom: '1.75rem' }}>
                Klik op een of meerdere dagen. Wij plannen in overleg met u de definitieve datum.
              </div>

              <div style={{ maxWidth: 420, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <button type="button" className="oa-navmonth" onClick={prevMonth} style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border)', background: '#FFFFFF', cursor: 'pointer', color: 'var(--white2)' }}>‹</button>
                  <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, color: 'var(--white)' }}>{MONTHS_NL[viewM]} {viewY}</span>
                  <button type="button" className="oa-navmonth" onClick={nextMonth} style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border)', background: '#FFFFFF', cursor: 'pointer', color: 'var(--white2)' }}>›</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
                  {WEEKDAYS_NL.map((d) => (<div key={d} style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--white3)', fontWeight: 600 }}>{d}</div>))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                  {cells.map((c) => (
                    <button key={c.iso} type="button" disabled={c.isPast} onClick={() => toggleDate(c.iso)}
                      className={`oa-day${c.isSelected ? ' sel' : ''}`}
                      style={{ aspectRatio: '1/1', border: 'none', borderRadius: 8, cursor: c.isPast ? 'default' : 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)', background: c.isSelected ? 'var(--teal)' : 'transparent', color: c.isSelected ? '#FFFFFF' : c.isPast || !c.inMonth ? 'var(--white3)' : 'var(--white)', fontWeight: c.isSelected ? 700 : 400, opacity: c.isPast ? 0.4 : 1, transition: 'background 0.15s' }}>
                      {c.d.getDate()}
                    </button>
                  ))}
                </div>
              </div>

              {dates.length > 0 && (
                <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--white2)', marginBottom: '0.75rem' }}>{dates.length} datum geselecteerd</div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {dates.map((iso) => (
                      <span key={iso} onClick={() => toggleDate(iso)} style={{ background: 'rgba(42,191,168,0.12)', color: 'var(--teal)', padding: '0.35rem 0.85rem', borderRadius: 999, fontSize: '0.8rem', cursor: 'pointer' }}>📅 {fmtDate(iso)} ×</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.7rem', color: 'var(--white)', marginBottom: '0.4rem' }}>Uw gegevens</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--white2)', fontWeight: 300, marginBottom: '2rem' }}>Zodat wij u een passende offerte kunnen sturen.</p>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>Volledige naam *</label>
                <input className="oa-input" style={inputStyle} value={details.naam} onChange={(e) => setDetails({ ...details, naam: e.target.value })} placeholder="Jan de Vries" />
              </div>
              <div className="oa-measure-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>E-mailadres *</label>
                  <input className="oa-input" style={inputStyle} type="email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} placeholder="jan@voorbeeld.nl" />
                </div>
                <div>
                  <label style={labelStyle}>Telefoonnummer *</label>
                  <input className="oa-input" style={inputStyle} type="tel" value={details.telefoon} onChange={(e) => setDetails({ ...details, telefoon: e.target.value })} placeholder="06 12345678" />
                </div>
              </div>
              <label style={{ ...labelStyle, marginTop: '0.5rem' }}>Adresgegevens</label>
              <div style={{ marginBottom: '1.25rem' }}>
                <input className="oa-input" style={inputStyle} value={details.straat} onChange={(e) => setDetails({ ...details, straat: e.target.value })} placeholder="Straat + huisnummer" />
              </div>
              <div className="oa-measure-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <input className="oa-input" style={inputStyle} value={details.postcode} onChange={(e) => setDetails({ ...details, postcode: e.target.value })} placeholder="1234 AB" />
                <input className="oa-input" style={inputStyle} value={details.plaats} onChange={(e) => setDetails({ ...details, plaats: e.target.value })} placeholder="Plaats" />
              </div>
              <div style={{ background: 'rgba(42,191,168,0.08)', border: '1px solid rgba(42,191,168,0.25)', borderRadius: 12, padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--teal)' }}>
                🔒 Uw gegevens zijn veilig en worden alleen gebruikt voor uw offerte.
              </div>
            </>
          )}

          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <button type="button" className="oa-btn-prev" disabled={step === 0} onClick={() => setStep((s) => s - 1)}
              style={{ border: '1px solid var(--border2)', background: '#FFFFFF', color: 'var(--white2)', padding: '0.7rem 1.5rem', borderRadius: 999, fontSize: '0.82rem', fontWeight: 600, cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1, fontFamily: 'var(--font-outfit)', transition: 'border-color 0.2s, color 0.2s' }}>
              ← Vorige
            </button>
            <div style={{ display: 'flex', gap: 6 }}>
              {STEPS.map((_, i) => (<span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === step ? 'var(--teal)' : 'var(--border2)' }} />))}
            </div>
            {step < 2 ? (
              <button type="button" className="oa-btn-next" disabled={!canNext} onClick={() => setStep((s) => s + 1)}
                style={{ background: 'var(--teal)', color: '#FFFFFF', border: 'none', padding: '0.7rem 1.75rem', borderRadius: 999, fontSize: '0.82rem', fontWeight: 700, cursor: canNext ? 'pointer' : 'not-allowed', opacity: canNext ? 1 : 0.5, fontFamily: 'var(--font-outfit)', transition: 'background 0.2s' }}>
                Volgende →
              </button>
            ) : (
              <button type="button" className="oa-btn-next" disabled={!gegevensDone} onClick={handleSubmit}
                style={{ background: 'var(--teal)', color: '#FFFFFF', border: 'none', padding: '0.7rem 1.75rem', borderRadius: 999, fontSize: '0.82rem', fontWeight: 700, cursor: gegevensDone ? 'pointer' : 'not-allowed', opacity: gegevensDone ? 1 : 0.5, fontFamily: 'var(--font-outfit)', transition: 'background 0.2s' }}>
                ✈ Verstuur aanvraag
              </button>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className="oa-sidebar" style={{ position: 'sticky', top: 24, background: 'var(--white)', borderRadius: 20, padding: '1.75rem', color: '#FFFFFF' }}>
          <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.2rem' }}>Uw offerte</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem' }}>Live overzicht van uw aanvraag</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Klus type gekozen', done: klusTypeDone },
              { label: 'Afmetingen ingevuld', done: afmetingenDone },
              { label: 'Startdatum gekozen', done: startdatumDone },
              { label: 'Gegevens ingevuld', done: gegevensDone },
            ].map((c) => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: c.done ? '#FFFFFF' : 'rgba(255,255,255,0.4)' }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: c.done ? 'var(--teal2)' : 'transparent', border: c.done ? 'none' : '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>{c.done ? '✓' : ''}</span>
                {c.label}
              </div>
            ))}
          </div>

          {selected.length === 0 ? (
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>Nog geen klus geselecteerd</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {selected.map((k) => {
                const t = measureTotal(k)
                const label = KLUS_OPTIONS.find((o) => o.key === k)!.label
                return (
                  <div key={k} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>🧱 {label}</div>
                    {t === -1 ? <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>m² nog onbekend</div>
                      : t > 0 ? <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>🏷 {t} m²</div> : null}
                  </div>
                )
              })}
            </div>
          )}

          <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '0.75rem 1rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>⏱ Geschatte duurtijd</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: 2 }}>{estimateDays(grandTotal)}</div>
          </div>
          <div style={{ marginTop: '0.6rem', background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '0.75rem 1rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>📅 Gewenste startdatum</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: 2 }}>{dates.length ? (dates.length === 1 ? fmtDateLong(dates[0]) : `${dates.length} data gekozen`) : '—'}</div>
          </div>
        </aside>
      </div>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{ padding: '1.75rem', display: 'flex', justifyContent: 'center', borderBottom: '1px solid var(--border)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lamar_icon.svg" alt="" style={{ height: 40, width: 'auto', display: 'block' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '0.06em', color: 'var(--white)', lineHeight: 1 }}>Lamar</span>
            <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 300, fontSize: '0.56rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--white2)', lineHeight: 1, marginTop: 3 }}>Stukadoor en Onderhoud</span>
          </div>
        </a>
      </header>
      <main id="offerte-top" style={{ padding: '3.5rem 3.5rem 6rem' }}>{children}</main>
    </div>
  )
}
