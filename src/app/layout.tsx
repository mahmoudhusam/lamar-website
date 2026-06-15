import type { Metadata, Viewport } from 'next'
import { Archivo, Outfit } from 'next/font/google'
import './globals.css'
import FloatingWhatsApp from '@/components/public/FloatingWhatsApp'
import { getContent } from '@/lib/content'
import { getTheme } from '@/lib/themeServer'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from '@/lib/site'

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

export const revalidate = 3600

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  icons: {
    icon: '/lamar_icon.svg',
    shortcut: '/lamar_icon.svg',
  },
  title: {
    default: 'LAMAR Stukadoor en Onderhoud | Gipswerk, Decoratie & Renovatie',
    template: '%s | LAMAR Stukadoor en Onderhoud',
  },
  description: SITE_DESCRIPTION,
  keywords: 'stukadoor, gipswerk, interieurafwerking, schilderwerk, woningrenovatie, decoratie, Nederland, LAMAR',
  openGraph: {
    title: SITE_NAME,
    description: 'Professioneel stukadoorswerk, interieurafwerking en woningrenovatie in Nederland.',
    type: 'website',
    locale: 'nl_NL',
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Professioneel stukadoorswerk, interieurafwerking en woningrenovatie in Nederland.',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const wa = await getContent('whatsapp_number', '31684054528')
  const theme = await getTheme()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': absoluteUrl('/#business'),
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl('/opengraph-image'),
    telephone: `+${wa}`,
    areaServed: { '@type': 'Country', name: 'Netherlands' },
    address: { '@type': 'PostalAddress', addressCountry: 'NL' },
    knowsAbout: ['Stucwerk', 'Gipswerk', 'Interieurafwerking', 'Schilderwerk', 'Woningrenovatie'],
  }

  return (
    <html
      lang="nl"
      className={`${archivo.variable} ${outfit.variable}`}
      data-scroll-behavior="smooth"
      style={{ '--teal': theme.primary, '--teal2': theme.accent } as React.CSSProperties}
    >
      <body>
        {children}
        <FloatingWhatsApp number={wa} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
