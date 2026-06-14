import { prisma } from '@/lib/prisma'
import { t } from '@/lib/i18n'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import Link from 'next/link'

export const revalidate = 3600

export const metadata = {
  title: 'Projecten',
  description: 'Een selectie van afgeronde stukadoors-, afwerkings- en renovatieprojecten van LAMAR door heel Nederland.',
  alternates: { canonical: '/projects' },
}

export default async function ProjectsPage() {
  const lang = 'nl' as const
  const tr = t[lang].projectsPage

  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    include: {
      images: {
        orderBy: { order: 'asc' },
        take: 1,
      },
      _count: { select: { images: true } },
    },
  }).catch(() => [])

  return (
    <>
      <Navbar lang={lang} />
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 75 }}>
        {/* Header */}
        <section className="projects-header" style={{ padding: '6rem 3.5rem 4rem', background: 'var(--bg)' }}>
          <Link
            href="/"
            style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white2)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', fontFamily: 'var(--font-archivo)' }}
          >
            {tr.backToHome}
          </Link>
          <div style={{ fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--teal2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'block', width: '1.5rem', height: 1, background: 'var(--teal2)', flexShrink: 0 }} />
            {tr.tag}
          </div>
          <h1 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: 'var(--white)' }}>
            {tr.heading} <span style={{ color: 'var(--teal2)' }}>{tr.headingTeal}</span>
          </h1>
        </section>

        {/* Grid */}
        <section className="projects-grid" style={{ padding: '2rem 3.5rem 8rem', background: 'var(--bg)' }}>
          {projects.length === 0 ? (
            <p style={{ color: 'var(--white2)', fontSize: '0.95rem' }}>{tr.empty}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {projects.map((project) => {
                const cover = project.coverImageUrl ?? project.images[0]?.url ?? null
                const count = project._count.images
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    style={{ textDecoration: 'none', display: 'block', borderRadius: 4, overflow: 'hidden', background: 'var(--bg3)', border: '1px solid var(--border)', transition: 'border-color 0.2s, transform 0.2s' }}
                    className="project-card"
                  >
                    {/* Cover image */}
                    <div style={{ aspectRatio: '16/10', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                          className="project-cover-img"
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--teal) 0%, var(--bg2) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: 'rgba(242,238,230,0.3)', fontSize: '2rem' }}>📷</span>
                        </div>
                      )}
                      {count > 0 && (
                        <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(12,12,10,0.75)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.65rem', borderRadius: 3, fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--white2)', fontFamily: 'var(--font-archivo)' }}>
                          {count} {tr.images}
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div style={{ padding: '1.5rem' }}>
                      <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--white)', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                        {project.title}
                      </h2>
                      {project.description && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--white2)', lineHeight: 1.65, fontWeight: 300, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {project.description}
                        </p>
                      )}
                      <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal2)', fontFamily: 'var(--font-archivo)', fontWeight: 500 }}>
                        {tr.viewProject} →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>
      <Footer lang={lang} />
    </>
  )
}
