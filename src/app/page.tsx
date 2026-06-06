import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import TickerSection from '@/components/public/TickerSection';
import WhatsAppSection from '@/components/public/WhatsAppSection';
import ServicesSection from '@/components/public/ServicesSection';
import AboutSection from '@/components/public/AboutSection';
import ProcessSection from '@/components/public/ProcessSection';
import BenefitsSection from '@/components/public/BenefitsSection';
import GallerySection from '@/components/public/GallerySection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import RevealObserver from '@/components/public/RevealObserver';
export const revalidate = 3600

export default async function Home() {
  const lang = 'nl' as const;
  return (
    <>
      <Navbar lang={lang} />
      <main>
        <HeroSection lang={lang} />
        <TickerSection lang={lang} />
        <WhatsAppSection lang={lang} />
        <ServicesSection lang={lang} />
        <AboutSection lang={lang} />
        <ProcessSection lang={lang} />
        <BenefitsSection lang={lang} />
        <GallerySection lang={lang} />
        <TestimonialsSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  );
}
