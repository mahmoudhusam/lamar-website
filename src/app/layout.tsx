import type { Metadata } from 'next'
import { Archivo, Outfit } from 'next/font/google'
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
  title: 'LAMAR Stukadoor en Onderhoud',
  description:
    'Professioneel stukadoorswerk, interieurafwerking, schilderwerk en woningrenovatie door LAMAR. Kwaliteit die spreekt voor zich.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${archivo.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  )
}
