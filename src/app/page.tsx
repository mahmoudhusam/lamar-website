import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import TickerSection from '@/components/public/TickerSection';
import ServicesSection from '@/components/public/ServicesSection';
import AboutSection from '@/components/public/AboutSection';
import ProcessSection from '@/components/public/ProcessSection';
import GallerySection from '@/components/public/GallerySection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import RevealObserver from '@/components/public/RevealObserver';
import { getLanguage } from '@/lib/content';

export default async function Home() {
  const lang = await getLanguage();
  return (
    <>
      <Navbar lang={lang} />
      <main>
        <HeroSection lang={lang} />
        <TickerSection lang={lang} />
        <ServicesSection lang={lang} />
        <AboutSection lang={lang} />
        <ProcessSection lang={lang} />
        <GallerySection lang={lang} />
        <TestimonialsSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  );
}
