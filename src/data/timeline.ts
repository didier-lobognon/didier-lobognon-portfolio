import type { TimelineItem } from '@/types'
import logoIgs from '@/assets/logos/ivoire-geek-school.png'
import logoUvci from '@/assets/logos/uvci.png'
import logoWaicebon from '@/assets/logos/waicebon.jpg'
import logoEpitech from '@/assets/logos/epitech.png'
import logoWecode from '@/assets/logos/wecode.png'
import logoDynexc from '@/assets/logos/dynexc.png'
import logoEngeem from '@/assets/logos/engeem.png'
import logoYako from '@/assets/logos/yako.png'

/** Couleurs marque (dérivées des logos) */
const BRAND = {
  igs: '#1A337E',
  /** Intérieur UVCI = vert ; bordure = violet */
  uvci: '#16A34A',
  uvciBorder: '#6D28D9',
  epitech: '#009EE2',
  wecode: '#6366F1',
  engeem: '#109BBB',
  /** Orange Côte d’Ivoire / DynExc */
  dynexc: '#F97316',
  yako: '#166534',
  /** Or — mise en lumière des hackathons */
  gold: '#D4A017',
  goldBorder: '#F5D76E',
} as const

/**
 * Parcours LinkedIn — stocké du plus ancien au plus récent.
 * L’UI affiche l’inverse (présent → passé).
 * https://www.linkedin.com/in/ld-didier/
 */
