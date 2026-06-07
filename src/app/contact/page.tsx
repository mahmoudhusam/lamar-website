import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import ContactSection from '@/components/public/ContactSection'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import RevealObserver from '@/components/public/RevealObserver'

export const revalidate = 3600

export default function ContactPage() {
  const lang = 'nl' as const
  return (
    <>
      <Navbar lang={lang} />
      <main style={{ paddingTop: 75 }}>
        <ContactSection
          lang={lang}
          quote="Ik kan LAMAR alleen maar aanraden — prettige, laagdrempelige communicatie van begin tot eind."
        />
        <TestimonialsSection
          lang={lang}
          headingA="Dit vinden klanten van ons"
          headingAccent="contact"
          headingB="over heel Nederland"
          sub="Wij doen meer dan muren afwerken — wij bouwen vertrouwen. Dat hoort u terug bij onze klanten door heel Nederland."
        />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  )
}
