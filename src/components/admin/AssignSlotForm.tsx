'use client'
import { useState, useTransition } from 'react'

const SLOT_LABELS = [
  { letter: 'A', role: 'Wide Feature' },
  { letter: 'B', role: 'Top Middle' },
  { letter: 'C', role: 'Tall Right' },
  { letter: 'D', role: 'Mid Left' },
  { letter: 'E', role: 'Mid Right' },
  { letter: 'F', role: 'Bottom Left' },
  { letter: 'G', role: 'Bottom Right' },
]

type SlotAction = (slot: number, formData: FormData) => Promise<void>

export default function AssignSlotForm({
  currentSlot,
  action,
}: {
  currentSlot: number
  action: SlotAction
}) {
  const [selected, setSelected] = useState<number>(currentSlot >= 0 ? currentSlot : -1)
  const [isPending, startTransition] = useTransition()

  function handleAssign() {
    if (selected < 0 || selected > 6) return
    startTransition(async () => {
      await action(selected, new FormData())
    })
  }

  return (
    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
      <select
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        style={{
          background: '#0C0C0A',
          border: '1px solid #2A2A28',
          borderRadius: 4,
          color: selected >= 0 ? '#F2EEE6' : '#4A4A48',
          padding: '0.3rem 0.5rem',
          fontSize: '0.75rem',
          flex: 1,
          outline: 'none',
          fontFamily: 'inherit',
        }}
      >
        <option value={-1}>— Pick a slot —</option>
        {SLOT_LABELS.map((s, i) => (
          <option key={i} value={i}>
            Slot {s.letter} · {s.role}
          </option>
        ))}
      </select>
      <button
        onClick={handleAssign}
        disabled={isPending || selected < 0}
        style={{
          background: '#2ABFA8',
          color: '#0C0C0A',
          border: 'none',
          borderRadius: 4,
          padding: '0.3rem 0.75rem',
          fontSize: '0.72rem',
          fontWeight: 700,
          cursor: isPending || selected < 0 ? 'not-allowed' : 'pointer',
          opacity: isPending || selected < 0 ? 0.5 : 1,
          whiteSpace: 'nowrap',
        }}
      >
        {isPending ? '…' : 'Assign'}
      </button>
    </div>
  )
}
