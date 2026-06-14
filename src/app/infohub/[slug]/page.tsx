import type { Metadata } from 'next'
import { articles } from '@/lib/infohub'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import ContactSection from '@/components/public/ContactSection'
import RevealObserver from '@/components/public/RevealObserver'

export const revalidate = 3600

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return { title: 'Artikel niet gevonden' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/infohub/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `/infohub/${slug}`,
    },
  }
}

export default async function InfohubArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lang = 'nl' as const
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <>
      <Navbar lang={lang} />
      <main style={{ background: 'var(--bg)', paddingTop: 75 }}>
        <article style={{ maxWidth: 760, margin: '0 auto', padding: '5rem 1.5rem 4rem' }}>
          <Link href="/infohub" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white2)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontFamily: 'var(--font-archivo)' }}>
            ← Infohub
          </Link>
          <h1 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.2rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: 'var(--white)', marginBottom: '1rem' }}>
            {article.title}
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--teal)', fontWeight: 500, marginBottom: '2.5rem' }}>{article.excerpt}</p>
          {article.body.map((p, i) => (
            <p key={i} style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--white2)', fontWeight: 300, marginBottom: '1.25rem' }}>{p}</p>
          ))}
        </article>
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  )
}
