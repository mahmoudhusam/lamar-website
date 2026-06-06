export type Lang = 'en' | 'nl'

type ServiceItems = Record<string, { name: string; fallback: string }>

interface Translations {
  nav: { about: string; services: string; ourWork: string; projects: string; contact: string; reviews: string; contactUs: string }
  hero: { tag: string; h1a: string; h1b: string; h1c: string; desc: string; seeWork: string; getQuote: string; statProjects: string; statYears: string; statSatisfaction: string; badge: string; trustBadge: string; headlineA: string; headlineB: string; sub: string; quoteCta: string; processCta: string; whatsappCta: string }
  ticker: Array<{ label: string; accent: boolean }>
  services: { tag: string; heading: string; headingTeal: string; learnMore: string; items: ServiceItems }
  about: { tag: string; heading: string; headingPre: string; headingTeal: string; quals: string[]; yearsLabel: string[]; projectsLabel: string[] }
  process: { tag: string; heading: string; headingTeal: string; steps: Array<{ num: string; title: string; desc: string }> }
  gallery: { tag: string; heading: string; viewAll: string; specialtyLabel: string; specialtyText: string; ctaLabel: string }
  projectsPage: {
    tag: string
    heading: string
    headingTeal: string
    empty: string
    backToHome: string
    viewProject: string
    images: string
    allProjects: string
  }
  testimonials: { tag: string; heading: string; headingTeal: string }
  contact: { tag: string; h1: string; h2: string; h3: string; labels: Record<string, string> }
  contactForm: { nameLbl: string; namePh: string; phoneLbl: string; phonePh: string; emailLbl: string; emailPh: string; serviceLbl: string; servicePh: string; messageLbl: string; messagePh: string; send: string; sending: string; successTitle: string; successMsg: string }
  footer: { links: Array<{ label: string; href: string }>; pagesLabel: string; copy: string }
  chat: {
    tag: string
    heading: string
    headingTeal: string
    sub: string
    cta: string
    senderName: string
    bubbles: Array<{ variant: 'note' | 'msg'; side: 'left' | 'right'; icon?: 'doc' | 'wa' | 'cal'; title?: string; text: string }>
  }
}

