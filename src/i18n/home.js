// Every text of the home page, in English and Italian. The demo has its own file:
// src/components/Playground/strings.js.

export const LANGS = {
  en: { path: '/', label: 'EN', name: 'English', locale: 'en_US' },
  it: { path: '/it/', label: 'IT', name: 'Italiano', locale: 'it_IT' },
};

const EMAIL = 'info@danielegreco.com';

const en = {
  meta: {
    title: 'Daniele Greco, system architect and software engineer',
    description: 'Powering mission-critical infrastructure for aviation and modern industry. Explore an interactive model of it.',
  },
  bar: {
    home: 'Daniele Greco, System Engineering consultant: back to the top',
    role: 'System Engineering consultant',
    sections: 'Sections',
    language: 'Language',
    quote: 'Ask for a quote',
    quoteMail: `mailto:${EMAIL}?subject=${encodeURIComponent('Quote request')}`,
  },
  nav: { demo: 'Demo', experience: 'Experience', studies: 'Studies', contact: 'Contact' },
  hero: {
    title: 'Powering mission-critical infrastructure for aviation and modern industry',
    // Rendered as HTML: <strong> marks the words that stand out.
    intro:
      '<strong>PhD</strong> student with several years of experience as a system architect and software engineer, based in Bergamo, Italy. I build and manage all kinds of clusters, <strong>from on-premise server rooms to cloud-native environments</strong>, following the <strong>highest security</strong> standards.',
    cue: 'Play with the demo',
  },
  demo: 'Infrastructure demo',
  experience: [
    {
      years: '2026 – now',
      duration: '1 year',
      current: true,
      role: 'System architect',
      org: 'flAi',
      href: 'https://flai-analytics.com',
      text: 'flAi builds decision-support tools for aviation and mobility. I run the platform underneath: GPU servers on-prem, cloud fleets, single sign-on, backups and monitoring.',
    },
    {
      years: '2026 – now',
      duration: '1 year',
      role: 'Freelance software engineer',
      text: 'Software design, development and technical consulting, as an independent professional.',
    },
    {
      years: 'Jul – Nov 2025',
      duration: '5 months',
      role: 'Undergraduate research fellow',
      org: 'University of Bergamo',
      href: 'https://www.unibg.it',
      text: "Research for MOST, the Italian National Center for Sustainable Mobility, about transport modes, their technical characteristics and user behaviour. I ran a market analysis of the Italian e-bike sector that went into the project's deliverables.",
    },
    {
      years: '2023 – 2024',
      duration: '1 year',
      role: 'CPM consultant',
      org: 'Avvale',
      href: 'https://www.avvale.com',
      text: 'Modules for OneStream, a corporate performance management platform, written in Visual Basic and .NET.',
    },
  ],
  studies: [
    {
      years: 'From Nov 2026',
      current: true,
      role: 'PhD in Technology, Innovation and Management',
      org: 'University of Bergamo',
      text: 'Research on using generative AI to solve optimisation problems.',
    },
    {
      years: '2023 – 2026',
      role: 'MSc in Computer Engineering',
      org: 'University of Bergamo',
      text: "Thesis with Prof. Angelo Gargantini: HaiSIM, a simulator of a radiology reading room with an AI in it, to study how AI changes waiting times and the radiologists' decisions.",
      link: { href: 'https://github.com/DaniGreco/hai-sim', label: 'GitHub project' },
    },
    {
      years: '2019 – 2023',
      role: 'BSc in Computer Science and Engineering',
      org: 'University of Bergamo',
      text: 'Thesis with Prof. Paolo Malighetti: a web scraper in JavaScript, Node.js and Docker that collects e-bike components from Italian shops.',
      link: { href: 'https://github.com/DaniGreco/BSc_Thesis', label: 'GitHub project' },
    },
  ],
  contact: {
    title: 'Contact me',
    lead: 'Ask for a quote',
    email: EMAIL,
    about:
      'Curiosity drives most of what I do. Besides technology I read about maths, finance, music, cinema and philosophy, and I like taking ideas from one field into another.',
    source: 'Source code on GitHub',
  },
};

