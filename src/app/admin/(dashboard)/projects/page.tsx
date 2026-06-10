import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { togglePublished, moveProject } from './actions'
import DeleteProjectButton from './DeleteProjectButton'

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { images: true } } },
  }).catch(() => [])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Projects</h1>
          <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/projects/new"
          style={{ background: '#1A6B60', color: '#FFFFFF', padding: '0.6rem 1.5rem', borderRadius: 6, textDecoration: 'none', fontSize: '0.83rem', fontWeight: 700 }}
        >
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div style={{ background: '#FFFFFF', border: '1px dashed rgba(20,24,29,0.10)', borderRadius: 8, padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: '#97A0AC', marginBottom: '1rem' }}>No projects yet.</p>
          <Link href="/admin/projects/new" style={{ color: '#1A6B60', fontSize: '0.85rem' }}>Create your first project →</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 8, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              {/* Order buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
                <form action={moveProject.bind(null, project.id, 'up')}>
                  <button type="submit" disabled={index === 0} style={{ background: 'transparent', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 3, color: '#5B6470', width: 24, height: 20, cursor: 'pointer', fontSize: '0.6rem', opacity: index === 0 ? 0.3 : 1 }}>▲</button>
                </form>
                <form action={moveProject.bind(null, project.id, 'down')}>
                  <button type="submit" disabled={index === projects.length - 1} style={{ background: 'transparent', border: '1px solid rgba(20,24,29,0.10)', borderRadius: 3, color: '#5B6470', width: 24, height: 20, cursor: 'pointer', fontSize: '0.6rem', opacity: index === projects.length - 1 ? 0.3 : 1 }}>▼</button>
                </form>
              </div>

              {/* Cover thumbnail */}
              <div style={{ width: 64, height: 44, borderRadius: 3, overflow: 'hidden', background: '#F2F5F8', flexShrink: 0 }}>
                {project.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.coverImageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B6BEC8', fontSize: '1.2rem' }}>📷</div>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#14181D', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.title}</div>
                <div style={{ color: '#97A0AC', fontSize: '0.75rem' }}>/projects/{project.slug} · {project._count.images} image{project._count.images !== 1 ? 's' : ''}</div>
              </div>

              {/* Published toggle */}
              <form action={togglePublished.bind(null, project.id, !project.published)}>
                <button type="submit" style={{ background: project.published ? 'rgba(42,191,168,0.12)' : '#F2F5F8', border: `1px solid ${project.published ? 'rgba(42,191,168,0.3)' : 'rgba(20,24,29,0.10)'}`, color: project.published ? '#1A6B60' : '#5B6470', borderRadius: 4, padding: '0.25rem 0.75rem', fontSize: '0.68rem', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                  {project.published ? '● Published' : '○ Draft'}
                </button>
              </form>

              {/* Edit link */}
              <Link
                href={`/admin/projects/${project.id}`}
                style={{ background: '#F2F5F8', color: '#14181D', padding: '0.4rem 1rem', borderRadius: 4, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0, border: '1px solid rgba(20,24,29,0.10)' }}
              >
                Edit
              </Link>

              {/* Delete */}
              <DeleteProjectButton id={project.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
