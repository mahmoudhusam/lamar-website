import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import WhatsAppSection from '@/components/public/WhatsAppSection';
import ProcessSection from '@/components/public/ProcessSection';
import BenefitsSection from '@/components/public/BenefitsSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import FAQSection from '@/components/public/FAQSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import RevealObserver from '@/components/public/RevealObserver';
// Hidden to mirror Kaya (kept in the codebase, still reachable via /projects + admin):
// import TickerSection from '@/components/public/TickerSection';
// import ServicesSection from '@/components/public/ServicesSection';
// import AboutSection from '@/components/public/AboutSection';
// import GallerySection from '@/components/public/GallerySection';

export const revalidate = 3600

export default async function Home() {
  const lang = 'nl' as const;
  return (
    <>
      <Navbar lang={lang} />
      <main>
        <HeroSection lang={lang} />
        <WhatsAppSection lang={lang} />
        <ProcessSection lang={lang} />
        <BenefitsSection lang={lang} />
        <TestimonialsSection lang={lang} />
        <FAQSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  );
}
