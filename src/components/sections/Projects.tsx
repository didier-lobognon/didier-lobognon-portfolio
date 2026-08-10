import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react'
import { projects } from '@/data/projects'
import { ProjectCaseStudy } from '@/components/projects/ProjectCaseStudy'
import { viewportOnce } from '@/lib/animations'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'
import { localizeProject } from '@/lib/localize'
import { useLanguage } from '@/i18n/LanguageProvider'
import { useTheme } from '@/i18n/ThemeProvider'

type FilterKey = 'all' | 'featured'
/** heroL/R = grande ; side = petite à côté d’une grande ; base = normale */
type CardSize = 'heroL' | 'heroR' | 'side' | 'base'

const THEME: Record<string, { accent: string; soft: string; labelFr: string; labelEn: string }> = {
  masafinance: { accent: '#12B76A', soft: 'rgba(18,183,106,0.22)', labelFr: 'FinTech', labelEn: 'FinTech' },
  'couvoir-baf': { accent: '#EA580C', soft: 'rgba(234,88,12,0.22)', labelFr: 'ERP', labelEn: 'ERP' },
  dynexcafrica: { accent: '#3B82F6', soft: 'rgba(59,130,246,0.22)', labelFr: 'ONG', labelEn: 'NGO' },
  'dynexc-gp': { accent: '#F8FAFC', soft: 'rgba(248,250,252,0.18)', labelFr: 'RH', labelEn: 'HR' },
  kanie: { accent: '#7C3AED', soft: 'rgba(124,58,237,0.22)', labelFr: 'E-commerce', labelEn: 'E-commerce' },
  'cnr-ci': { accent: '#14B8A6', soft: 'rgba(20,184,166,0.22)', labelFr: 'Robotique', labelEn: 'Robotics' },
  'ccnr-classement': { accent: '#F97316', soft: 'rgba(249,115,22,0.22)', labelFr: 'Live CNR', labelEn: 'Live CNR' },
  mecagirls: { accent: '#FF6A00', soft: 'rgba(255,106,0,0.22)', labelFr: 'STEM', labelEn: 'STEM' },
  classstem: { accent: '#F59E0B', soft: 'rgba(245,158,11,0.22)', labelFr: 'LMS', labelEn: 'LMS' },
  engeem: { accent: '#22D3EE', soft: 'rgba(34,211,238,0.22)', labelFr: 'Data', labelEn: 'Data' },
  'engeem-docs': { accent: '#A78BFA', soft: 'rgba(167,139,250,0.22)', labelFr: 'Docs', labelEn: 'Docs' },
  pimedia: { accent: '#DC2626', soft: 'rgba(220,38,38,0.22)', labelFr: 'Média', labelEn: 'Media' },
  wam: { accent: '#0EA5E9', soft: 'rgba(14,165,233,0.22)', labelFr: 'Mobilité', labelEn: 'Mobility' },
}

/**
 * Cycle 10 cartes :
 * L1 → grand (gauche) + petit
 * L2 → 3 normales
 * L3 → petit + grand (droite)
 * L4 → 3 normales (ligne tampon avant la prochaine grosse)
 */
function cardSize(index: number): CardSize {
  const pattern: CardSize[] = [
    'heroL',
    'side',
    'base',
    'base',
    'base',
    'side',
    'heroR',
    'base',
    'base',
    'base',
  ]
  return pattern[index % pattern.length]
}

function spanClass(size: CardSize) {
  if (size === 'heroL' || size === 'heroR') return 'sm:col-span-2 lg:col-span-8'
  return 'sm:col-span-1 lg:col-span-4'
}

function themeOf(id: string, locale: string, project?: Project) {
  const entry = THEME[id]
  if (entry) {
    return {
      accent: entry.accent,
      soft: entry.soft,
      label: locale === 'en' ? entry.labelEn : entry.labelFr,
    }
  }
  if (project?.accent) {
    return {
      accent: project.accent,
      soft: `${project.accent}38`,
      label: project.category?.split(/[·•|/]/)[0]?.trim() ?? (locale === 'en' ? 'Project' : 'Projet'),
    }
  }
  return {
    accent: '#3B82F6',
    soft: 'rgba(59,130,246,0.22)',
    label: locale === 'en' ? 'Project' : 'Projet',
  }
}

