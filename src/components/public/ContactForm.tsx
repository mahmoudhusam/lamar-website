'use client'

import { useState } from 'react'

interface ContactFormTr {
  nameLbl: string; namePh: string;
  phoneLbl: string; phonePh: string;
  emailLbl: string; emailPh: string;
  serviceLbl: string; servicePh: string;
  messageLbl: string; messagePh: string;
  send: string; sending: string;
  successTitle: string; successMsg: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--border2)',
  padding: '0.85rem 0',
  width: '100%',
  outline: 'none',
  fontFamily: 'var(--font-outfit)',
  fontSize: '0.95rem',
  color: 'var(--white)',
  fontWeight: 300,
  transition: 'border-color 0.25s',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.6rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--white)',
  fontFamily: 'var(--font-archivo)',
  display: 'block',
  marginBottom: '0.5rem',
}

export default function ContactForm({ tr }: { tr: ContactFormTr }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '', company: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = 'var(--teal2)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = 'var(--border2)'
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center' }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '1.5rem',
          }}
        >
          ✓
        </div>
        <h3 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--white)', marginBottom: '0.75rem' }}>
          {tr.successTitle}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--white2)', fontWeight: 300 }}>
          {tr.successMsg}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Honeypot: hidden from real users; bots that fill it are silently dropped server-side. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.company}
        onChange={set('company')}
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <div className="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>{tr.nameLbl}</label>
          <input style={inputStyle} type="text" placeholder={tr.namePh} required value={form.name} onChange={set('name')} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div>
          <label style={labelStyle}>{tr.phoneLbl}</label>
          <input style={inputStyle} type="tel" placeholder={tr.phonePh} value={form.phone} onChange={set('phone')} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>{tr.emailLbl}</label>
        <input style={inputStyle} type="email" placeholder={tr.emailPh} required value={form.email} onChange={set('email')} onFocus={handleFocus} onBlur={handleBlur} />
      </div>

      <div>
        <label style={labelStyle}>{tr.serviceLbl}</label>
        <input style={inputStyle} type="text" placeholder={tr.servicePh} value={form.service} onChange={set('service')} onFocus={handleFocus} onBlur={handleBlur} />
      </div>

      <div>
        <label style={labelStyle}>{tr.messageLbl}</label>
        <textarea
          style={{ ...inputStyle, minHeight: 100, resize: 'none' }}
          placeholder={tr.messagePh}
          value={form.message}
          onChange={set('message')}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: '0.85rem', color: '#f87171', marginTop: '-0.5rem' }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: 'var(--white)',
          color: 'var(--bg)',
          padding: '0.875rem 2rem',
          fontFamily: 'var(--font-outfit)',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 500,
          borderRadius: 2,
          border: 'none',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.6 : 1,
          transition: 'background 0.2s, color 0.2s',
          alignSelf: 'flex-start',
        }}
        onMouseEnter={(e) => {
          if (status !== 'loading') {
            e.currentTarget.style.background = 'var(--teal2)'
            e.currentTarget.style.color = 'var(--white)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--white)'
          e.currentTarget.style.color = 'var(--bg)'
        }}
      >
        {status === 'loading' ? tr.sending : tr.send}
      </button>
    </form>
  )
}
