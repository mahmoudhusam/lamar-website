import { getContentMany } from '@/lib/content'
import WerkwijzeForm from './WerkwijzeForm'

const KEYS = [
  'werkwijze_heading', 'werkwijze_sub', 'werkwijze_banner',
  'werkwijze_step1_title', 'werkwijze_step1_text',
  'werkwijze_step2_title', 'werkwijze_step2_text',
  'werkwijze_step3_title', 'werkwijze_step3_text',
  'werkwijze_step4_title', 'werkwijze_step4_text',
]

const FALLBACKS: Record<string, string> = {
  werkwijze_heading: 'Zo pakken wij het aan',
  werkwijze_sub: 'Helder, eerlijk en zonder omwegen.',
  werkwijze_banner: 'VISIE, PRECISIE & VAKMANSCHAP',
  werkwijze_step1_title: 'Inventarisatie',
  werkwijze_step1_text: "U deelt uw foto's, wensen en afmetingen. Snel en eenvoudig.",
  werkwijze_step2_title: 'Advies',
  werkwijze_step2_text: 'Wij stellen een passend plan op met een heldere, vaste prijs.',
  werkwijze_step3_title: 'Planning',
  werkwijze_step3_text: 'Na akkoord leggen wij alles vast en plannen we samen de startdatum.',
  werkwijze_step4_title: 'Uitvoering',
  werkwijze_step4_text: 'Wij voeren het stuc- en schilderwerk vakkundig uit en leveren netjes op.',
}

export default async function AdminWerkwijzePage() {
  const c = await getContentMany(KEYS)
  const defaults = Object.fromEntries(KEYS.map((k) => [k, c[k] || FALLBACKS[k]]))
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Process</h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>Heading, steps and banner for the public Werkwijze page. Edits appear instantly.</p>
      </div>
      <WerkwijzeForm defaults={defaults} />
    </div>
  )
}
