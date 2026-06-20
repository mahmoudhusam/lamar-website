import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import ReviewBadges from '@/components/public/ReviewBadges';
import WhatsAppSection from '@/components/public/WhatsAppSection';
import ProcessSection from '@/components/public/ProcessSection';
import BenefitsSection from '@/components/public/BenefitsSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import FAQSection from '@/components/public/FAQSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import RevealObserver from '@/components/public/RevealObserver';
import { t } from '@/lib/i18n';
import { getSiteText } from '@/lib/siteText';
// Hidden to mirror Kaya (kept in the codebase, still reachable via /projects + admin):
// import TickerSection from '@/components/public/TickerSection';
// import ServicesSection from '@/components/public/ServicesSection';
// import AboutSection from '@/components/public/AboutSection';
// import GallerySection from '@/components/public/GallerySection';

export const revalidate = 3600

export default async function Home() {
  const lang = 'nl' as const;
  const tx = await getSiteText();
  const faqItems = t.nl.faq.items.map((_, i) => ({
    q: tx(`home_faq_q${i + 1}`),
    a: tx(`home_faq_a${i + 1}`),
  }));
  return (
    <>
      <Navbar lang={lang} />
      <main>
        <HeroSection lang={lang} />
        <ReviewBadges />
        <WhatsAppSection
          lang={lang}
          heading={tx('home_whatsapp_heading')}
          headingAccent={tx('home_whatsapp_heading_accent')}
        />
        <ProcessSection lang={lang} />
        <BenefitsSection lang={lang} />
        <TestimonialsSection lang={lang} />
        <FAQSection lang={lang} heading={tx('home_faq_heading')} items={faqItems} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  );
}
