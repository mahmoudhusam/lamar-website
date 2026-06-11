import type { Metadata } from 'next'
import { getContentMany } from '@/lib/content'
import QuoteWizard from '@/components/public/QuoteWizard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Offerte aanvragen | LAMAR Stukadoor en Onderhoud',
  description: 'Vraag eenvoudig en vrijblijvend een offerte aan bij LAMAR Stukadoor en Onderhoud — stucwerk, schilderwerk en renovatie.',
}

export default async function OffertePage() {
  const c = await getContentMany(['whatsapp_number', 'offerte_intro'])
  return (
    <QuoteWizard
      whatsappNumber={c['whatsapp_number'] || '31684054528'}
      introText={c['offerte_intro'] || ''}
    />
  )
}
