import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import ContactSection from '@/components/public/ContactSection'
import RevealObserver from '@/components/public/RevealObserver'

export const revalidate = 3600

export default function ContactPage() {
  const lang = 'nl' as const
  return (
    <>
      <Navbar lang={lang} />
      <main style={{ paddingTop: 75 }}>
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  )
}
