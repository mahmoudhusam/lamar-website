import { getContentMany } from '@/lib/content'
import OfferteForm from './OfferteForm'

export default async function AdminOffertePage() {
  const c = await getContentMany(['whatsapp_number', 'offerte_intro'])
  const defaults = {
    whatsapp_number: c['whatsapp_number'] || '31684054528',
    offerte_intro: c['offerte_intro'] ?? '',
  }
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Quote</h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>WhatsApp number &amp; intro for the offerte page. Edits appear instantly.</p>
      </div>
      <OfferteForm defaults={defaults} />
    </div>
  )
}
