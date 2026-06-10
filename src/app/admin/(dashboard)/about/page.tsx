import { getContent } from '@/lib/content'
import AboutForm from './AboutForm'

const FALLBACK = `With over a decade of hands-on experience across the Netherlands and beyond, we bring precision and creative vision to every project. Whether a full home transformation or detailed gypsum decoration, our team treats every space as if it were their own.

We specialise in gypsum work, interior decoration, painting, and complete house restoration — delivering results that exceed expectations, on time and on budget.`

export default async function AboutPage() {
  const currentText = await getContent('about_text', FALLBACK)

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
