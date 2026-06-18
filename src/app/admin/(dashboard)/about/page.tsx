import { getContent, ABOUT_FALLBACK } from '@/lib/content'
import AboutForm from './AboutForm'

export default async function AboutPage() {
  const currentText = await getContent('about_text', ABOUT_FALLBACK)

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          About
        </h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
          Edits appear instantly on the public site.
        </p>
      </div>
      <AboutForm defaultValue={currentText} />
    </div>
  )
}
