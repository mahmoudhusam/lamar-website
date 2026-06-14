import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { t } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import ProjectGallery from './ProjectGallery'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await prisma.project
    .findUnique({ where: { slug, published: true }, select: { title: true, description: true, coverImageUrl: true } })
    .catch(() => null)

  if (!project) return { title: 'Project niet gevonden' }

  const description = project.description ?? `Bekijk het project "${project.title}" van LAMAR Stukadoor en Onderhoud.`
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description,
      type: 'article',
      url: `/projects/${slug}`,
      images: project.coverImageUrl ? [{ url: project.coverImageUrl }] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
  }).catch(() => [])
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lang = 'nl' as const
  const tr = t[lang].projectsPage

  const project = await prisma.project.findUnique({
    where: { slug, published: true },
    include: {
      images: { orderBy: { order: 'asc' } },
    },
  }).catch(() => null)

  if (!project) notFound()

  return (
    <>
      <Navbar lang={lang} />
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 75 }}>
        {/* Header */}
        <section className="projects-header" style={{ padding: '5rem 3.5rem 3rem', background: 'var(--bg)' }}>
          <Link
            href="/projects"
            style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white2)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', fontFamily: 'var(--font-archivo)' }}
          >
            {tr.allProjects}
          </Link>
          <div style={{ fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--teal2)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'block', width: '1.5rem', height: 1, background: 'var(--teal2)', flexShrink: 0 }} />
            {tr.tag}
          </div>
          <h1 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: 'var(--white)', marginBottom: project.description ? '1.5rem' : 0 }}>
            {project.title}
          </h1>
          {project.description && (
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--white2)', fontWeight: 300, maxWidth: 620 }}>
              {project.description}
            </p>
          )}
        </section>

        {/* Gallery */}
        <section className="projects-grid" style={{ padding: '0 3.5rem 8rem' }}>
          <ProjectGallery images={project.images} />
        </section>
      </main>
      <Footer lang={lang} />
    </>
  )
}