export const t: Record<Lang, Translations> = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      ourWork: 'Our Work',
      projects: 'Projects',
      contact: 'Contact',
      reviews: 'Reviews',
      contactUs: 'Contact Us',
    },
    hero: {
      tag: 'Renovation & Decoration Specialists',
      h1a: 'We Build',
      h1b: 'Spaces',
      h1c: 'That Last.',
      desc: 'Gypsum work, interior decoration, painting, and full house restoration — delivered with craftsmanship that speaks for itself.',
      seeWork: 'See Our Work',
      getQuote: 'Get a Quote',
      statProjects: 'Projects Done',
      statYears: 'Years Active',
      statSatisfaction: 'Satisfaction',
      badge: 'Premium Renovation Work',
      trustBadge:  'Over 200 projects completed across the Netherlands',
      headlineA:   'Flawless plastering.',
      headlineB:   'Clear agreements.',
      sub:         'With every quote you know exactly where you stand — price, planning and approach, all clearly on the table.',
      quoteCta:    'Request a quote',
      processCta:  'Our process',
      whatsappCta: 'Urgent job? Contact us directly on WhatsApp',
    },
    ticker: [
      { label: 'Gypsum Work',        accent: true  },
      { label: 'Interior Decoration', accent: false },
      { label: 'Painting',            accent: true  },
      { label: 'House Restoration',   accent: false },
      { label: 'Ceiling Plaster',     accent: true  },
      { label: 'Wall Finishing',      accent: false },
      { label: 'Full Renovation',     accent: true  },
      { label: 'Quality Guaranteed',  accent: false },
    ],
    services: {
      tag: 'What We Do',
      heading: 'Our',
      headingTeal: 'Services',
      learnMore: 'Learn More →',
      items: {
        service_gypsum:      { name: 'Gypsum Work',        fallback: 'Precision gypsum plastering for walls and ceilings — smooth finishes, decorative mouldings, and ornate ceiling details crafted to perfection.' },
        service_decoration:  { name: 'Interior Decoration', fallback: 'Bespoke interior styling that transforms spaces — from material selection and colour consulting to the final decorative details that make a home feel complete.' },
        service_painting:    { name: 'Painting',            fallback: 'Professional wall and ceiling painting with premium materials — clean preparation, flawless application, and long-lasting results for every surface type.' },
        service_restoration: { name: 'House Restoration',   fallback: 'Full residential restoration from structural repairs to cosmetic finishing — breathing new life into older properties while preserving their character.' },
      },
    },
    about: {
      tag: 'About LAMAR',
      heading: "We Don't Just Renovate.",
      headingPre: 'We',
      headingTeal: 'Transform.',
      quals: ['Gypsum & Plaster', 'Interior Decoration', 'Painting & Finishing', 'House Restoration', 'On-Time Delivery', 'Quality Guaranteed'],
      yearsLabel: ['Years of', 'Experience'],
      projectsLabel: ['Projects', 'Completed'],
    },
    process: {
      tag: 'Our Approach',
      heading: 'How We',
      headingTeal: 'Work',
      steps: [
        { num: '01', title: 'Free Consultation', desc: 'We visit your space, listen to your vision, and assess exactly what needs to be done — no obligation, no pressure.' },
        { num: '02', title: 'Clear Quote',        desc: 'You receive a detailed, transparent quote within 48 hours. No hidden costs, no surprises — just an honest breakdown of the work.' },
        { num: '03', title: 'We Get to Work',     desc: 'Our team arrives on schedule, works cleanly and efficiently, and keeps you informed throughout every stage of the project.' },
        { num: '04', title: 'Final Handover',     desc: "We do a walkthrough together, make sure everything meets your expectations, and only leave when you're fully satisfied." },
      ],
    },
    gallery: {
      tag: 'Portfolio',
      heading: 'Our Work',
      viewAll: 'View All Projects →',
      specialtyLabel: 'Our Specialty',
      specialtyText: 'Precision Gypsum & Bespoke Decoration',
      ctaLabel: 'Ready to start your project?',
    },
    projectsPage: {
      tag: 'Our Portfolio',
      heading: 'Completed',
      headingTeal: 'Projects',
      empty: 'No projects yet. Check back soon.',
      backToHome: '← Back to Home',
      viewProject: 'View Project',
      images: 'photos',
      allProjects: '← All Projects',
    },
    testimonials: {
      tag: 'Client Reviews',
      heading: 'What Our',
      headingTeal: 'Clients Say',
    },
    contact: {
      tag: 'Get in Touch',
      h1: "LET'S BUILD",
      h2: 'SOMETHING',
      h3: 'GREAT.',
      labels: {
        contact_phone:    'Phone',
        contact_whatsapp: 'WhatsApp',
        contact_email:    'Email',
        contact_location: 'Location',
        contact_hours:    'Working Hours',
      },
    },
    contactForm: {
      nameLbl: 'Your Name',        namePh: 'Jan de Vries',
      phoneLbl: 'Phone Number',    phonePh: '+31 00 000 0000',
      emailLbl: 'Email Address',   emailPh: 'jan@example.com',
      serviceLbl: 'Service Needed', servicePh: 'Gypsum, Decoration, Painting…',
      messageLbl: 'Tell Us About Your Project', messagePh: 'Describe your space and what you have in mind…',
      send: 'Send Message', sending: 'Sending…',
      successTitle: 'Message Sent!',
      successMsg: "Thank you for reaching out. We'll be in touch within 24 hours.",
    },
    footer: {
      links: [
        { label: 'About',    href: '#about'    },
        { label: 'Services', href: '#services' },
        { label: 'Our Work', href: '#our-work' },
        { label: 'Projects', href: '/projects' },
        { label: 'Contact',  href: '#contact'  },
      ],
      pagesLabel: 'Pages',
      copy: '© 2025 LAMAR Renovation & Decoration. All rights reserved.',
    },
    chat: {
      tag: 'How it works',
      heading: 'All arranged via',
      headingTeal: 'WhatsApp',
      sub: 'No complicated forms or long waits. Send us a message, get a clear quote, and we schedule the job neatly.',
      cta: 'Start on WhatsApp',
      senderName: 'LAMAR Stukadoor',
      bubbles: [
        { variant: 'note', side: 'left',  icon: 'doc', title: 'Quote request',    text: 'Your quote, straight in the app' },
        { variant: 'msg',  side: 'left',                                           text: 'Here is your quote, attached 📎' },
        { variant: 'msg',  side: 'left',                                           text: 'Quote 2026-142' },
        { variant: 'note', side: 'left',  icon: 'cal', title: 'Planning',         text: 'Which date suits you?' },
        { variant: 'msg',  side: 'left',                                           text: 'December 12th is booked! ✅' },
        { variant: 'note', side: 'right', icon: 'wa',  title: 'WhatsApp contact', text: 'Updates, planning and questions?' },
        { variant: 'msg',  side: 'right',                                          text: "We're on our way! 🚐" },
        { variant: 'msg',  side: 'right',                                          text: 'You can come by for the handover 🔑' },
      ],
    },
  },

  nl: {
    nav: {
      about: 'Over ons',
      services: 'Diensten',
      ourWork: 'Ons werk',
      projects: 'Projecten',
      contact: 'Contact',
      reviews: 'Reviews',
      contactUs: 'Neem contact op',
    },
    hero: {
      tag: 'Renovatie & Decoratie Specialisten',
      h1a: 'Wij bouwen',
      h1b: 'ruimtes',
      h1c: 'die blijven.',
      desc: 'Gipswerk, interieurafwerking, schilderwerk en volledige woningrenovatie — geleverd met vakmanschap dat voor zich spreekt.',
      seeWork: 'Bekijk ons werk',
      getQuote: 'Offerte aanvragen',
      statProjects: 'Projecten',
      statYears: 'Jaar actief',
      statSatisfaction: 'Tevredenheid',
      badge: 'Vakkundig renovatiewerk',
      trustBadge:  'Meer dan 200 projecten voltooid in Nederland',
      headlineA:   'Strak stucwerk.',
      headlineB:   'Heldere afspraken.',
      sub:         'Bij elke offerte weet u precies waar u aan toe bent — prijs, planning en aanpak, allemaal helder op tafel.',
      quoteCta:    'Offerte aanvragen',
      processCta:  'Onze werkwijze',
      whatsappCta: 'Spoedklus? Direct contact via WhatsApp',
    },
    ticker: [
      { label: 'Gipswerk',               accent: true  },
      { label: 'Interieurafwerking',      accent: false },
      { label: 'Schilderwerk',            accent: true  },
      { label: 'Woningrenovatie',         accent: false },
      { label: 'Plafondstucwerk',         accent: true  },
      { label: 'Muurafwerking',           accent: false },
      { label: 'Volledige renovatie',     accent: true  },
      { label: 'Kwaliteit gegarandeerd',  accent: false },
    ],
    services: {
      tag: 'Wat wij doen',
      heading: 'Onze',
      headingTeal: 'Diensten',
      learnMore: 'Meer info →',
      items: {
        service_gypsum:      { name: 'Gipswerk',           fallback: 'Vakkundig gipswerk voor wanden en plafonds — strakke afwerkingen, decoratieve lijsten en sierlijke plafonddetails die met precisie worden aangebracht.' },
        service_decoration:  { name: 'Interieurafwerking', fallback: 'Maatwerk interieurafwerking die uw ruimte transformeert — van materiaalkeuze en kleuradvies tot de afwerkingsdetails die een huis echt een thuis maken.' },
        service_painting:    { name: 'Schilderwerk',       fallback: 'Professioneel schilderwerk voor wanden en plafonds met kwalitatieve materialen — degelijke voorbereiding, strakke uitvoering en een eindresultaat dat jarenlang meegaat.' },
        service_restoration: { name: 'Woningrenovatie',    fallback: 'Volledige woningrenovatie van constructief herstel tot cosmetische afwerking — wij blazen nieuw leven in uw woning met behoud van het karakter van het pand.' },
      },
    },
    about: {
      tag: 'Over LAMAR',
      heading: 'Wij renoveren niet alleen.',
      headingPre: 'Wij',
      headingTeal: 'Transformeren.',
      quals: ['Gips & stucwerk', 'Interieurafwerking', 'Schilderwerk & afwerking', 'Woningrenovatie', 'Op tijd geleverd', 'Kwaliteit gegarandeerd'],
      yearsLabel: ['Jaar', 'Ervaring'],
      projectsLabel: ['Projecten', 'Voltooid'],
    },
    process: {
      tag: 'Onze aanpak',
      heading: 'Hoe wij',
      headingTeal: 'Werken',
      steps: [
        { num: '01', title: 'Gratis kennismaking', desc: 'We komen langs, luisteren naar uw wensen en kijken samen wat er nodig is — geheel vrijblijvend en zonder verplichtingen.' },
        { num: '02', title: 'Duidelijke offerte',  desc: 'Binnen 48 uur ontvangt u een heldere, gedetailleerde offerte. Geen verborgen kosten, geen verrassingen — gewoon een eerlijk overzicht van het werk.' },
        { num: '03', title: 'Aan de slag',         desc: 'Ons team werkt op de afgesproken tijd, ruimt netjes op na elk werkdag en houdt u tijdens het hele project goed op de hoogte.' },
        { num: '04', title: 'Oplevering',          desc: 'We lopen samen het werk na, zorgen dat alles naar wens is, en vertrekken pas als u volledig tevreden bent met het resultaat.' },
      ],
    },
    gallery: {
      tag: 'Portfolio',
      heading: 'Ons werk',
      viewAll: 'Alle projecten bekijken →',
      specialtyLabel: 'Onze specialiteit',
      specialtyText: 'Nauwkeurig gipswerk & maatwerkdecoratie',
      ctaLabel: 'Klaar om uw project te starten?',
    },
    projectsPage: {
      tag: 'Ons portfolio',
      heading: 'Voltooide',
      headingTeal: 'Projecten',
      empty: 'Nog geen projecten. Kom snel terug.',
      backToHome: '← Terug naar home',
      viewProject: 'Bekijk project',
      images: "foto's",
      allProjects: '← Alle projecten',
    },
    testimonials: {
      tag: 'Klantbeoordelingen',
      heading: 'Wat onze',
      headingTeal: 'Klanten zeggen',
    },
    contact: {
      tag: 'Neem contact op',
      h1: 'LATEN WE',
      h2: 'SAMEN IETS',
      h3: 'MOOIS BOUWEN.',
      labels: {
        contact_phone:    'Telefoon',
        contact_whatsapp: 'WhatsApp',
        contact_email:    'E-mail',
        contact_location: 'Locatie',
        contact_hours:    'Werktijden',
      },
    },
    contactForm: {
      nameLbl: 'Uw naam',            namePh: 'Jan de Vries',
      phoneLbl: 'Telefoonnummer',    phonePh: '+31 00 000 0000',
      emailLbl: 'E-mailadres',       emailPh: 'jan@voorbeeld.nl',
      serviceLbl: 'Gewenste dienst', servicePh: 'Gipswerk, decoratie, schilderwerk…',
      messageLbl: 'Vertel ons over uw project', messagePh: 'Beschrijf uw ruimte en wat u in gedachten heeft…',
      send: 'Bericht versturen', sending: 'Versturen…',
      successTitle: 'Bericht verzonden!',
      successMsg: 'Bedankt voor uw bericht. We nemen binnen 24 uur contact met u op.',
    },
    footer: {
      links: [
        { label: 'Over ons',  href: '#about'    },
        { label: 'Diensten',  href: '#services' },
        { label: 'Ons werk',  href: '#our-work' },
        { label: 'Projecten', href: '/projects' },
        { label: 'Contact',   href: '#contact'  },
      ],
      pagesLabel: "Pagina's",
      copy: '© 2025 LAMAR Stukadoor en Onderhoud. Alle rechten voorbehouden.',
    },
    chat: {
      tag: 'Zo werkt het',
      heading: 'Alles geregeld via',
      headingTeal: 'WhatsApp',
      sub: 'Geen ingewikkelde formulieren of lang wachten. Stuur ons een bericht, ontvang een heldere offerte en wij plannen de klus netjes in.',
      cta: 'Start via WhatsApp',
      senderName: 'LAMAR Stukadoor',
      bubbles: [
        { variant: 'note', side: 'left',  icon: 'doc', title: 'Offerte aanvraag',  text: 'Uw offerte, direct in de app' },
        { variant: 'msg',  side: 'left',                                            text: 'Hierbij stuur ik u de offerte in de bijlage 📎' },
        { variant: 'msg',  side: 'left',                                            text: 'Offerte 2026-142' },
        { variant: 'note', side: 'left',  icon: 'cal', title: 'Planning',          text: 'Welke datum komt u uit?' },
        { variant: 'msg',  side: 'left',                                            text: '12 december staat genoteerd! ✅' },
        { variant: 'note', side: 'right', icon: 'wa',  title: 'WhatsApp contact',  text: 'Updates, planning en vragen?' },
        { variant: 'msg',  side: 'right',                                           text: 'We zijn onderweg! 🚐' },
        { variant: 'msg',  side: 'right',                                           text: 'U kunt langs komen voor de oplevering 🔑' },
      ],
    },
  },
}