function OrbitBorder({ accent, active }: { accent: string; active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.55rem]"
      aria-hidden
      animate={{ opacity: active ? 1 : 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Halo flou — trail plus épais / lisible */}
      <motion.div
        className="absolute top-1/2 left-1/2 aspect-square w-[190%]"
        style={{
          x: '-50%',
          y: '-50%',
          background: `conic-gradient(from 0deg, transparent 0%, transparent 48%, ${accent}55 58%, ${accent}cc 70%, #fff 78%, ${accent} 88%, transparent 96%)`,
          filter: 'blur(5px)',
          opacity: 0.85,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: active ? 1.8 : 3.8,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
      {/* Cœur net du faisceau */}
      <motion.div
        className="absolute top-1/2 left-1/2 aspect-square w-[180%]"
        style={{
          x: '-50%',
          y: '-50%',
          background: `conic-gradient(from 0deg, transparent 0%, transparent 52%, ${accent}88 62%, ${accent} 72%, #fff 80%, ${accent} 88%, transparent 96%)`,
          filter: active ? 'blur(0.4px)' : 'blur(0px)',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: active ? 1.8 : 3.8,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </motion.div>
  )
}

function ProjectCard({
  project,
  index,
  size,
  onOpen,
}: {
  project: Project
  index: number
  size: CardSize
  onOpen: (project: Project) => void
}) {
  const { locale, t } = useLanguage()
  const { isDark } = useTheme()
  const fr = locale === 'fr'
  const p = localizeProject(project, locale)
  const theme = themeOf(p.id, locale, p)
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const ctaCase = fr ? 'Voir détail' : 'View details'
  const ctaSite = fr ? 'Voir le site' : 'Visit site'

  const isHero = size === 'heroL' || size === 'heroR'
  const isSide = size === 'side'
  const mirror = size === 'heroR'
  const needsMore = p.description.length > (isHero ? 140 : 100)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.28), ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative',
        spanClass(size),
        isSide && 'lg:self-center',
        isHero &&
          (isDark
            ? 'z-20 my-2 origin-center scale-[1.035] p-[4px] sm:my-3 lg:mx-2 lg:my-4 lg:min-h-[29rem] lg:scale-[1.045]'
            : 'z-20 my-2 sm:my-3 lg:mx-2 lg:my-4 lg:min-h-[29rem]'),
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isHero && isDark && <OrbitBorder accent={theme.accent} active={hovered} />}

      <motion.article
        whileHover={{ y: isHero ? 0 : -5 }}
        className={cn(
          'group relative z-10 flex h-full overflow-hidden rounded-[1.35rem] border bg-card',
          isHero ? 'flex-col lg:flex-row' : 'flex-col',
          mirror && 'lg:flex-row-reverse',
          isDark ? (isHero ? 'border-white/12' : 'border-white/[0.1]') : 'light-card',
        )}
        style={
          isDark
            ? {
                boxShadow: isHero
                  ? `0 0 0 1px ${theme.accent}40, 0 28px 64px rgba(0,0,0,0.55), 0 0 56px ${theme.accent}28`
                  : `0 0 0 1px ${theme.accent}22, 0 16px 40px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }
            : undefined
        }
      >
        <button
          type="button"
          onClick={() => onOpen(project)}
          data-cursor={project.caseStudy ? ctaCase : project.demo ? ctaSite : ctaCase}
          className={cn(
            'relative z-10 shrink-0 overflow-hidden text-left',
            isHero
              ? 'aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:w-[44%]'
              : 'aspect-[16/10] w-full',
          )}
        >
          <img
            src={p.image}
            alt={fr ? `Aperçu du projet ${p.title}` : `${p.title} project preview`}
            className={cn(
              'h-full w-full object-cover object-top transition-transform duration-700',
              isHero ? 'scale-[1.06]' : 'hover:scale-[1.05]',
            )}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? `linear-gradient(180deg, transparent 40%, var(--color-surface) 100%), linear-gradient(135deg, ${theme.accent}35, transparent 55%)`
                : 'linear-gradient(180deg, transparent 72%, rgba(255,255,255,0.55) 100%)',
            }}
          />

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="rounded-md border border-white/15 bg-black/45 px-2 py-1 font-mono text-[10px] text-white/90 backdrop-blur-sm">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="rounded-md border px-2 py-1 text-[10px] font-medium backdrop-blur-sm"
              style={
                isDark
                  ? {
                      color: theme.accent,
                      borderColor: `${theme.accent}55`,
                      background: `${theme.accent}22`,
                    }
                  : {
                      color: '#0b1220',
                      borderColor: 'rgba(15,23,42,0.14)',
                      background: 'rgba(15,23,42,0.05)',
                    }
              }
            >
              {theme.label}
            </span>
          </div>

          {isHero && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-white/15 bg-black/45 px-2 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm">
              <Sparkles className="h-3 w-3" style={{ color: theme.accent }} />
              Spotlight
            </span>
          )}
        </button>

        <div
          className={cn(
            'relative z-10 flex flex-1 flex-col gap-3',
            isHero ? 'p-5 sm:p-7 lg:w-[56%] lg:justify-center' : 'p-5 sm:p-6',
          )}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
              {p.period ?? p.year}
            </span>
            {p.role && (
              <>
                <span className="text-slate-600" aria-hidden>
                  ·
                </span>
                <span className="text-[11px] text-slate-400">{p.role}</span>
              </>
            )}
          </div>

          <div>
            <h3
              className={cn(
                'font-display font-bold tracking-tight text-text',
                isHero ? 'text-2xl sm:text-3xl' : 'text-xl',
              )}
            >
              {p.title}
            </h3>
            <p
              className={cn(
                'mt-2 leading-relaxed text-muted',
                isHero ? 'text-sm sm:text-base' : 'text-sm',
                !expanded && (isHero ? 'line-clamp-3' : 'line-clamp-2'),
              )}
            >
              {p.description}
            </p>
            {needsMore && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-1.5 text-xs font-medium transition-colors hover:opacity-90"
                style={{ color: theme.accent }}
                data-cursor={expanded ? t.projects.readLess : t.projects.readMore}
              >
                {expanded ? t.projects.readLess : t.projects.readMore}
              </button>
            )}
          </div>

          {p.contributionTeaser && (
            <p className="text-[11px] leading-snug text-slate-400">
              <span className="font-medium" style={{ color: isDark ? theme.accent : '#0b1220' }}>
                {fr ? 'Contribution' : 'Contribution'}
              </span>
              <span className="text-slate-600"> — </span>
              {p.contributionTeaser}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {p.technologies.slice(0, isHero ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-slate-300"
              >
                {tech}
              </span>
            ))}
            {p.technologies.length > (isHero ? 6 : 4) && (
              <span className="rounded-md px-2 py-0.5 text-[10px] text-slate-500">
                +{p.technologies.length - (isHero ? 6 : 4)}
              </span>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            {p.caseStudy && (
              <button
                type="button"
                onClick={() => onOpen(project)}
                data-cursor={ctaCase}
                className={cn(
                  'inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-transform hover:scale-[1.02]',
                  isHero || p.demo ? 'px-4' : 'flex-1',
                  isDark ? 'text-[#050816]' : 'text-white',
                )}
                style={{
                  background: isDark ? theme.accent : '#0b1220',
                  boxShadow: isDark
                    ? `0 8px 24px ${theme.accent}33`
                    : '0 8px 24px rgba(15,23,42,0.14)',
                }}
              >
                {ctaCase}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            )}
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor={ctaSite}
                className={cn(
                  'inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-colors',
                  p.caseStudy
                    ? 'border border-white/15 bg-white/[0.05] px-4 text-text hover:bg-white/[0.1]'
                    : 'flex-1 hover:scale-[1.02]',
                  !p.caseStudy && (isDark ? 'text-[#050816]' : 'text-white'),
                )}
                style={
                  !p.caseStudy
                    ? {
                        background: isDark ? theme.accent : '#0b1220',
                        boxShadow: isDark
                          ? `0 8px 24px ${theme.accent}33`
                          : '0 8px 24px rgba(15,23,42,0.14)',
                      }
                    : undefined
                }
              >
                {ctaSite}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {!p.demo && !p.caseStudy && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <ExternalLink className="h-3.5 w-3.5" />
                {fr ? 'Détails' : 'Details'}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

const INITIAL_PROJECTS = 5

export function Projects() {
  const { t, locale } = useLanguage()
  const [filter, setFilter] = useState<FilterKey>('all')
  const [active, setActive] = useState<Project | null>(null)
  const [showAll, setShowAll] = useState(false)

  const featured = useMemo(() => projects.filter((p) => p.featured), [])
  const secondary = useMemo(() => projects.filter((p) => !p.featured), [])
  const pool = filter === 'featured' ? featured : projects
  const visible = showAll ? pool : pool.slice(0, INITIAL_PROJECTS)
  const hasMore = pool.length > INITIAL_PROJECTS

  const filters = [
    { key: 'all' as const, label: locale === 'fr' ? 'Tous' : 'All' },
    { key: 'featured' as const, label: locale === 'fr' ? 'Vedettes' : 'Featured' },
  ]

  const setFilterAndReset = (key: FilterKey) => {
    setFilter(key)
    setShowAll(false)
  }

  return (
    <section id="projects" className="relative overflow-x-hidden py-24 sm:py-32">
      <div
        className="theme-ambient pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 15% 15%, rgba(18,183,106,0.10), transparent 55%), radial-gradient(ellipse 45% 35% at 85% 30%, rgba(34,211,238,0.10), transparent 50%), radial-gradient(ellipse 40% 40% at 50% 90%, rgba(59,130,246,0.08), transparent 55%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-4 font-medium text-sm tracking-[0.22em] uppercase text-accent">
            {t.projects.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl">
            {t.projects.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {t.projects.description}
          </p>
        </motion.div>

        <div className="mb-10 flex justify-center">
          <div
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-elevated p-1.5"
            role="tablist"
            aria-label={locale === 'fr' ? 'Filtrer les projets' : 'Filter projects'}
          >
            {filters.map((f) => {
              const activeFilter = filter === f.key
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter}
                  data-cursor={f.label}
                  onClick={() => setFilterAndReset(f.key)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    activeFilter ? 'text-text' : 'text-muted hover:text-text/85',
                  )}
                >
                  {activeFilter && (
                    <motion.span
                      layoutId="projects-filter-pill"
                      className="absolute inset-0 rounded-full border border-accent-cyan/35 bg-accent-cyan/15 shadow-[0_0_24px_rgba(34,211,238,0.16)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-9 lg:grid-cols-12 lg:gap-x-9 lg:gap-y-12"
          >
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                size={cardSize(i)}
                onOpen={setActive}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              data-cursor={showAll ? t.projects.showLess : t.projects.showMore}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/10 px-6 py-3 text-sm font-medium text-text transition-colors hover:bg-accent-cyan/20"
            >
              {showAll ? t.projects.showLess : t.projects.showMore}
              <span className="font-mono text-[11px] text-accent-cyan">
                {showAll
                  ? `−${pool.length - INITIAL_PROJECTS}`
                  : `+${pool.length - INITIAL_PROJECTS}`}
              </span>
            </motion.button>
          </div>
        )}

        <p className="mt-8 text-center font-mono text-[11px] tracking-wide text-slate-500">
          {visible.length}
          {hasMore && !showAll ? ` / ${pool.length}` : ''}{' '}
          {locale === 'fr' ? 'projets sélectionnés' : 'selected projects'}
          {filter === 'all' && secondary.length > 0
            ? ` · ${featured.length} featured`
            : null}
        </p>
      </div>

      <ProjectCaseStudy
        project={active}
        open={Boolean(active?.caseStudy)}
        onClose={() => setActive(null)}
      />
    </section>
  )
}
