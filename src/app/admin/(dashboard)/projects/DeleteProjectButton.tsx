'use client'

import { deleteProject } from './actions'

export default function DeleteProjectButton({ id }: { id: string }) {
  return (
    <form action={deleteProject.bind(null, id)}>
      <button
        type="submit"
        onClick={(e) => { if (!confirm('Delete this project and all its images?')) e.preventDefault() }}
        style={{ background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.2)', color: '#F87171', borderRadius: 4, padding: '0.4rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}
      >
        Delete
      </button>
    </form>
  )
}
