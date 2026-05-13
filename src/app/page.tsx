import Navbar from '@/components/public/Navbar'
import HeroSection from '@/components/public/HeroSection'
import TickerSection from '@/components/public/TickerSection'
import ServicesSection from '@/components/public/ServicesSection'
import AboutSection from '@/components/public/AboutSection'
import ProcessSection from '@/components/public/ProcessSection'
import GallerySection from '@/components/public/GallerySection'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import ContactSection from '@/components/public/ContactSection'
import Footer from '@/components/public/Footer'
import RevealObserver from '@/components/public/RevealObserver'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TickerSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <RevealObserver />
    </>
  )
}
