import type { Metadata } from 'next'
import QuoteWizard from '@/components/public/QuoteWizard'

export const metadata: Metadata = {
  title: 'Offerte aanvragen | LAMAR Stukadoor en Onderhoud',
  description: 'Vraag eenvoudig en vrijblijvend een offerte aan bij LAMAR Stukadoor en Onderhoud — stucwerk, schilderwerk en renovatie.',
}

export default function OffertePage() {
  return <QuoteWizard />
}
