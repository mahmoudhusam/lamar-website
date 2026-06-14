import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProjectEditForm from './ProjectEditForm'
import ProjectImageManager from './ProjectImageManager'
import { saveProject, uploadProjectImage, deleteProjectImage, setCoverImage } from '../actions'

export default async function ProjectEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } } },
  }).catch(() => null)

  if (!project) notFound()

  const boundSave = saveProject.bind(null, project.id)
  const boundUpload = uploadProjectImage.bind(null, project.id)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/projects" style={{ color: '#97A0AC', textDecoration: 'none', fontSize: '0.82rem' }}>← Projects</Link>
        <span style={{ color: 'rgba(20,24,29,0.10)' }}>/</span>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.title}</h1>
        <a
          href={`/projects/${project.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.72rem', color: '#1A6B60', textDecoration: 'none', letterSpacing: '0.08em', border: '1px solid rgba(42,191,168,0.3)', padding: '0.35rem 0.85rem', borderRadius: 4 }}
        >
          Preview ↗
        </a>
      </div>

      {/* Metadata form */}
      <section style={{ marginBottom: '2.5rem' }}>
        <p style={{ color: '#5B6470', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Project Details</p>
        <ProjectEditForm
          defaultTitle={project.title}
          defaultSlug={project.slug}
          defaultDescription={project.description ?? ''}
          defaultBentoSlot={project.bentoSlot}
          action={boundSave}
        />
      </section>

      {/* Image manager */}
      <section>
        <p style={{ color: '#5B6470', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Images ({project.images.length})</p>
        <ProjectImageManager
          images={project.images}
          coverImageUrl={project.coverImageUrl}
          projectId={project.id}
          uploadAction={boundUpload}
          deleteAction={deleteProjectImage}
          setCoverAction={setCoverImage}
        />
      </section>
    </div>
  )
}