export const timeline: TimelineItem[] = [
  {
    id: 'cert-ux-igs',
    type: 'certificat',
    titleFr: 'UX/UI Design',
    titleEn: 'UX/UI Design',
    organization: 'Ivoire Geek School',
    locationFr: 'Côte d’Ivoire',
    locationEn: 'Ivory Coast',
    periodFr: 'juil. 2023 — oct. 2023',
    periodEn: 'Jul 2023 — Oct 2023',
    descriptionFr:
      'Certification UX/UI obtenue pendant la 2ᵉ année de licence : conception d’interfaces, parcours utilisateur et design orienté produit.',
    descriptionEn:
      'UX/UI certification earned during the 2nd year of my bachelor’s degree: interface design, user journeys, and product-oriented design.',
    tagsFr: ['UX/UI', 'Design', 'Produit'],
    tagsEn: ['UX/UI', 'Design', 'Product'],
    logo: logoIgs,
    logoBg: '#ffffff',
    logoFit: 'cover',
    brandColor: BRAND.igs,
  },
  {
    id: 'edu-licence',
    type: 'formation',
    titleFr: 'Licence — Développement Web et Mobile',
    titleEn: 'Bachelor’s — Web & Mobile Development',
    organization: 'Université Virtuelle de Côte d’Ivoire',
    locationFr: 'Abidjan, Côte d’Ivoire',
    locationEn: 'Abidjan, Ivory Coast',
    periodFr: '2021 — 2024',
    periodEn: '2021 — 2024',
    descriptionFr:
      'Licence en Développement Web et Mobile obtenue à l’UVCI — socle académique pour le front, le mobile et les applications connectées.',
    descriptionEn:
      'Bachelor’s in Web & Mobile Development from UVCI — academic foundation for front-end, mobile, and connected applications.',
    tagsFr: ['Licence', 'Web', 'Mobile', 'UVCI'],
    tagsEn: ['Bachelor’s', 'Web', 'Mobile', 'UVCI'],
    logo: logoUvci,
    logoBg: '#ffffff',
    brandColor: BRAND.uvci,
    brandBorder: BRAND.uvciBorder,
    highlight: true,
  },
  {
    id: 'exp-waicebon',
    type: 'experience',
    titleFr: 'Développeur Web & Gestionnaire de Plateforme',
    titleEn: 'Web Developer & Platform Manager',
    organization: 'Waicebon',
    locationFr: 'Abidjan, Côte d’Ivoire',
    locationEn: 'Abidjan, Ivory Coast',
    periodFr: 'juil. 2024 — nov. 2024',
    periodEn: 'Jul 2024 — Nov 2024',
    descriptionFr:
      'Gestion technique d’une plateforme e-commerce : intégration et mise à jour des contenus (produits, images, descriptions), suivi des performances et bon fonctionnement du site.',
    descriptionEn:
      'Technical management of an e-commerce platform: content integration and updates (products, images, descriptions), performance monitoring, and site reliability.',
    tagsFr: ['E-commerce', 'Web', 'Contenu', 'Ops'],
    tagsEn: ['E-commerce', 'Web', 'Content', 'Ops'],
    logo: logoWaicebon,
    logoBg: '#ffffff',
    logoFit: 'cover',
  },
  {
    id: 'cert-wecode-epitech',
    type: 'certificat',
    titleFr: 'Développeur Full Stack – Wecode by Epitech',
    titleEn: 'Full Stack Developer – Wecode by Epitech',
    organization: 'Epitech — L’école de l’excellence informatique',
    locationFr: 'Côte d’Ivoire',
    locationEn: 'Ivory Coast',
    periodFr: 'nov. 2024 — mai 2025',
    periodEn: 'Nov 2024 — May 2025',
    descriptionFr:
      'Formation / certification Développeur Full Stack dans le cadre du programme Wecode by Epitech (novembre 2024 – mai 2025).',
    descriptionEn:
      'Full Stack Developer training and certification through the Wecode by Epitech program (November 2024 – May 2025).',
    tagsFr: ['Certification', 'Full Stack', 'Epitech'],
    tagsEn: ['Certification', 'Full Stack', 'Epitech'],
    logo: logoEpitech,
    logoBg: '#ffffff',
    brandColor: BRAND.epitech,
    highlight: true,
  },
  {
    id: 'milestone-hackathon-epitech',
    type: 'milestone',
    titleFr: '1ʳᵉ place — Hackathon Éducation & Technologie',
    titleEn: '1st place — Education & Technology Hackathon',
    organization: 'We.Code × Futur Studio',
    locationFr: 'Côte d’Ivoire',
    locationEn: 'Ivory Coast',
    periodFr: '5 — 9 mai 2025',
    periodEn: 'May 5 — 9, 2025',
    descriptionFr:
      'Victoire au Hackathon We.Code Éducation & Technologie (5–9 mai 2025) — app de classement temps réel (WebSocket, Docker) pour le Championnat National de Robotique.',
    descriptionEn:
      'Winner of the We.Code Education & Technology Hackathon (May 5–9, 2025) — real-time ranking app (WebSocket, Docker) for the National Robotics Championship.',
    tagsFr: ['Hackathon', 'WebSocket', 'Docker', 'Robotique'],
    tagsEn: ['Hackathon', 'WebSocket', 'Docker', 'Robotics'],
    logo: logoWecode,
    logoBg: '#ffffff',
    brandColor: BRAND.gold,
    brandBorder: BRAND.goldBorder,
    highlight: true,
  },
  {
    id: 'exp-dynexc-stage',
    type: 'experience',
    titleFr: 'Développeur Full Stack',
    titleEn: 'Full Stack Developer',
    organization: 'Dynamiques et Excellentes d’Afrique',
    locationFr: 'Abidjan, Côte d’Ivoire',
    locationEn: 'Abidjan, Ivory Coast',
    periodFr: '2025 — 2026 · 2 × 6 mois',
    periodEn: '2025 — 2026 · 2 × 6 months',
    descriptionFr:
      'Une année au cœur de l’écosystème DynExcAfrica (deux périodes de 6 mois) : sites institutionnels, plateformes RH, LMS, classement live CNR, MecaGirls et outils événementiels STEM.',
    descriptionEn:
      'One year at the heart of the DynExcAfrica ecosystem (two 6-month periods): institutional websites, HR platforms, LMS, live CNR rankings, MecaGirls, and STEM event tools.',
    tagsFr: ['1 an', 'React', 'NestJS', 'STEM'],
    tagsEn: ['1 year', 'React', 'NestJS', 'STEM'],
    logo: logoDynexc,
    logoBg: '#000000',
    brandColor: BRAND.dynexc,
    lightCard: true,
    highlight: true,
  },
  {
    id: 'edu-master2',
    type: 'formation',
    titleFr: 'Master 2 — Big Data Analytics',
    titleEn: 'Master’s — Big Data Analytics',
    organization: 'Université Virtuelle de Côte d’Ivoire',
    locationFr: 'Abidjan, Côte d’Ivoire',
    locationEn: 'Abidjan, Ivory Coast',
    periodFr: '2025 — Présent',
    periodEn: '2025 — Present',
    descriptionFr:
      'Master 2 Big Data Analytics en cours à l’UVCI — data, analytics et systèmes à grande échelle, en parallèle des missions professionnelles.',
    descriptionEn:
      'Master’s in Big Data Analytics in progress at UVCI — data, analytics, and large-scale systems, alongside professional assignments.',
    tagsFr: ['Master 2', 'Big Data', 'Analytics', 'UVCI'],
    tagsEn: ['Master’s', 'Big Data', 'Analytics', 'UVCI'],
    logo: logoUvci,
    logoBg: '#ffffff',
    brandColor: BRAND.uvci,
    brandBorder: BRAND.uvciBorder,
    current: true,
    highlight: true,
  },
  {
    id: 'exp-engeem-stage',
    type: 'experience',
    titleFr: 'Développeur Full Stack',
    titleEn: 'Full Stack Developer',
    organization: 'ENGEEM',
    locationFr: 'Abidjan, Côte d’Ivoire',
    locationEn: 'Abidjan, Ivory Coast',
    periodFr: '2026 · 7 mois',
    periodEn: '2026 · 7 months',
    descriptionFr:
      'Sept mois produit autour de la Data Control Plane ENGEEM : site Angular, documentation Docusaurus et expérience UI data.',
    descriptionEn:
      'Seven months of product work on the ENGEEM Data Control Plane: Angular site, Docusaurus documentation, and data UI experience.',
    tagsFr: ['7 mois', 'Angular', 'Docusaurus', 'Data'],
    tagsEn: ['7 months', 'Angular', 'Docusaurus', 'Data'],
    logo: logoEngeem,
    logoBg: BRAND.engeem,
    logoFit: 'cover',
    brandColor: BRAND.engeem,
    highlight: true,
  },
  {
    id: 'milestone-hackathon-yako',
    type: 'milestone',
    titleFr: '3ᵉ place — Hackathon Yako Africa Assurances Vie',
    titleEn: '3rd place — Yako Africa Life Insurance Hackathon',
    organization: 'Yako Africa Assurances Vie',
    locationFr: 'Abidjan, Côte d’Ivoire',
    locationEn: 'Abidjan, Ivory Coast',
    periodFr: 'mars 2026',
    periodEn: 'Mar 2026',
    descriptionFr:
      'Hackathon Yako Africa Assurances Vie — terminé à la 3ᵉ place, avec une solution tech pensée pour les enjeux assurance / innovation.',
    descriptionEn:
      'Yako Africa Life Insurance Hackathon — finished 3rd with a tech solution designed for insurance and innovation challenges.',
    tagsFr: ['Hackathon', 'Assurance', 'Innovation'],
    tagsEn: ['Hackathon', 'Insurance', 'Innovation'],
    logo: logoYako,
    logoBg: '#ffffff',
    brandColor: BRAND.gold,
    brandBorder: BRAND.goldBorder,
    highlight: true,
  },
  {
    id: 'exp-dynexc-consultance',
    type: 'experience',
    titleFr: 'Développeur Full Stack',
    titleEn: 'Full Stack Developer',
    organization: 'Dynamiques et Excellentes d’Afrique',
    locationFr: 'Abidjan, Côte d’Ivoire',
    locationEn: 'Abidjan, Ivory Coast',
    periodFr: 'juin 2026 — 6 mois — en cours',
    periodEn: 'Jun 2026 — 6 months — ongoing',
    descriptionFr:
      'Depuis juin 2026 (6 mois, en cours) : poursuite de la livraison et du pilotage technique des produits DynExcAfrica.',
    descriptionEn:
      'Since June 2026 (6 months, ongoing): continued delivery and technical leadership on DynExcAfrica products.',
    tagsFr: ['6 mois', 'Full Stack', 'En cours'],
    tagsEn: ['6 months', 'Full Stack', 'Ongoing'],
    logo: logoDynexc,
    logoBg: '#000000',
    brandColor: BRAND.dynexc,
    lightCard: true,
    highlight: true,
    current: true,
  },
  {
    id: 'exp-engeem-cdi',
    type: 'experience',
    titleFr: 'Développeur Full Stack',
    titleEn: 'Full Stack Developer',
    organization: 'ENGEEM',
    locationFr: 'Abidjan, Côte d’Ivoire',
    locationEn: 'Abidjan, Ivory Coast',
    periodFr: 'août 2026 — Présent',
    periodEn: 'Aug 2026 — Present',
    descriptionFr:
      'Depuis août 2026 : poursuite du travail produit sur la plateforme data ENGEEM.',
    descriptionEn:
      'Since August 2026: continued product work on the ENGEEM data platform.',
    tagsFr: ['Angular', 'Data', 'Produit'],
    tagsEn: ['Angular', 'Data', 'Product'],
    logo: logoEngeem,
    logoBg: BRAND.engeem,
    logoFit: 'cover',
    brandColor: BRAND.engeem,
    highlight: true,
    current: true,
  },
]
