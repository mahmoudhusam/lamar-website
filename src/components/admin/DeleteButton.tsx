'use client'
import { useTransition } from 'react'

export default function DeleteButton({ action }: { action: () => Promise<void> }) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm('Delete this photo? This cannot be undone.')) return
    startTransition(() => { action() })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      style={{
        background: 'rgba(220,50,50,0.12)',
        color: '#F87171',
        border: '1px solid rgba(220,50,50,0.22)',
        borderRadius: 4,
        padding: '0.3rem 0.75rem',
        fontSize: '0.72rem',
        cursor: pending ? 'not-allowed' : 'pointer',
        opacity: pending ? 0.5 : 1,
        transition: 'opacity 0.2s',
        fontWeight: 500,
      }}
    >
      {pending ? '…' : 'Delete'}
    </button>
  )
}
