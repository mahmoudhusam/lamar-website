import { getContentMany } from '@/lib/content'
import { TEXT_GROUPS, TEXT_KEYS } from '@/lib/siteText'
import TextsForm from './TextsForm'

export const dynamic = 'force-dynamic'

export default async function TekstenPage() {
  const values = await getContentMany(TEXT_KEYS)

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Texts <span style={{ color: '#97A0AC', fontWeight: 400 }}>(Teksten)</span>
        </h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
          Edit the homepage text. Leave a field empty to use the default. Use “View on site” to see each section live.
        </p>
      </div>

      <TextsForm groups={TEXT_GROUPS} values={values} />
    </div>
  )
}
