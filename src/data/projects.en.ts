import type {
  ProjectFeature,
  ProjectArchStep,
  ProjectContribution,
  ProjectTechGroup,
} from '@/types'

export type ProjectEnCopy = {
  description: string
  longDescription: string
  period?: string
  category?: string
  role?: string
  contributionTeaser?: string
  contributionNote?: string
  overview?: string[]
  contributionHighlights?: ProjectFeature[]
  contributions?: ProjectContribution[]
  features?: ProjectFeature[]
  architecture?: ProjectArchStep[]
  techStack?: ProjectTechGroup[]
}

export const projectsEn: Record<string, ProjectEnCopy> = {
  masafinance: {
    description:
      'FinTech microservices platform to digitize financial services and secure transactions across a distribution network.',
    longDescription:
      'FinTech platform built on a microservices architecture, designed to digitize financial services and secure electronic transactions between actors in a distribution network.',
    period: 'Jul. 2025 – Dec. 2025',
    category: 'FinTech · Microservices',
    role: 'Frontend Developer',
    contributionTeaser: 'Chief Agent & Distributor (Master) Dashboards',
    contributionNote:
      'My contribution is exclusively frontend: I fully designed and developed the Chief Agent Dashboard and the Distributor (Master) Dashboard.',
    overview: [
      'MasaFinance digitizes the financial services of a distribution network and secures electronic transactions between its various stakeholders.',
      'The platform relies on a microservices architecture capable of processing financial operations in real time, with secure authentication, transaction management, KYC processes, and an OTP service.',
      'Overall project stack: Vue.js 3 / TypeScript / Pinia / Tailwind frontend, NestJS / Node.js / TypeORM / PostgreSQL backend, REST API and JWT.',
    ],
    contributionHighlights: [
      {
        title: 'Chief Agent Dashboard',
        description:
          'End-to-end design and development of the Chief Agent interface (UI, workflows, API integration).',
      },
      {
        title: 'Distributor (Master) Dashboard',
        description:
          'End-to-end design and development of the Master Distributor workspace (supervision and operations).',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'UI architecture and reusable components for both dashboards',
          'REST API integration and authentication on the client side',
          'Business workflows tied to Chief Agent and Distributor (Master) roles',
          'Stack: Vue.js 3, TypeScript, Vite, Pinia, Tailwind CSS',
        ],
      },
    ],
    features: [
      {
        title: 'Financial digitization',
        description:
          'Digitized financial services for actors across the distribution network.',
      },
      {
        title: 'Secure transactions',
        description:
          'Reliable processing of electronic operations between stakeholders.',
      },
      {
        title: 'Business dashboards',
        description:
          'Web workspaces for administrators, distributors, and chief agents.',
      },
      {
        title: 'JWT authentication',
        description: 'Secure access to application areas via JWT tokens.',
      },
      {
        title: 'KYC & OTP',
        description:
          'Identity verification and one-time passwords to secure operations.',
      },
      {
        title: 'Real time',
        description:
          'Architecture capable of processing financial operations in real time.',
      },
    ],
    architecture: [
      {
        title: 'Clients & dashboards',
        description:
          'Business web interfaces (admin, distributor, chief agent) on the FinTech network.',
      },
      {
        title: 'REST API',
        description: 'Secure API layer exposing business services.',
      },
      {
        title: 'Auth & security',
        description: 'JWT, OTP, and access controls to protect data flows.',
      },
      {
        title: 'Business services',
        description: 'Transactions, KYC, and distributed financial logic.',
      },
      {
        title: 'PostgreSQL + TypeORM',
        description: 'Relational persistence of critical data.',
      },
    ],
    techStack: [
      {
        label: 'Frontend',
        items: ['Vue.js 3', 'TypeScript', 'Vite', 'Pinia', 'Tailwind CSS'],
      },
      {
        label: 'Backend',
        items: ['NestJS', 'Node.js', 'TypeORM', 'PostgreSQL', 'REST API', 'JWT'],
      },
      { label: 'Tools', items: ['Git', 'GitHub', 'Postman'] },
      { label: 'Infra', items: ['Microservices', 'MinIO'] },
    ],
  },

  'couvoir-baf': {
    description:
      'Management ERP for a poultry hatchery: digitizing operations from egg intake to chick sales.',
    longDescription:
      'ERP designed to digitize and centralize operations at a poultry hatchery, from egg imports through chick sales, including traceability, financial management, and reporting.',
    period: 'Oct. 2025 – Jan. 2026',
    category: 'ERP · Poultry hatchery',
    role: 'Backend Developer',
    contributionTeaser: 'Backend architecture, business modules & NestJS REST API',
    contributionNote:
      'On a two-developer team, my contribution is backend: architecture design, business modules, and secure REST APIs with NestJS.',
    overview: [
      'Couvoir BAF centralizes the hatchery lifecycle: egg stock, incubations, hatches, sales, customers, suppliers, finance, and cash flow.',
      'The application tracks production and commercial flows through to chick sales, with full traceability and reports for operational oversight.',
      'The backend, built with NestJS, TypeScript, TypeORM, and MySQL, exposes secure REST APIs (JWT) documented via Swagger.',
    ],
    contributionHighlights: [
      {
        title: 'Backend architecture',
        description:
          'Contributed to backend architecture design and structuring of business services.',
      },
      {
        title: 'Modules & REST API',
        description:
          'Development of business modules and secure REST APIs (JWT) documented with Swagger.',
      },
    ],
    contributions: [
      {
        area: 'backend',
        items: [
          'Authentication, users, and roles',
          'Supplier and customer management',
          'Sales, payments, and cash flow',
          'Hatchery operation traceability',
          'Reporting and complex business rules',
          'Stack: NestJS, TypeScript, MySQL, TypeORM, JWT, Swagger',
        ],
      },
    ],
    features: [
      {
        title: 'Eggs → chicks lifecycle',
        description: 'Tracking from egg imports through to chick sales.',
      },
      {
        title: 'Stock & production',
        description: 'Eggs, incubations, and hatches in one place.',
      },
      {
        title: 'Sales & commerce',
        description: 'Customers, suppliers, and sales within a single ERP.',
      },
      {
        title: 'Finance & cash flow',
        description: 'Payments, cash registers, expenses, and financial oversight.',
      },
      {
        title: 'Traceability',
        description: 'Full history of operations across the entire chain.',
      },
      {
        title: 'Reporting',
        description: 'Reports for monitoring and decision-making.',
      },
    ],
    architecture: [
      {
        title: 'ERP clients',
        description: 'Management interfaces for hatchery operations.',
      },
      {
        title: 'NestJS REST API',
        description: 'Secure, documented business endpoints (Swagger).',
      },
      {
        title: 'Auth & roles',
        description: 'JWT, users, and role-based access control.',
      },
      {
        title: 'Business modules',
        description: 'Stock, sales, finance, traceability, and reports.',
      },
      {
        title: 'MySQL + TypeORM',
        description: 'Enterprise data modeling and persistence.',
      },
    ],
    techStack: [
      {
        label: 'Backend',
        items: ['NestJS', 'TypeScript', 'TypeORM', 'MySQL', 'REST API', 'JWT'],
      },
      { label: 'Docs', items: ['Swagger'] },
      { label: 'Tools', items: ['Git'] },
      {
        label: 'Focus',
        items: ['Backend architecture', 'Business rules', 'DB modeling'],
      },
    ],
  },

  dynexcafrica: {
    description:
      'Official website for the DynExcAfrica NGO: bilingual showcase, business forms, and admin back office.',
    longDescription:
      'Web application for the DynExcAfrica NGO (DEA), dedicated to empowering African women in STEM fields. Institutional and operational site: mission presentation, publications, registrations, partnerships, donations, and secure administration.',
    category: 'NGO · STEM Africa',
    role: 'Full Stack Developer',
    contributionTeaser: 'Bilingual showcase, business forms & admin + NestJS API',
    contributionNote:
      'Full-stack development of the official website: React frontend (showcase + admin) and NestJS backend (API, auth, uploads), deployed in Docker behind Traefik.',
    overview: [
      'DynExcAfrica is a full-stack monorepo: React frontend (public site + admin dashboard) and NestJS backend (API, auth, registrations, uploads), deployed together in Docker behind Traefik at www.dynexcafrica.org.',
      'The site presents the mission, team, projects and programs, publishes success stories, partners and reports, and collects registrations, partnership requests, applications, and donations.',
      'The API is consumed via /api (backend not exposed directly). MySQL data (Hostinger), files on MinIO (S3), Traefik reverse proxy with Let\'s Encrypt HTTPS, Nginx serving the frontend.',
    ],
    contributionHighlights: [
      {
        title: 'Public frontend & admin',
        description:
          'Bilingual React interface (FR/EN): institutional showcase, business forms, and administration dashboard.',
      },
      {
        title: 'NestJS API & deployment',
        description:
          'Secure REST API (JWT), MySQL, MinIO, Swagger documentation, Docker Compose + Traefik HTTPS.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'Public React 18 + TypeScript site (Vite, Tailwind, Framer Motion)',
          'Admin dashboard and React Router navigation',
          'FR/EN i18n (react-i18next), SEO (react-helmet-async)',
          'React Hook Form + Zod forms, EmailJS',
          'Leaflet, Swiper, Recharts for maps, carousels, and charts',
        ],
      },
      {
        area: 'backend',
        items: [
          'NestJS API: data, admin auth (JWT / Passport), bcrypt',
          'TypeORM + MySQL, Swagger',
          'Multer uploads + AWS SDK S3 to MinIO',
          'PDFKit / ExcelJS exports',
          'Docker Compose, Nginx, Traefik (SSL), MinIO',
        ],
      },
    ],
    features: [
      {
        title: 'Institutional showcase',
        description: 'Mission, team, projects, programs, and published content.',
      },
      {
        title: 'Stories & partners',
        description: 'Success stories, partners, and reports accessible to the public.',
      },
      {
        title: 'Business forms',
        description: 'Registrations, partnerships, applications, and donations.',
      },
      {
        title: 'Secure admin',
        description: 'Back office to manage content and requests.',
      },
      {
        title: 'Bilingual FR / EN',
        description: 'International experience with react-i18next.',
      },
      {
        title: 'Docker + Traefik prod',
        description: 'HTTPS deployment at www.dynexcafrica.org.',
      },
    ],
    architecture: [
      {
        title: 'Frontend',
        description: 'React (showcase + admin), Vite build, served by Nginx.',
      },
      {
        title: 'API /api',
        description:
          'NestJS — data, auth, registrations, uploads (not exposed directly).',
      },
      {
        title: 'MySQL',
        description: 'Hostinger database via TypeORM.',
      },
      {
        title: 'MinIO',
        description: 'S3-compatible object storage for files.',
      },
      {
        title: 'Traefik + Docker',
        description: 'Reverse proxy, Let\'s Encrypt SSL, Compose orchestration.',
      },
    ],
    techStack: [
      {
        label: 'Frontend',
        items: [
          'React 18',
          'TypeScript',
          'Vite',
          'Tailwind CSS',
          'Framer Motion',
          'react-i18next',
        ],
      },
      {
        label: 'Backend',
        items: ['NestJS', 'TypeORM', 'MySQL', 'JWT', 'Swagger', 'MinIO'],
      },
      {
        label: 'DevOps',
        items: ['Docker', 'Docker Compose', 'Nginx', 'Traefik'],
      },
      {
        label: 'Extras',
        items: ['Zod', 'Leaflet', 'Recharts', 'PDFKit', 'ExcelJS'],
      },
    ],
  },

  'dynexc-gp': {
    description:
      'Internal HR / activity / events platform for DynExcAfrica & FMK — React, Express, MySQL.',
    longDescription:
      'Internal web application for DynExcAfrica and FMK: staff management, attendance, tasks / timesheets, statistics, programs & events, public registrations, activity reports, and email notifications.',
    category: 'HR · Internal platform',
    role: 'Full Stack Developer',
    contributionTeaser: 'HR, attendance, timesheets, events, email & Docker CI/CD',
    contributionNote:
      'Full-stack development of the management platform: React frontend (Standard / Manager / Super Admin roles) and Express backend (API, cron, emails, reports), deployed in Docker behind Traefik with GitHub Actions CI/CD.',
    overview: [
      'DynExc GP centralizes day-to-day organization: accounts and roles, time tracking (clock in/out, Lab time), timesheets (creation, priorities, deadlines, validation), global and personal stats.',
      'It also covers programs and events (standard, special, YWDP, CNR editions, positions), public registrations (visitors, YWDP, forms + PIN), activity reports (generation / sending, optional AI enrichment), and automated emails (assignments, delays, weekly summaries, Super Admin digests).',
      'Architecture: React → Traefik HTTPS → Nginx frontend + Express backend (API, cron, email) → Hostinger MySQL. Monorepo deployed in Docker, GitHub Actions CI/CD to VPS (gp.dynexcafrica.org).',
    ],
    contributionHighlights: [
      {
        title: 'Multi-role workspace',
        description:
          'Standard, Manager, and Super Admin journeys: dashboard, timesheet, time tracking, back office, and org digests.',
      },
      {
        title: 'Automations & prod',
        description:
          'Scheduled emails (delays, summaries, digests), reports (+ optional AI), Docker + Traefik, and GitHub Actions deploy.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'React 18 + TypeScript UI (Vite, Tailwind, React Router)',
          'TanStack Query data fetching, Axios, toasts (react-hot-toast)',
          'Chart.js / ECharts charts, PDF/Excel exports',
          'Socket.IO client for real time',
        ],
      },
      {
        area: 'backend',
        items: [
          'Express 5 API + MySQL (mysql2 pool), JWT / bcrypt',
          'Helmet security, CORS, rate-limit',
          'Nodemailer + node-cron (digests, summaries)',
          'Socket.IO, Puppeteer / docx, AI enrichment (Gemini / Ollama)',
          'Docker Compose, Traefik, Nginx, GitHub Actions → VPS',
        ],
      },
    ],
    features: [
      {
        title: 'Staff & roles',
        description: 'Accounts, titles, organization, active/inactive, 3 access levels.',
      },
      {
        title: 'Attendance / time tracking',
        description: 'Daily clock in/out and Lab time.',
      },
      {
        title: 'Tasks & timesheets',
        description: 'Creation, tracking, priorities, deadlines, and validation.',
      },
      {
        title: 'Programs & events',
        description: 'Events, YWDP, CNR editions, and positions.',
      },
      {
        title: 'Public registrations',
        description: 'Visitors, YWDP, special forms + PIN code.',
      },
      {
        title: 'Reports & digests',
        description:
          'Generation / sending, optional AI, Super Admin digests (Monday 8 a.m. Abidjan).',
      },
    ],
    architecture: [
      {
        title: 'React browser',
        description: 'Interfaces by role (Standard, Manager, Super Admin).',
      },
      {
        title: 'Traefik HTTPS',
        description: 'Reverse proxy + Let\'s Encrypt TLS.',
      },
      {
        title: 'Nginx frontend',
        description: 'React build served in a container.',
      },
      {
        title: 'Express backend',
        description: 'REST API, cron, email, and WebSocket.',
      },
      {
        title: 'Hostinger MySQL',
        description: 'Remote persistence of org data.',
      },
    ],
    techStack: [
      {
        label: 'Frontend',
        items: ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'React Query', 'Socket.IO'],
      },
      {
        label: 'Backend',
        items: ['Node.js', 'Express 5', 'MySQL', 'JWT', 'Nodemailer', 'node-cron'],
      },
      {
        label: 'DevOps',
        items: ['Docker', 'Traefik', 'Nginx', 'GitHub Actions', 'VPS'],
      },
      {
        label: 'Extras',
        items: ['Chart.js', 'jsPDF', 'Puppeteer', 'Gemini / Ollama'],
      },
    ],
  },

  kanie: {
    description:
      'E-commerce & digital services platform: catalog, orders, admin, and Mobile Money payments.',
    longDescription:
      'E-commerce platform designed to digitize the sale of IT products, electronics, and accessories, while centralizing order management, customers, and multiple digital services within a single application.',
    period: 'Jul. 2026 – Aug. 2026',
    category: 'E-commerce · Digital services',
    role: 'Full Stack Developer',
    contributionTeaser: 'Catalog, cart, admin, JWT, Mobile Money & notifications',
    contributionNote:
      'On a two-developer team, I contributed full stack: React frontend and NestJS backend — business features, modern interfaces, and secure REST APIs (API-first).',
    overview: [
      'Kaniè combines an online store and digital services (training, IT products, accessories) in a full-stack React + NestJS application, designed with an API-first architecture.',
      'The platform covers catalog and categories, cart and checkout, an administration back office (products, orders, content), JWT auth with roles, Mobile Money payments, and order tracking notifications.',
      'Built by a two-developer team (Jul. 2026 – Aug. 2026), with Docker, Git/GitHub, PostgreSQL / TypeORM, and MinIO storage.',
    ],
    contributionHighlights: [
      {
        title: 'Purchase journey',
        description:
          'Catalog, categories, cart, and checkout for a smooth e-commerce experience.',
      },
      {
        title: 'Admin, payments & notifications',
        description:
          'Products/orders/content back office, JWT & roles, Mobile Money, and tracking notifications.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'React + TypeScript interfaces (React Router, Axios)',
          'Catalog, cart, and order journey',
          'Modern administration back office',
        ],
      },
      {
        area: 'backend',
        items: [
          'Secure NestJS REST APIs (JWT, roles)',
          'Product, order, and customer management',
          'Mobile Money payment integration',
          'Automated tracking notifications',
          'PostgreSQL / TypeORM, Docker, MinIO',
        ],
      },
    ],
    features: [
      {
        title: 'Catalog & categories',
        description: 'IT products, electronics, and accessories organized by category.',
      },
      {
        title: 'Cart & orders',
        description: 'Purchase flow through to order confirmation.',
      },
      {
        title: 'Admin back office',
        description: 'Management of products, orders, and content.',
      },
      {
        title: 'Auth & roles',
        description: 'JWT authentication and access control.',
      },
      {
        title: 'Mobile Money',
        description: 'Payments via Mobile Money solutions.',
      },
      {
        title: 'Notifications',
        description: 'Automatic order tracking for customers.',
      },
    ],
    architecture: [
      {
        title: 'React frontend',
        description: 'Public store and administration interfaces.',
      },
      {
        title: 'NestJS API',
        description: 'API-first REST API for e-commerce business logic.',
      },
      {
        title: 'JWT auth',
        description: 'Security and user role management.',
      },
      {
        title: 'PostgreSQL',
        description: 'TypeORM persistence for products, customers, and orders.',
      },
      {
        title: 'Docker & MinIO',
        description: 'Containerization and object storage.',
      },
    ],
    techStack: [
      {
        label: 'Frontend',
        items: ['React', 'TypeScript', 'React Router', 'Axios'],
      },
      {
        label: 'Backend',
        items: ['NestJS', 'Node.js', 'TypeORM', 'PostgreSQL', 'REST API', 'JWT'],
      },
      { label: 'Tools', items: ['Docker', 'Git', 'GitHub'] },
      { label: 'Extras', items: ['MinIO', 'Mobile Money'] },
    ],
  },

  'cnr-ci': {
    description:
      'Official website of the National Robotics Championship: WordPress + custom business plugins.',
    longDescription:
      'Website for the National Robotics Championship – Côte d\'Ivoire, organized by DynExcAfrica with First Lego League. Institutional showcase and operational platform to bring together schools, teams, mentors, volunteers, partners, and the public around a STEM education ecosystem.',
    category: 'Education · Robotics',
    role: 'WordPress Developer',
    contributionTeaser: 'WordPress, business plugins & registration / recruitment flows',
    contributionNote:
      'WordPress site setup for the CNR and development of internal plugins for specific features: team registrations, applications (mentor, volunteer, coach, jury), and operational championship content.',
    overview: [
      'The National Robotics Championship – CI targets middle and high school students nationwide, with a strong focus on all-girls teams. The site presents the mission, vision, 6-stage journey (preparation, launch, training, final show, STEM Camp), and partnerships.',
      'Beyond the showcase, the platform lets visitors join the adventure (mentor, volunteer, referee/jury, coach), register teams, follow innovative projects, and become partners — with seat reservations and editorial content (gallery, key figures, Fab Lab for winners).',
      'Built on WordPress, with several internal plugins for precise business features (registrations, recruitment forms, content management tied to teams and the program).',
    ],
    contributionHighlights: [
      {
        title: 'CNR WordPress site',
        description:
          'Official site structure: showcase, innovation journey, partners, gallery, and calls to action.',
      },
      {
        title: 'Internal plugins',
        description:
          'Custom plugins for team registrations, recruitment (mentor / volunteer / coach / jury), and CNR business needs.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'WordPress theme integration and customization',
          'Institutional pages and UX flows (join, teams, partners)',
          'Responsive interfaces aligned with CNR branding',
        ],
      },
      {
        area: 'backend',
        items: [
          'Internal WordPress plugin development',
          'Registration business logic and recruitment forms',
          'Content management tied to teams and the program',
          'Stack: WordPress, PHP, MySQL, JavaScript',
        ],
      },
    ],
    features: [
      {
        title: 'Showcase & vision',
        description: 'Mission, STEM commitment, and 6-stage championship journey.',
      },
      {
        title: 'Join us',
        description: 'Become a mentor, volunteer, referee/jury, or coach.',
      },
      {
        title: 'Teams & registrations',
        description: 'Competing teams, registrations, and innovative projects.',
      },
      {
        title: 'Partners',
        description: 'Organizer space, partners, and become a partner.',
      },
      {
        title: 'Events & gallery',
        description: 'Final show, STEM Camp, Fab Lab, and edition gallery.',
      },
      {
        title: 'Business plugins',
        description: 'Custom WordPress features for the CNR.',
      },
    ],
    architecture: [
      {
        title: 'WordPress',
        description: 'CMS for content, pages, and editorial administration.',
      },
      {
        title: 'Theme & UI',
        description: 'Responsive showcase aligned with CNR branding.',
      },
      {
        title: 'Custom plugins',
        description:
          'Internal PHP modules for business flows (registrations, recruitment).',
      },
      {
        title: 'MySQL',
        description: 'WordPress persistence and plugin data.',
      },
      {
        title: 'Web prod',
        description: 'Public site: championnatnationalrobotique.com',
      },
    ],
    techStack: [
      { label: 'CMS', items: ['WordPress', 'PHP'] },
      {
        label: 'Custom',
        items: ['Internal plugins', 'WP hooks', 'Custom post types'],
      },
      { label: 'Data', items: ['MySQL'] },
      { label: 'Front', items: ['HTML', 'CSS', 'JavaScript'] },
    ],
  },

  'ccnr-classement': {
    description:
      'Real-time ranking platform for the National Robotics Championship: podium, scoring rubrics, round winners, quizzes, partners, stage monitor, and management dashboard.',
    longDescription:
      'Web application dedicated to live tracking of the National Robotics Championship (CNR-CI): public display of rankings, scoring rubrics and round winners, quiz games, partner space, stage monitor view, and an administration dashboard to manage everything.',
    category: 'Events · Real time',
    role: 'Full Stack Developer',
    contributionTeaser: 'Live ranking, stage monitor & administration dashboard',
    contributionNote:
      'Design and development of the CNR real-time ranking platform: public views (rankings, rubrics, winners, quizzes, partners, monitor) and a management dashboard to control scores, rounds, and live content.',
    overview: [
      'During the show and rounds, the public and teams follow a real-time ranking (top 3 podium, scoreboard, best run) synchronized with results entered by the organization.',
      'The platform also covers scoring rubrics, round winner / grand winner announcements, interactive quizzes, partner highlights, and a monitor view suited to venue screens.',
      'A management dashboard lets admins manage teams, scores, rounds, quiz content, and partners. Public prod: ccnr.dynexcafrica.org/ranking.',
    ],
    contributionHighlights: [
      {
        title: 'Live public views',
        description:
          'Ranking / podium, rubrics, round winners, quizzes, and partners for the public and venue screens.',
      },
      {
        title: 'Management dashboard',
        description:
          'Back office to manage teams, scores, rounds, quizzes, and partners in event conditions.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'Live UI: podium, ranking table, winner announcements, and rubrics',
          'Quiz, partner, and monitor views optimized for large screens',
          'Administration dashboard (live data management)',
          'UI stack: React, TypeScript, Vite, Tailwind CSS',
        ],
      },
      {
        area: 'backend',
        items: [
          'APIs and business logic for scores / rounds / teams',
          'Real-time synchronization of public displays',
          'Quiz and partner content management from the dashboard',
        ],
      },
    ],
    features: [
      {
        title: 'Real-time ranking',
        description: 'Top 3 podium and scoreboard synchronized during rounds.',
      },
      {
        title: 'Scoring rubrics',
        description: 'Display of rubrics and championship scoring rules.',
      },
      {
        title: 'Round winners',
        description:
          'Live announcements of round winners and grand winner (confetti, final score).',
      },
      {
        title: 'Quiz games',
        description: 'Interactive quizzes to engage the audience during the event.',
      },
      {
        title: 'Partners & monitor',
        description: 'Partner highlights and monitor view for venue screens.',
      },
      {
        title: 'Management dashboard',
        description:
          'Centralized administration of scores, rounds, quizzes, and live content.',
      },
    ],
    architecture: [
      {
        title: 'Public SPA',
        description: 'Ranking, rubrics, winners, quiz, partner, and monitor views.',
      },
      {
        title: 'Real time',
        description: 'Live updates of scores and announcements during rounds.',
      },
      {
        title: 'Admin dashboard',
        description: 'Back office to manage teams, scores, rounds, and content.',
      },
      {
        title: 'CNR branding',
        description: 'Orange / green / dark theme for stage and public screens.',
      },
      {
        title: 'Prod',
        description: 'ccnr.dynexcafrica.org/ranking',
      },
    ],
    techStack: [
      { label: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
      {
        label: 'Live',
        items: ['Real-time ranking', 'Stage monitor', 'Quiz'],
      },
      {
        label: 'Admin',
        items: ['Dashboard', 'Scores & rounds', 'Partners'],
      },
      { label: 'Product', items: ['CNR-CI', 'STEM events'] },
    ],
  },

  mecagirls: {
    description:
      '500 MecaGirls program website: career guidance, personalized pathways, job catalog, and testimonials for young women in mechanics and industry.',
    longDescription:
      '500 MecaGirls (by DynExcAfrica) promotes gender equality in industrial and mechanical trades. The site guides young women toward technical careers: job discovery, pathway planning, video testimonials, and registration for orientation days.',
    category: 'Education · STEM Guidance',
    role: 'Frontend Developer',
    contributionTeaser: 'Showcase, guidance pathway & job catalog',
    contributionNote:
      'Design and development of the 500 MecaGirls website: landing page, multi-step "Define My Pathway" journey, job list (search, filters, PDF), and testimonial / orientation sections.',
    overview: [
      'The program aims to inspire and train young women in mechanics and industry, in partnership with DynExcAfrica and German cooperation.',
      'The site offers a guided "Define My Pathway" journey (interests, industrial jobs), a catalog of 40+ jobs with search / filters and PDF export, video testimonials by cohort, and CTAs to join orientation days.',
      'Showcase and STEM guidance tool to broaden girls\' access to technical fields. Prod: mecagirls.dynexcafrica.org.',
    ],
    contributionHighlights: [
      {
        title: 'Guidance pathway',
        description:
          'Multi-step funnel to target interests and industrial / mechanical jobs.',
      },
      {
        title: 'Job catalog',
        description:
          'Searchable / filterable list (40+ jobs) with PDF export for guidance.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'Landing page and MecaGirls visual identity (DynExcAfrica orange / blue)',
          '"Define My Pathway" wizard (steps, interests, jobs)',
          'Job catalog modal: search, categories, PDF download',
          'Video testimonial sections and orientation day CTAs',
          'Stack: React, TypeScript, Vite, Tailwind CSS',
        ],
      },
    ],
    features: [
      {
        title: 'Program showcase',
        description: 'Presentation of 500 MecaGirls and the mission for gender equality in mechanics.',
      },
      {
        title: 'Define My Pathway',
        description: 'Guided multi-step journey to steer toward technical careers.',
      },
      {
        title: 'Job list',
        description: 'Filterable catalog (automotive, maintenance, welding…) + PDF export.',
      },
      {
        title: 'Testimonials',
        description: 'Inspiring videos from cohorts: from school to the workshop.',
      },
      {
        title: 'Orientation days',
        description: 'CTA to register and participate in program events.',
      },
      {
        title: 'Partners',
        description: 'Highlighting DynExcAfrica and German cooperation.',
      },
    ],
    architecture: [
      {
        title: 'React SPA',
        description: 'Vite frontend for the showcase and interactive pathways.',
      },
      {
        title: 'Guidance UX',
        description: 'Multi-step wizard and job / PDF modals.',
      },
      {
        title: 'Media content',
        description: 'Video testimonials and program pages.',
      },
      {
        title: 'Prod',
        description: 'mecagirls.dynexcafrica.org',
      },
    ],
    techStack: [
      { label: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
      { label: 'Product', items: ['Guidance', 'Job catalog', 'Testimonials'] },
      { label: 'Program', items: ['500 MecaGirls', 'DynExcAfrica', 'STEM'] },
    ],
  },

  classstem: {
    description:
      'ClassStem STEM Moodle LMS: custom theme & plugins, programming, robotics, and 3D printing pathways.',
    longDescription:
      'ClassStem is DynExcAfrica\'s learning platform: programming, robotics, and 3D printing in an interactive experience for students and trainers — built on Moodle with a custom theme and plugins.',
    category: 'LMS · STEM Training',
    role: 'Moodle Developer',
    contributionTeaser: 'Moodle theme, plugins & STEM course management',
    contributionNote:
      'ClassStem setup on Moodle: creation and installation of a custom theme, business plugins, and management / structuring of courses (programming, robotics, 3D printing).',
    overview: [
      'ClassStem brings together three full pathways — Programming (Python, JavaScript, C++), 3D Printing (Blender, Fusion 360), and Robotics (Arduino, Raspberry Pi) — within a bilingual Moodle LMS (FR/EN).',
      'Powered by DynExcAfrica ("Train, Innovate, Inspire"), the platform builds on 7 years of STEM expertise, 20+ trainers, and 5,000+ learners, with dedicated spaces for students and teachers/trainers.',
      'Moodle setup: custom theme creation and installation, plugin development/installation, course and training module structuring and management. Prod: classstem.dynexcafrica.org.',
    ],
    contributionHighlights: [
      {
        title: 'Custom Moodle theme',
        description:
          'Design and installation of a theme aligned with DynExcAfrica / ClassStem identity.',
      },
      {
        title: 'Plugins & courses',
        description:
          'Plugin creation / installation and pedagogical organization of training modules.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'Moodle theme creation and installation',
          'UI customization (home, catalog, learner journey)',
          'Bilingual FR / EN experience',
        ],
      },
      {
        area: 'backend',
        items: [
          'Moodle plugin creation and installation',
          'LMS configuration and course management',
          'Structuring of Programming, 3D Printing, Robotics modules',
          'Stack: Moodle, PHP, MySQL, JavaScript',
        ],
      },
    ],
    features: [
      {
        title: 'Programming pathway',
        description: 'Python, JavaScript, C++, algorithms, and guided projects.',
      },
      {
        title: '3D Printing',
        description: 'Blender, Fusion 360, setup, and advanced techniques.',
      },
      {
        title: 'Robotics',
        description: 'Arduino, Raspberry Pi, sensors, and embedded programming.',
      },
      {
        title: 'Multiple audiences',
        description: 'Dedicated spaces for students and teachers/trainers.',
      },
      {
        title: 'Moodle LMS',
        description: 'Login, courses, certifications, and interactive content.',
      },
      {
        title: 'Theme & plugins',
        description: 'Deep Moodle customization for ClassStem.',
      },
    ],
    architecture: [
      {
        title: 'Moodle LMS',
        description: 'Pedagogical core: courses, roles, enrollments, content.',
      },
      {
        title: 'Custom theme',
        description: 'Visual identity and UX for the showcase / platform.',
      },
      {
        title: 'Plugins',
        description: 'Business extensions installed and adapted for STEM needs.',
      },
      {
        title: 'MySQL',
        description: 'Moodle database (users, courses, activities).',
      },
      {
        title: 'Prod',
        description: 'Hosting: classstem.dynexcafrica.org',
      },
    ],
    techStack: [
      { label: 'LMS', items: ['Moodle', 'PHP'] },
      { label: 'Custom', items: ['Custom theme', 'Moodle plugins'] },
      { label: 'Data', items: ['MySQL'] },
      { label: 'Front', items: ['HTML', 'CSS', 'JavaScript'] },
    ],
  },

  engeem: {
    description:
      'Angular product website for ENGEEM: Data Control Plane, governance, and reliability of data / AI decisions.',
    longDescription:
      'Official ENGEEM website — a Data Control Plane (DSaaP) platform that makes business decisions — dashboards, AI outputs, automated actions — reliable, explainable, and under control. Product showcase, industrial solutions, resources, and console.',
    category: 'Data · Control Plane',
    role: 'Frontend Developer',
    contributionTeaser: 'Angular product site — DSaaP showcase, platform & solutions',
    contributionNote:
      'Development of the ENGEEM product website in Angular: Data Control Plane showcase, platform / solutions / resources pages, and dark conversion-oriented UI experience.',
    overview: [
      'ENGEEM addresses the real enterprise problem: not a lack of data, but loss of control over what systems produce (pipelines, dashboards, AI models). The site presents the control plane that guarantees reliable, contractual, and auditable outcomes.',
      'Content structured around Why ENGEEM, Platform (YIALI Gateway, EDSM metadata, SLO, agentic observability, security), Solutions (finance, telecom, retail, energy, public sector…), use cases (Safe AI / RAG, executable governance, cross-domain automation), and deployments (cloud, BYOC, on-prem, hybrid).',
      'Modern Angular website (app-root, modular build), premium dark UX, multi-section navigation, and CTAs toward workshop / use cases / console. Prod: www.engeem.com.',
    ],
    contributionHighlights: [
      {
        title: 'Angular product showcase',
        description:
          'Modern SPA interface: hero, "reliable by design" messaging, platform navigation and CTAs.',
      },
      {
        title: 'Business content journey',
        description:
          'Structuring of Platform, Solutions, Industries, Use cases, and Resources sections for control plane positioning.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'Angular / TypeScript frontend development of the product website',
          'Premium dark UI integration and navigation components',
          'Why ENGEEM, Platform, Solutions, Resources, Pricing pages',
          'Responsive experience and CTAs (workshop, use cases, console)',
        ],
      },
    ],
    features: [
      {
        title: 'Reliable by design',
        description: 'Key message: data / AI decisions always under control.',
      },
      {
        title: 'DSaaP Platform',
        description: 'Control plane, YIALI gateway, EDSM metadata, SLO & security.',
      },
      {
        title: 'Industrial solutions',
        description: 'Finance, telecom, retail, energy, public sector & compliance.',
      },
      {
        title: 'Safe AI & RAG',
        description: 'Use cases for executable governance and AI outcome control.',
      },
      {
        title: 'Flexible deployments',
        description: 'Cloud, BYOC, on-prem, hybrid & multi-cloud.',
      },
      {
        title: 'Resources & console',
        description: 'Library, insights, documentation, and console access.',
      },
    ],
    architecture: [
      {
        title: 'Angular SPA',
        description: 'Modular frontend application (app-root, JS bundles).',
      },
      {
        title: 'Product content',
        description: 'Why / Platform / Solutions / Resources / Pricing.',
      },
      {
        title: 'DSaaP positioning',
        description: 'Data Control Plane overlay on existing stacks.',
      },
      {
        title: 'CTA & conversion',
        description: 'Workshop, use cases, console, and pricing.',
      },
      {
        title: 'Prod',
        description: 'www.engeem.com',
      },
    ],
    techStack: [
      { label: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS'] },
      { label: 'UI', items: ['HTML', 'CSS', 'SPA'] },
      { label: 'Product', items: ['DSaaP', 'Data Control Plane', 'YIALI'] },
      { label: 'Delivery', items: ['Product site', 'Responsive'] },
    ],
  },

  'engeem-docs': {
    description:
      'ENGEEM technical documentation: Docusaurus, React components, and React Bits — DSaaP / YIALI guides.',
    longDescription:
      'ENGEEM documentation site to design, deploy, and operate governed real-time data products. Guides, architecture, deployment, and references for the Data Streaming-as-a-Product platform (DSaaP / YIALI).',
    category: 'Docs · DSaaP',
    role: 'Frontend Developer',
    contributionTeaser: 'Docusaurus, React / MDX, React Bits & bilingual docs',
    contributionNote:
      'Setup and development of ENGEEM documentation with Docusaurus, React / MDX components, and React Bits for a modern reading and exploration experience.',
    overview: [
      'ENGEEM Docs covers the full journey: Get Started, Data Automation, DSaaP — YIALI, Data Centers, Data Products, Security & Governance, Cluster / SLA & Pricing, and References — bilingual English / Français.',
      'The docs present a Kafka-native data productization platform: schema-bound ingestion, declarative modeling, native governance (RBAC, metadata contracts), API/SQL/dashboard data products, and cloud, on-prem, or hybrid deployments.',
      'Built with Docusaurus, enriched with custom React components and React Bits for a modern documentation UX (search, navigation, hybrid marketing-doc pages). Prod: docs.engeem.com.',
    ],
    contributionHighlights: [
      {
        title: 'Docusaurus site',
        description:
          'Doc structure: Get Started, Platform, YIALI / DSaaP, Security, Deploy, and References.',
      },
      {
        title: 'React & React Bits',
        description:
          'Custom React components and React Bits to enrich pages beyond standard Markdown.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'Docusaurus configuration and theming',
          'MDX pages and technical content (architecture, guides, references)',
          'Custom React components for rich sections',
          'React Bits integration and UI micro-interactions',
          'i18n English / Français',
        ],
      },
    ],
    features: [
      {
        title: 'Get Started',
        description: 'Platform vision, architecture, and first data journey.',
      },
      {
        title: 'DSaaP — YIALI',
        description: 'Programmable control plane on Kafka, schemas, and contracts.',
      },
      {
        title: 'Data Products',
        description: 'Publish governed data products without plumbing.',
      },
      {
        title: 'Security & Governance',
        description: 'Identity, RBAC, EDSM, and centralized access.',
      },
      {
        title: 'Deploy & Operate',
        description: 'Docker, Kubernetes, Terraform, SLA, and pricing.',
      },
      {
        title: 'Bilingual EN / FR',
        description: 'Documentation available in English and French.',
      },
    ],
    architecture: [
      {
        title: 'Docusaurus',
        description: 'Documentation generator (routing, search, versioning).',
      },
      {
        title: 'MDX + React',
        description: 'Markdown content enriched with React components.',
      },
      {
        title: 'React Bits',
        description: 'UI components / effects for a more engaging doc experience.',
      },
      {
        title: 'i18n',
        description: 'English / Français localization.',
      },
      {
        title: 'Prod',
        description: 'docs.engeem.com',
      },
    ],
    techStack: [
      { label: 'Docs', items: ['Docusaurus', 'MDX'] },
      { label: 'UI', items: ['React', 'TypeScript', 'React Bits'] },
      { label: 'Product', items: ['DSaaP', 'YIALI', 'Kafka-native'] },
      { label: 'Delivery', items: ['i18n EN/FR', 'Search'] },
    ],
  },

  pimedia: {
    description:
      'WordPress news media for national and international political coverage — sections, live updates, and continuous publishing.',
    longDescription:
      'PIMÉDIA is a continuous national and international political news site. WordPress editorial platform structured for the front page, analysis, op-eds, podcasts, and live coverage.',
    category: 'Media · News',
    role: 'WordPress Developer',
    contributionTeaser: 'WordPress media site — sections, front page & editorial publishing',
    contributionNote:
      'Design and setup of the PIMÉDIA WordPress site: editorial structure, political sections, theme customization, and reading experience for a continuous news media outlet.',
    overview: [
      'PIMÉDIA covers African and international political news: diplomatic analysis, elections, institutions, crises, and commentary. Dedicated sections (Front Page, Analysis, Op-eds, Podcasts, Live) and thematic blocks (Government & Institutions, National Assembly, Justice, Economy, ECOWAS…).',
      'The site offers a classic media experience: breaking news, recent / popular articles, newsletter, editorial pages (about us, contact, advertising, legal notice), and social media presence.',
      'Designed and deployed on WordPress for smooth editorial publishing, with theme customization and content organization for an African political media outlet. Prod: pimedia.africa.',
    ],
    contributionHighlights: [
      {
        title: 'WordPress media site',
        description:
          'Setup of the PIMÉDIA showcase and content architecture for the editorial team.',
      },
      {
        title: 'Sections & reading journey',
        description:
          'Organization of Front Page, Analysis, Op-eds, Podcasts, Live, and institutional pages.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'WordPress media theme customization',
          'Front page layout, article lists, and thematic blocks',
          'About us, editorial, contact, newsletter pages',
        ],
      },
      {
        area: 'backend',
        items: [
          'WordPress configuration and editorial taxonomies / categories',
          'Organization of political and international content',
          'Stack: WordPress, PHP, MySQL',
        ],
      },
    ],
    features: [
      {
        title: 'Front page & Breaking',
        description: 'News feed and highlighting of hot topics.',
      },
      {
        title: 'Analysis & Op-eds',
        description: 'Political analysis and opinion pieces.',
      },
      {
        title: 'Live',
        description: 'Live coverage of major events.',
      },
      {
        title: 'Business sections',
        description: 'Institutions, elections, justice, economy, ECOWAS…',
      },
      {
        title: 'Podcasts',
        description: 'Audio formats to dive deeper into the news.',
      },
      {
        title: 'Newsletter',
        description: 'Subscription to top political news.',
      },
    ],
    architecture: [
      {
        title: 'WordPress',
        description: 'Editorial CMS for articles, categories, and media.',
      },
      {
        title: 'Media theme',
        description: 'Press layout (front page, lists, sidebars).',
      },
      {
        title: 'Sections',
        description: 'Taxonomies for national / international politics.',
      },
      {
        title: 'MySQL',
        description: 'Persistence of WP content and users.',
      },
      {
        title: 'Prod',
        description: 'pimedia.africa',
      },
    ],
    techStack: [
      { label: 'CMS', items: ['WordPress', 'PHP'] },
      { label: 'Front', items: ['HTML', 'CSS', 'JavaScript'] },
      { label: 'Data', items: ['MySQL'] },
      { label: 'Media', items: ['SEO', 'Newsletter', 'Social'] },
    ],
  },

  wam: {
    description:
      'Web platform for sustainable mobility in West Africa — events, white papers, and partnerships.',
    longDescription:
      'West Africa Mobility (WAM) is the strategic platform dedicated to accelerating resilient, sustainable, and smart mobility solutions in West Africa: innovation, institutional collaboration, and policy recommendations.',
    category: 'Mobility · Events',
    role: 'Frontend Developer',
    contributionTeaser: 'React site — agenda, white papers, registrations & partnerships',
    contributionNote:
      'Frontend development of the West Africa Mobility platform: sustainable mobility showcase, event agenda, resources (white papers), photo gallery, and registration / partnership journeys.',
    overview: [
      'WAM showcases smart transport innovations adapted to the African urban context, connects leaders, investors, and tech players, and produces analysis to guide regional infrastructure policies (ECOWAS).',
      'The site brings together an agenda (summits, workshops, startup showcases), expert panel, white papers, photo gallery, participant registrations, and partnership journeys, with a bilingual FR / EN interface.',
      'Modern web application (React + Vite + Tailwind): premium dark showcase, events / resources / contact pages. Prod: www.westafricamobility.net.',
    ],
    contributionHighlights: [
      {
        title: 'Showcase & agenda',
        description:
          'Home, About, Events pages (summits, workshops) and book / program CTAs.',
      },
      {
        title: 'Resources & conversion',
        description:
          'White papers, photo gallery, participation / partnership forms, and FR/EN i18n.',
      },
    ],
    contributions: [
      {
        area: 'frontend',
        items: [
          'React / Vite / Tailwind UI (dark mode, sticky navigation)',
          'Agenda, speakers, white papers, and photo gallery sections',
          'Event registration and partnership request journeys',
          'Bilingual FR / EN interface',
        ],
      },
    ],
    features: [
      {
        title: 'Sustainable mobility',
        description: 'Focus on smart transport and regional integration.',
      },
      {
        title: 'Agenda & summits',
        description: 'Conferences, workshops, round tables, and showcases.',
      },
      {
        title: 'White papers',
        description: 'Data-driven analysis and recommendations.',
      },
      {
        title: 'Expert panel',
        description: 'Decision-makers and West African mobility specialists.',
      },
      {
        title: 'Registrations & partnerships',
        description: 'Dedicated forms for participants and sponsors.',
      },
      {
        title: 'Photo gallery',
        description: 'Highlights from previous editions.',
      },
    ],
    architecture: [
      {
        title: 'React SPA',
        description: 'Vite frontend served as a client-side monolith application.',
      },
      {
        title: 'Tailwind UI',
        description: 'Dark / light design system and responsive components.',
      },
      {
        title: 'Event content',
        description: 'Agenda, speakers, resources, and gallery.',
      },
      {
        title: 'i18n',
        description: 'Switch FR / EN for a regional audience.',
      },
      {
        title: 'Prod',
        description: 'www.westafricamobility.net',
      },
    ],
    techStack: [
      { label: 'Frontend', items: ['React', 'TypeScript', 'Vite'] },
      { label: 'UI', items: ['Tailwind CSS', 'SPA'] },
      { label: 'Product', items: ['Events', 'White papers', 'Partnerships'] },
      { label: 'Delivery', items: ['i18n FR/EN', 'Responsive'] },
    ],
  },
}