const it = {
  meta: {
    title: 'Daniele Greco, system architect e software engineer',
    description: "Infrastrutture mission-critical per l'aviazione e l'industria moderna. Esplorane un modello interattivo.",
  },
  bar: {
    home: 'Daniele Greco, System Engineering consultant: torna in cima',
    role: 'System Engineering consultant',
    sections: 'Sezioni',
    language: 'Lingua',
    quote: 'Chiedi un preventivo',
    quoteMail: `mailto:${EMAIL}?subject=${encodeURIComponent('Richiesta di preventivo')}`,
  },
  nav: { demo: 'Demo', experience: 'Esperienze', studies: 'Studi', contact: 'Contatti' },
  hero: {
    title: "Infrastrutture mission-critical per l'aviazione e l'industria moderna",
    intro:
      '<strong>Dottorando</strong> con diversi anni di esperienza come system architect e software engineer, con base a Bergamo. Costruisco e gestisco cluster di ogni tipo, <strong>dalle sale server on-premise agli ambienti cloud-native</strong>, seguendo i <strong>più alti standard di sicurezza</strong>.',
    cue: 'Prova la demo',
  },
  demo: "Demo dell'infrastruttura",
  experience: [
    {
      years: '2026 – oggi',
      duration: '1 anno',
      current: true,
      role: 'System architect',
      org: 'flAi',
      href: 'https://flai-analytics.com',
      text: "flAi sviluppa strumenti di supporto alle decisioni per l'aviazione e la mobilità. Gestisco la piattaforma su cui girano: server GPU on-prem, flotte cloud, single sign-on, backup e monitoraggio.",
    },
    {
      years: '2026 – oggi',
      duration: '1 anno',
      role: 'Software engineer freelance',
      text: 'Progettazione e sviluppo software e consulenza tecnica, come libero professionista.',
    },
    {
      years: 'lug – nov 2025',
      duration: '5 mesi',
      role: 'Borsista di ricerca',
      org: 'Università di Bergamo',
      href: 'https://www.unibg.it',
      text: "Ricerca per MOST, il Centro Nazionale per la Mobilità Sostenibile, sulle modalità di trasporto, le loro caratteristiche tecniche e il comportamento degli utenti. Ho svolto un'analisi di mercato del settore italiano delle e-bike, confluita nei deliverable del progetto.",
    },
    {
      years: '2023 – 2024',
      duration: '1 anno',
      role: 'Consulente CPM',
      org: 'Avvale',
      href: 'https://www.avvale.com',
      text: 'Moduli per OneStream, una piattaforma di corporate performance management, scritti in Visual Basic e .NET.',
    },
  ],
  studies: [
    {
      years: 'Da nov 2026',
      current: true,
      role: 'Dottorato in Technology, Innovation and Management',
      org: 'Università di Bergamo',
      text: "Ricerca sull'uso dell'AI generativa per risolvere problemi di ottimizzazione.",
    },
    {
      years: '2023 – 2026',
      role: 'Laurea magistrale in Ingegneria Informatica',
      org: 'Università di Bergamo',
      text: "Tesi con il Prof. Angelo Gargantini: HaiSIM, un simulatore di una sala di refertazione radiologica con un'AI al suo interno, per studiare come l'AI cambia i tempi di attesa e le decisioni dei radiologi.",
      link: { href: 'https://github.com/DaniGreco/hai-sim', label: 'Progetto su GitHub' },
    },
    {
      years: '2019 – 2023',
      role: 'Laurea triennale in Ingegneria Informatica',
      org: 'Università di Bergamo',
      text: 'Tesi con il Prof. Paolo Malighetti: un web scraper in JavaScript, Node.js e Docker che raccoglie componenti per e-bike dai negozi italiani.',
      link: { href: 'https://github.com/DaniGreco/BSc_Thesis', label: 'Progetto su GitHub' },
    },
  ],
  contact: {
    title: 'Contattami',
    lead: 'Chiedi un preventivo',
    email: EMAIL,
    about:
      "La curiosità guida quasi tutto quello che faccio. Oltre alla tecnologia leggo di matematica, finanza, musica, cinema e filosofia, e mi piace portare le idee da un campo all'altro.",
    source: 'Codice sorgente su GitHub',
  },
};

export const COPY = { en, it };
