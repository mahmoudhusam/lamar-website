export type Lang = 'en' | 'nl'

type ServiceItems = Record<string, { name: string; fallback: string }>

interface Translations {
  nav: { about: string; services: string; ourWork: string; contact: string; reviews: string; contactUs: string }
  hero: { tag: string; h1a: string; h1b: string; h1c: string; desc: string; seeWork: string; getQuote: string; statProjects: string; statYears: string; statSatisfaction: string; badge: string }
  ticker: Array<{ label: string; accent: boolean }>
  services: { tag: string; heading: string; headingTeal: string; learnMore: string; items: ServiceItems }
  about: { tag: string; heading: string; headingPre: string; headingTeal: string; quals: string[]; yearsLabel: string[]; projectsLabel: string[] }
  process: { tag: string; heading: string; headingTeal: string; steps: Array<{ num: string; title: string; desc: string }> }
  gallery: { tag: string; heading: string; viewAll: string; specialtyLabel: string; specialtyText: string; ctaLabel: string }
  testimonials: { tag: string; heading: string; headingTeal: string }
  contact: { tag: string; h1: string; h2: string; h3: string; labels: Record<string, string> }
  contactForm: { nameLbl: string; namePh: string; phoneLbl: string; phonePh: string; emailLbl: string; emailPh: string; serviceLbl: string; servicePh: string; messageLbl: string; messagePh: string; send: string; sending: string; successTitle: string; successMsg: string }
  footer: { links: Array<{ label: string; href: string }>; copy: string }
}

