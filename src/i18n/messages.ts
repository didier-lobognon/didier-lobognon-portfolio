export type Locale = 'fr' | 'en'

export const messages = {
  fr: {
    nav: {
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      journey: 'Parcours',
      services: 'Services',
      contact: 'Contact',
      contactCta: 'Me contacter',
      home: "Retour à l'accueil",
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      langLabel: 'Changer de langue',
    },
    hero: {
      availability: 'Disponible — nouvelles opportunités',
      statusLines: [
        'Ouvert aux nouvelles missions',
        'Prêt pour collab produit',
        'Disponible dès maintenant',
        'Brief → produit en prod',
      ],
      title: 'Développeur Full Stack',
      subtitle:
        'Je conçois et développe des applications web complètes — du front à l’API — avec une exigence forte sur la performance, la qualité du code et l’expérience utilisateur. Mon objectif : transformer un brief en produit fiable, élégant et prêt pour la production.',
      tagline: 'Brief → produit en production. Front, API, UX.',
      ctaProjects: 'Voir mes projets',
      ctaContact: 'Me contacter',
      scroll: 'Scroll',
    },
    about: {
      eyebrow: 'À propos',
      title: 'L’humain derrière le code',
      lead: 'Full Stack avec une obsession produit : des interfaces nettes, des APIs solides, et des livraisons qui tiennent en production.',
      bio: [
        'Je conçois des applications web de bout en bout — du front React/Angular/Vue jusqu’aux backends Node, PHP, Python ou Java.',
        'Mon approche mélange rigueur technique et sens du détail UX : chaque écran, chaque endpoint, chaque déploiement doit servir une expérience claire.',
        'Basé à Abidjan, j’accompagne les équipes et les projets qui veulent passer d’une idée à un produit fiable, élégant et prêt à scaler.',
      ],
      focusLabel: 'Axes de prédilection',
      signature: 'Brief → architecture → produit livré.',
      pillars: [
        {
          title: 'Craft',
          text: 'Code propre, lisible, maintenable — sans compromis sur la qualité.',
        },
        {
          title: 'Ship',
          text: 'Livrer vite, mais bien : MVP utiles et itérations continues.',
        },
        {
          title: 'UX',
          text: 'Des parcours fluides pensés pour les vrais utilisateurs.',
        },
      ],
      cta: 'Discutons de votre projet',
    },
    skills: {
      eyebrow: 'Compétences',
      title: 'La stack qui fait tenir la prod',
      description:
        'Front, API, data, mobile, serveurs — des outils que je manie vraiment, du premier commit au reverse proxy.',
      coreLabel: 'Stack cœur',
      domainsLabel: 'Domaines',
      all: 'Vue d’ensemble',
      reassurance: 'Pas une liste à rallonge. Une maîtrise qui se voit dans le livrable.',
      mastery: 'Niveau de maîtrise',
    },
    projects: {
      eyebrow: 'Projets',
      title: 'Des produits qui marquent',
      description:
        'Du dashboard au e-commerce, des apps livrées avec du caractère — perf, UX et détails qui se ressentent.',
      readMore: 'Voir plus',
      readLess: 'Voir moins',
      showMore: 'Afficher plus de projets',
      showLess: 'Afficher moins',
    },
    journey: {
      eyebrow: 'Parcours',
      title: 'Ma carte de niveaux',
      description:
        'Un chemin en serpentin — chaque nœud est une étape tech : expériences, formations, certifications. Clique pour ouvrir le niveau.',
      filters: {
        all: 'Tout',
        experience: 'Expériences',
        formation: 'Formations',
        certificat: 'Certificats',
      },
      current: 'En cours',
      nextHint: 'Sélectionne un niveau',
      linkedin: 'Voir sur LinkedIn',
    },
    services: {
      eyebrow: 'Services',
      title: 'Ce que je livre vraiment',
      description:
        'Pas une liste générique : des offres calées sur ce que je construis déjà — apps métier, APIs, e-commerce et mise en production.',
      reassurance:
        'Brief clair → architecture → livrable en prod. Vous gardez la main, je porte la technique.',
      cta: 'Parler de votre besoin',
    },
    stats: {
      eyebrow: 'Impact',
      title: 'Des preuves, pas des promesses',
      description:
        'Des indicateurs tirés de mes vrais livrables — y compris missions entreprise et clients confidentiels non exposés ici.',
      proofsLabel: 'Repères concrets',
      domainsLabel: 'Terrains couverts',
    },
    testimonials: {
      eyebrow: 'Témoignages',
      title: 'La confiance se construit',
      description:
        'Des retours de personnes avec qui j’ai vraiment collaboré — entreprises, produits, pression réelle.',
      trustedBy: 'Ils m’ont fait confiance',
      prev: 'Témoignage précédent',
      next: 'Témoignage suivant',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Écrivons la suite ensemble',
      description:
        'Une idée, un brief, une opportunité — je réponds avec attention. Discutons sans friction.',
      availability: 'Ouvert aux nouvelles missions',
      response: 'Réponse sous 24–48 h',
      formTitle: 'Envoyer un message',
      formHint: 'Parlez-moi du besoin — je m’occupe de la technique.',
      name: 'Nom',
      namePh: 'Votre nom',
      email: 'Email',
      emailPh: 'vous@email.com',
      subject: 'Sujet',
      subjectPh: 'Ex. refonte produit, API, MVP…',
      message: 'Message',
      messagePh: 'Contexte, objectifs, délais…',
      send: 'Envoyer le message',
      sending: 'Envoi en cours…',
      sentTitle: 'Message bien reçu',
      sentBody: 'Merci. Je vous répondrai dès que possible — généralement sous 24 à 48 h.',
      sentAgain: 'Écrire un autre message',
      emailLabel: 'Email',
      phoneLabel: 'Téléphone',
      locationLabel: 'Basé à',
      errName: 'Indiquez votre nom (2 caractères min.).',
      errEmail: 'Adresse e-mail invalide.',
      errMessage: 'Message trop court (10 caractères min.).',
      reassurance: [
        'Échange clair, sans jargon inutile',
        'Devis / cadrage honnête dès le départ',
        'Code propre, livrable prêt pour la prod',
      ],
    },
    footer: {
      quote:
        '« Le détail fait la différence entre un produit correct et une expérience mémorable. »',
      rights: 'Tous droits réservés.',
      crafted: 'Conçu avec React, Framer Motion & GSAP.',
      cta: 'Discutons de votre projet',
      navLabel: 'Navigation',
      socialLabel: 'Réseaux',
      backTop: 'Haut de page',
    },
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      journey: 'Journey',
      services: 'Services',
      contact: 'Contact',
      contactCta: 'Contact me',
      home: 'Back to home',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      langLabel: 'Switch language',
    },
    hero: {
      availability: 'Open to new opportunities',
      statusLines: [
        'Open to new missions',
        'Ready for product collabs',
        'Available right now',
        'Brief → shipped product',
      ],
      title: 'Full Stack Developer',
      subtitle:
        'I design and build complete web applications — from UI to API — with a strong focus on performance, code quality, and user experience. My goal: turn a brief into a reliable, elegant, production-ready product.',
      tagline: 'Brief → shipped product. UI, API, UX.',
      ctaProjects: 'View my work',
      ctaContact: 'Contact me',
      scroll: 'Scroll',
    },
    about: {
      eyebrow: 'About',
      title: 'The person behind the code',
      lead: 'Full Stack with a product obsession: sharp interfaces, solid APIs, and releases that hold up in production.',
      bio: [
        'I build end-to-end web applications — from React/Angular/Vue frontends to Node, PHP, Python, or Java backends.',
        'My approach blends technical rigor with UX detail: every screen, endpoint, and deploy should serve a clear experience.',
        'Based in Abidjan, I partner with teams and projects that want to go from idea to a reliable, elegant, scalable product.',
      ],
      focusLabel: 'Focus areas',
      signature: 'Brief → architecture → shipped product.',
      pillars: [
        {
          title: 'Craft',
          text: 'Clean, readable, maintainable code — no compromise on quality.',
        },
        {
          title: 'Ship',
          text: 'Move fast, ship well: useful MVPs and continuous iteration.',
        },
        {
          title: 'UX',
          text: 'Fluid journeys designed for real users.',
        },
      ],
      cta: "Let's talk about your project",
    },
    skills: {
      eyebrow: 'Skills',
      title: 'The stack that holds in production',
      description:
        'Front, API, data, mobile, servers — tools I actually own, from the first commit to the reverse proxy.',
      coreLabel: 'Core stack',
      domainsLabel: 'Domains',
      all: 'Overview',
      reassurance: 'Not a laundry list. Mastery you can see in the shipped product.',
      mastery: 'Mastery level',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Work that leaves a mark',
      description:
        'From dashboards to e-commerce — shipped apps with character: performance, UX, and details you can feel.',
      readMore: 'Read more',
      readLess: 'Show less',
      showMore: 'Show more projects',
      showLess: 'Show less',
    },
    journey: {
      eyebrow: 'Journey',
      title: 'My level map',
      description:
        'A winding path — each node is a tech milestone: experience, education, certifications. Click to open a level.',
      filters: {
        all: 'All',
        experience: 'Experience',
        formation: 'Education',
        certificat: 'Certificates',
      },
      current: 'Current',
      nextHint: 'Select a level',
      linkedin: 'View on LinkedIn',
    },
    services: {
      eyebrow: 'Services',
      title: 'What I actually ship',
      description:
        'Not a generic menu: offers grounded in what I already build — business apps, APIs, e-commerce, and production deploy.',
      reassurance:
        'Clear brief → architecture → production-ready delivery. You stay in control; I own the tech.',
      cta: 'Talk about your need',
    },
    stats: {
      eyebrow: 'Impact',
      title: 'Proof, not promises',
      description:
        'Metrics grounded in real deliverables — including confidential company and client work not shown here.',
      proofsLabel: 'Concrete markers',
      domainsLabel: 'Domains covered',
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'Trust is earned',
      description:
        'Feedback from people I’ve actually worked with — real companies, real products, real pressure.',
      trustedBy: 'Trusted by',
      prev: 'Previous testimonial',
      next: 'Next testimonial',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's write the next chapter",
      description:
        'An idea, a brief, an opportunity — I reply with care. Let’s talk without friction.',
      availability: 'Open to new missions',
      response: 'Reply within 24–48 h',
      formTitle: 'Send a message',
      formHint: 'Tell me the need — I’ll handle the tech.',
      name: 'Name',
      namePh: 'Your name',
      email: 'Email',
      emailPh: 'you@email.com',
      subject: 'Subject',
      subjectPh: 'E.g. product rebuild, API, MVP…',
      message: 'Message',
      messagePh: 'Context, goals, timeline…',
      send: 'Send message',
      sending: 'Sending…',
      sentTitle: 'Message received',
      sentBody: 'Thank you. I’ll get back to you soon — usually within 24–48 h.',
      sentAgain: 'Write another message',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Based in',
      errName: 'Please enter your name (min. 2 characters).',
      errEmail: 'Invalid email address.',
      errMessage: 'Message too short (min. 10 characters).',
      reassurance: [
        'Clear exchange, no unnecessary jargon',
        'Honest scoping from the start',
        'Clean code, production-ready delivery',
      ],
    },
    footer: {
      quote:
        '“Detail is what separates a decent product from a memorable experience.”',
      rights: 'All rights reserved.',
      crafted: 'Built with React, Framer Motion & GSAP.',
      cta: "Let's talk about your project",
      navLabel: 'Navigate',
      socialLabel: 'Social',
      backTop: 'Back to top',
    },
  },
} as const

type DeepStringify<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepStringify<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepStringify<T[K]> }
      : T

export type Messages = DeepStringify<(typeof messages)['fr']>
