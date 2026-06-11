'use client';
import { useActionState, useEffect, useState } from 'react';
import { saveSocialLinks } from './actions';

type Field = { key: string; label: string; placeholder: string };

const fields: Field[] = [
  {
    key: 'social_facebook',
    label: 'Facebook',
    placeholder: 'https://www.facebook.com/...',
  },
  {
    key: 'social_instagram',
    label: 'Instagram',
    placeholder: 'https://www.instagram.com/...',
  },
  {
    key: 'social_tiktok',
    label: 'TikTok',
    placeholder: 'https://www.tiktok.com/@...',
  },
  {
    key: 'social_youtube',
    label: 'YouTube',
    placeholder: 'https://www.youtube.com/@...',
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

export default function SocialLinksForm({
  defaults,
}: {
  defaults: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState(saveSocialLinks, null);
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
    <form action={formAction} style={{ maxWidth: 480 }}>
      {fields.map((field) => (
        <div key={field.key} style={{ marginBottom: '1.25rem' }}>
          <label htmlFor={field.key} style={labelStyle}>
            {field.label}
          </label>
          <input
            id={field.key}
            type="url"
            name={field.key}
            placeholder={field.placeholder}
            defaultValue={defaults[field.key] || ''}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={pending}
        style={{
          background: '#1A6B60',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: 4,
          padding: '0.65rem 1.5rem',
          fontSize: '0.87rem',
          fontWeight: 700,
          cursor: pending ? 'not-allowed' : 'pointer',
          opacity: pending ? 0.6 : 1,
          fontFamily: 'inherit',
          marginTop: '0.5rem',
        }}
      >
        {pending ? 'Saving...' : 'Save Changes'}
      </button>
      {showSuccess && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.6rem 0.75rem',
            background: '#D4EDDA',
            color: '#155724',
            borderRadius: 4,
            fontSize: '0.85rem',
          }}
        >
          ✓ Saved successfully
        </div>
      )}
    </form>
  );
}
