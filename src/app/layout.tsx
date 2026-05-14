import type { Metadata } from 'next'
import { Archivo, Outfit } from 'next/font/google'
import { getLanguage } from '@/lib/content'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-archivo',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'LAMAR Stukadoor en Onderhoud | Gipswerk, Decoratie & Renovatie',
  description: 'Professioneel stukadoorswerk, interieurafwerking, schilderwerk en woningrenovatie door LAMAR. Meer dan 200 projecten voltooid in Nederland. Kwaliteit die spreekt voor zich.',
  keywords: 'stukadoor, gipswerk, interieurafwerking, schilderwerk, woningrenovatie, decoratie, Nederland, LAMAR',
  openGraph: {
    title: 'LAMAR Stukadoor en Onderhoud',
    description: 'Professioneel stukadoorswerk, interieurafwerking en woningrenovatie in Nederland.',
    type: 'website',
    locale: 'nl_NL',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLanguage()
  return (
    <html lang={lang} className={`${archivo.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  )
}