export const t: Record<Lang, Translations> = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      ourWork: 'Our Work',
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
        { label: 'Contact',  href: '#contact'  },
      ],
      copy: '© 2025 LAMAR Renovation & Decoration. All rights reserved.',
    },
  },

  nl: {
    nav: {
      about: 'Over Ons',
      services: 'Diensten',
      ourWork: 'Ons Werk',
      contact: 'Contact',
      reviews: 'Reviews',
      contactUs: 'Neem Contact Op',
    },
    hero: {
      tag: 'Renovatie & Decoratie Specialisten',
      h1a: 'Wij Bouwen',
      h1b: 'Ruimtes',
      h1c: 'Die Blijven.',
      desc: 'Gipswerk, interieurafwerking, schilderwerk en volledige woningrenovatie — geleverd met vakmanschap dat voor zich spreekt.',
      seeWork: 'Ons Werk Bekijken',
      getQuote: 'Offerte Aanvragen',
      statProjects: 'Projecten',
      statYears: 'Jaar Actief',
      statSatisfaction: 'Tevredenheid',
      badge: 'Exclusief Renovatiewerk',
    },
    ticker: [
      { label: 'Gipswerk',               accent: true  },
      { label: 'Interieurafwerking',      accent: false },
      { label: 'Schilderwerk',            accent: true  },
      { label: 'Woningrenovatie',         accent: false },
      { label: 'Plafondstucwerk',         accent: true  },
      { label: 'Muurafwerking',           accent: false },
      { label: 'Volledige Renovatie',     accent: true  },
      { label: 'Kwaliteit Gegarandeerd',  accent: false },
    ],
    services: {
      tag: 'Wat Wij Doen',
      heading: 'Onze',
      headingTeal: 'Diensten',
      learnMore: 'Meer Info →',
      items: {
        service_gypsum:      { name: 'Gipswerk',           fallback: 'Nauwkeurig gipswerk voor wanden en plafonds — gladde afwerkingen, decoratieve lijsten en sierlijke plafonddetails met perfectie vervaardigd.' },
        service_decoration:  { name: 'Interieurafwerking', fallback: 'Maatwerk interieurafwerking die ruimtes transformeert — van materiaalkeuze en kleuradvies tot de laatste decoratieve details die een thuis compleet maken.' },
        service_painting:    { name: 'Schilderwerk',       fallback: 'Professioneel wand- en plafondschilderwerk met premium materialen — een nette voorbereiding, vlekkeloze uitvoering en duurzame resultaten voor elk type ondergrond.' },
        service_restoration: { name: 'Woningrenovatie',    fallback: 'Volledige woningrenovatie van constructief herstel tot cosmetische afwerking — nieuw leven ingeblazen in oudere panden met behoud van hun karakter.' },
      },
    },
    about: {
      tag: 'Over LAMAR',
      heading: 'Wij Renoveren Niet Alleen.',
      headingPre: 'Wij',
      headingTeal: 'Transformeren.',
      quals: ['Gips & Stucwerk', 'Interieurafwerking', 'Schilderwerk & Afwerking', 'Woningrenovatie', 'Op Tijd Geleverd', 'Kwaliteit Gegarandeerd'],
      yearsLabel: ['Jaar', 'Ervaring'],
      projectsLabel: ['Projecten', 'Voltooid'],
    },
    process: {
      tag: 'Onze Aanpak',
      heading: 'Hoe Wij',
      headingTeal: 'Werken',
      steps: [
        { num: '01', title: 'Gratis Consult',     desc: 'Wij bezoeken uw ruimte, luisteren naar uw wensen en beoordelen precies wat er gedaan moet worden — vrijblijvend en zonder druk.' },
        { num: '02', title: 'Heldere Offerte',    desc: 'U ontvangt binnen 48 uur een gedetailleerde, transparante offerte. Geen verborgen kosten, geen verrassingen — gewoon een eerlijke uitleg van het werk.' },
        { num: '03', title: 'Aan het Werk',       desc: 'Ons team komt op tijd, werkt netjes en efficiënt, en houdt u gedurende elke fase van het project op de hoogte.' },
        { num: '04', title: 'Finale Oplevering',  desc: 'Wij doen samen een rondleiding, zorgen dat alles aan uw verwachtingen voldoet, en vertrekken pas als u volledig tevreden bent.' },
      ],
    },
    gallery: {
      tag: 'Portfolio',
      heading: 'Ons Werk',
      viewAll: 'Alle Projecten Bekijken →',
      specialtyLabel: 'Onze Specialiteit',
      specialtyText: 'Nauwkeurig Gipswerk & Maatwerkdecoratie',
      ctaLabel: 'Klaar om uw project te starten?',
    },
    testimonials: {
      tag: 'Klantbeoordelingen',
      heading: 'Wat Onze',
      headingTeal: 'Klanten Zeggen',
    },
    contact: {
      tag: 'Neem Contact Op',
      h1: 'LATEN WIJ',
      h2: 'IETS GEWELDIGS',
      h3: 'BOUWEN.',
      labels: {
        contact_phone:    'Telefoon',
        contact_whatsapp: 'WhatsApp',
        contact_email:    'E-mail',
        contact_location: 'Locatie',
        contact_hours:    'Werktijden',
      },
    },
    contactForm: {
      nameLbl: 'Uw Naam',           namePh: 'Jan de Vries',
      phoneLbl: 'Telefoonnummer',   phonePh: '+31 00 000 0000',
      emailLbl: 'E-mailadres',      emailPh: 'jan@voorbeeld.nl',
      serviceLbl: 'Gewenste Dienst', servicePh: 'Gipswerk, Decoratie, Schilderwerk…',
      messageLbl: 'Vertel Ons Over Uw Project', messagePh: 'Beschrijf uw ruimte en wat u in gedachten heeft…',
      send: 'Bericht Sturen', sending: 'Verzenden…',
      successTitle: 'Bericht Verzonden!',
      successMsg: 'Bedankt voor uw bericht. Wij nemen binnen 24 uur contact met u op.',
    },
    footer: {
      links: [
        { label: 'Over Ons', href: '#about'    },
        { label: 'Diensten', href: '#services' },
        { label: 'Ons Werk', href: '#our-work' },
        { label: 'Contact',  href: '#contact'  },
      ],
      copy: '© 2025 LAMAR Renovatie & Decoratie. Alle rechten voorbehouden.',
    },
  },
}
