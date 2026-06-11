'use client';
import { useActionState, useEffect, useState } from 'react';
import { saveContact } from './actions';

type Field = { key: string; label: string; placeholder: string };

const fields: Field[] = [
  { key: 'contact_phone', label: 'Phone', placeholder: '+31 6 00 000 000' },
  {
    key: 'contact_email',
    label: 'Email',
    placeholder: 'info@lamar-renovatie.nl',
  },
  {
    key: 'contact_location',
    label: 'Location',
    placeholder: 'Amsterdam, Netherlands',
  },
  {
    key: 'contact_hours',
    label: 'Working Hours',
    placeholder: 'Mon–Fri 08:00–18:00',
  },
];

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
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#5B6470',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.5rem',
};

export default function ContactForm({
  defaults,
}: {
  defaults: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState(saveContact, null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.ok) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#2ABFA8';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(20,24,29,0.10)';
  };

  return (
    <form
      action={formAction}
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(20,24,29,0.10)',
        borderRadius: 8,
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        maxWidth: 600,
      }}
    >
      {fields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label htmlFor={key} style={labelStyle}>
            {label}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            defaultValue={defaults[key] ?? ''}
            placeholder={placeholder}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      ))}

      {showSuccess && (
        <div
          style={{
            background: 'rgba(42,191,168,0.1)',
            border: '1px solid rgba(42,191,168,0.3)',
            borderRadius: 6,
            padding: '0.65rem 1rem',
            color: '#1A6B60',
            fontSize: '0.82rem',
          }}
        >
          ✓ Changes saved and published to the public site.
        </div>
      )}

      <div style={{ marginTop: '0.25rem' }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            background: '#1A6B60',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 6,
            padding: '0.6rem 1.5rem',
            fontSize: '0.83rem',
            fontWeight: 700,
            cursor: pending ? 'not-allowed' : 'pointer',
            opacity: pending ? 0.65 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {pending ? 'Saving…' : 'Save All'}
        </button>
      </div>
    </form>
  );
}
