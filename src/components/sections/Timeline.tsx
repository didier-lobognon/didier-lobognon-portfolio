import { useMemo, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion'
import {
  Award,
  Briefcase,
  GraduationCap,
  Rocket,
  Sparkles,
  ArrowDown,
  ExternalLink,
  MapPin,
  Trophy,
} from 'lucide-react'
import { timeline } from '@/data/timeline'
import { personalInfo } from '@/data/personal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { viewportOnce } from '@/lib/animations'
import { pickLocale } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { TimelineItem, TimelineType } from '@/types'
import { useLanguage } from '@/i18n/LanguageProvider'
import { useTheme } from '@/i18n/ThemeProvider'

type FilterKey = 'all' | 'experience' | 'formation' | 'certificat'

const TYPE_META: Record<
  TimelineType,
  { icon: typeof Briefcase; labelFr: string; labelEn: string; accent: string }
> = {
  experience: {
    icon: Briefcase,
    labelFr: 'Expérience',
    labelEn: 'Experience',
    accent: '#3B82F6',
  },
  formation: {
    icon: GraduationCap,
    labelFr: 'Formation',
    labelEn: 'Education',
    accent: '#22D3EE',
  },
  certificat: {
    icon: Award,
    labelFr: 'Certificat',
    labelEn: 'Certificate',
    accent: '#A78BFA',
  },
  milestone: {
    icon: Trophy,
    labelFr: 'Temps fort',
    labelEn: 'Milestone',
    accent: '#F59E0B',
  },
  stage: {
    icon: Rocket,
    labelFr: 'Stage',
    labelEn: 'Internship',
    accent: '#94A3B8',
  },
  freelance: {
    icon: Sparkles,
    labelFr: 'Freelance',
    labelEn: 'Freelance',
    accent: '#F472B6',
  },
}

function matchesFilter(item: TimelineItem, filter: FilterKey) {
  if (filter === 'all') return true
  if (filter === 'experience') {
    return item.type === 'experience' || item.type === 'stage' || item.type === 'freelance'
  }
  if (filter === 'formation') {
    return item.type === 'formation' || item.type === 'milestone'
  }
  return item.type === 'certificat'
}

function JourneyNode({
  item,
  index,
  progress,
  locale,
  currentLabel,
}: {
  item: TimelineItem
  index: number
  progress: MotionValue<number>
  locale: string
  currentLabel: string
}) {
  const fr = locale === 'fr'
  const title = pickLocale(item.titleFr, item.titleEn, locale)
  const period = pickLocale(item.periodFr, item.periodEn, locale)
  const location = pickLocale(item.locationFr, item.locationEn, locale)
  const description = pickLocale(item.descriptionFr, item.descriptionEn, locale)
  const tags =
    item.tagsFr && item.tagsEn
      ? pickLocale(item.tagsFr, item.tagsEn, locale)
      : item.tagsFr ?? item.tagsEn
  const meta = TYPE_META[item.type]
  const Icon = meta.icon
  const brand = item.brandColor
  const border = item.brandBorder ?? brand
  const { isDark } = useTheme()
  const light = Boolean(item.lightCard) || !isDark
  const tinted = Boolean(brand) && !light && isDark
  const accent = brand ?? meta.accent
  const start = Math.max(0, index * 0.09)
  const end = Math.min(1, start + 0.22)
  const nodeScale = useTransform(progress, [start, end], [0.96, 1])
  const glow = useTransform(progress, [start, (start + end) / 2, end], [0, 1, 0.55])
  const nodeGlow = useTransform(
    glow,
    (v) =>
      `0 0 ${18 + v * 28}px ${(border ?? accent)}${Math.round(v * 90).toString(16).padStart(2, '0')}`,
  )
  const side = index % 2 === 0 ? 'left' : 'right'

  // Fonds opaques — la corde ne doit jamais transparaître à travers la carte
  const cardStyle = !isDark
    ? {
        background: '#ffffff',
        borderColor: 'rgba(15,23,42,0.06)',
        borderWidth: 1,
        boxShadow:
          '0 2px 4px rgba(15,23,42,0.06), 0 10px 28px rgba(15,23,42,0.1), 0 28px 56px rgba(15,23,42,0.14)',
      }
    : light
      ? {
          background: '#ffffff',
          borderColor: 'rgba(15,23,42,0.12)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.8)',
        }
      : tinted
        ? {
            background: `linear-gradient(145deg, ${brand}40 0%, #0d1524 42%, #0a1220 100%)`,
            borderColor: `${border}66`,
            boxShadow: `0 0 0 1px ${border}40, 0 24px 60px rgba(0,0,0,0.45), 0 0 48px ${brand}18, inset 0 1px 0 ${brand}22`,
          }
        : {
            background: '#0d1524',
            borderColor: 'rgba(255,255,255,0.12)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          }

  return (
    <motion.li
      style={{ scale: nodeScale }}
      initial={{ opacity: 0, y: 56, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.28, margin: '-24px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.05, 0.25) }}
      className="relative z-10 grid grid-cols-1 gap-0 lg:grid-cols-[1fr_auto_1fr] lg:gap-0"
    >
      {/* Carte — centrée mobile, alterne desktop */}
      <div
        className={cn(
          'relative z-10 mx-auto w-full max-w-md pt-8 lg:mx-0 lg:max-w-none lg:pt-0 lg:row-start-1',
          side === 'left' ? 'lg:col-start-1 lg:pr-10 lg:text-right' : 'lg:col-start-3 lg:pl-10',
          side === 'right' && 'lg:col-start-3',
        )}
      >
        {/* Masque opaque derrière la carte (coupe la corde) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-8 bottom-0 z-0 rounded-[1.4rem] bg-bg lg:hidden"
        />
        <motion.article
          className={cn(
            'group relative z-[1] overflow-hidden rounded-[1.4rem] border p-5 text-left sm:p-6',
            !isDark && 'light-card',
          )}
          style={cardStyle}
          whileHover={
            !isDark
              ? {
                  y: -6,
                  boxShadow:
                    '0 4px 8px rgba(15,23,42,0.07), 0 16px 40px rgba(15,23,42,0.12), 0 36px 72px rgba(15,23,42,0.16)',
                  transition: { type: 'spring', stiffness: 380, damping: 28 },
                }
              : { y: -6, transition: { type: 'spring', stiffness: 380, damping: 28 } }
          }
        >
          {tinted && (
            <>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full blur-3xl"
                style={{ background: `${brand}28` }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full blur-3xl"
                style={{ background: `${brand}14` }}
              />
            </>
          )}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[1.4rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(500px circle at var(--x,50%) var(--y,0%), ${accent}22, transparent 55%)`,
            }}
          />

          <div
            className={cn(
              'relative flex flex-wrap items-center gap-3 sm:gap-4',
              side === 'left' && 'lg:flex-row-reverse lg:justify-start',
            )}
          >
            {item.logo && (
              <motion.span
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className={cn(
                  'relative flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl border sm:h-[5.25rem] sm:w-[5.25rem]',
                  item.logoFit === 'cover' ? 'p-0' : 'p-2 sm:p-2.5',
                  light ? 'border-slate-200' : 'border-white/15',
                )}
                style={{
                  background: item.logoBg ?? brand ?? '#ffffff',
                  boxShadow: tinted
                    ? `0 12px 32px rgba(0,0,0,0.35), 0 0 0 1px ${border ?? brand}33, 0 0 28px ${brand}22`
                    : light
                      ? '0 10px 28px rgba(15,23,42,0.12)'
                      : '0 12px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)',
                }}
              >
                <img
                  src={item.logo}
                  alt={`Logo ${item.organization}`}
                  className={cn(
                    'h-full w-full',
                    item.logoFit === 'cover' ? 'scale-[1.02] object-cover' : 'object-contain',
                  )}
                  loading="lazy"
                />
              </motion.span>
            )}
            <div
              className={cn(
                'flex min-w-0 flex-1 flex-wrap items-center gap-2',
                side === 'left' && 'lg:justify-end',
              )}
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase"
                style={{
                  color: light ? '#0f172a' : accent,
                  borderColor: light ? 'rgba(15,23,42,0.15)' : `${accent}66`,
                  background: light ? 'rgba(15,23,42,0.05)' : `${accent}22`,
                }}
              >
                <Icon className="h-3 w-3" />
                {fr ? meta.labelFr : meta.labelEn}
              </span>
              <span
                className={cn(
                  'font-mono text-[11px]',
                  light ? 'text-slate-500' : 'text-slate-500',
                )}
              >
                {period}
              </span>
              {item.current && (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium',
                    light
                      ? 'border-emerald-600/25 bg-emerald-50 text-emerald-700'
                      : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
                  )}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {currentLabel}
                </span>
              )}
            </div>
          </div>

          <h3
            className={cn(
              'relative mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl',
              light ? 'text-slate-900' : 'text-white',
              side === 'left' && 'lg:text-right',
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              'relative mt-1.5 text-sm font-medium',
              side === 'left' && 'lg:text-right',
            )}
            style={{ color: light ? '#0f172a' : accent }}
          >
            {item.organization}
          </p>
          <p
            className={cn(
              'relative mt-1 inline-flex items-center gap-1 text-xs',
              light ? 'text-slate-500' : 'text-slate-500',
              side === 'left' && 'lg:w-full lg:justify-end',
            )}
          >
            <MapPin className="h-3 w-3 shrink-0" />
            {location}
          </p>
          <p
            className={cn(
              'relative mt-3 text-sm leading-relaxed',
              light ? 'text-slate-600' : 'text-slate-300',
              side === 'left' && 'lg:text-right',
            )}
          >
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div
              className={cn(
                'relative mt-4 flex flex-wrap gap-1.5',
                side === 'left' && 'lg:justify-end',
              )}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'rounded-md border px-2 py-0.5 text-[10px]',
                    light
                      ? 'border-slate-200 bg-slate-50 text-slate-600'
                      : 'border-white/10 bg-white/[0.03] text-slate-400',
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.article>
      </div>

      {/* Nœud central — fond plein couleur marque / type */}
      <div className="relative z-20 hidden items-start justify-center lg:flex lg:col-start-2 lg:row-start-1 lg:px-3">
        <div className="relative mt-7 flex items-center justify-center">
          <span
            aria-hidden
            className="absolute h-[4.5rem] w-[4.5rem] rounded-full bg-bg"
          />
          <motion.div
            style={{
              boxShadow: nodeGlow,
              background: border ?? accent,
            }}
            className="relative flex h-16 w-16 items-center justify-center rounded-full"
          >
            <Icon className="relative h-7 w-7 text-white" strokeWidth={2.25} />
            <motion.span
              aria-hidden
              className="absolute inset-[-8px] rounded-full border"
              style={{ borderColor: `${border ?? accent}55` }}
              animate={{ scale: [1, 1.22, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Colonne vide pour l’alternance */}
      <div
        className={cn(
          'hidden lg:block lg:row-start-1',
          side === 'left' ? 'lg:col-start-3' : 'lg:col-start-1',
        )}
        aria-hidden
      />
    </motion.li>
  )
}

export function Timeline() {
  const { t, locale } = useLanguage()
  const [filter, setFilter] = useState<FilterKey>('all')
  const sectionRef = useRef<HTMLElement>(null)

  const visible = useMemo(
    () => [...timeline].filter((item) => matchesFilter(item, filter)).reverse(),
    [filter],
  )

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 85%'],
  })
  const pathProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 })
  const pathHeight = useTransform(pathProgress, [0, 1], ['0%', '100%'])

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: t.journey.filters.all },
    { key: 'experience', label: t.journey.filters.experience },
    { key: 'formation', label: t.journey.filters.formation },
    { key: 'certificat', label: t.journey.filters.certificat },
  ]

  const linkedin = personalInfo.socials.find((s) => s.id === 'linkedin')?.href

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Atmosphère */}
      <div className="theme-ambient pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(167,139,250,0.1),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0.5px, transparent 0.5px), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.04) 0.5px, transparent 0.5px)',
            backgroundSize: '48px 48px, 72px 72px',
          }}
        />
        <motion.div
          className="absolute top-1/4 left-[12%] h-64 w-64 rounded-full bg-accent/15 blur-[100px]"
          animate={{ y: [0, 30, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[10%] bottom-1/4 h-72 w-72 rounded-full bg-accent-violet/15 blur-[110px]"
          animate={{ y: [0, -24, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.journey.eyebrow}
          title={t.journey.title}
          description={t.journey.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mb-10 flex flex-col items-center gap-4 sm:mb-14"
        >
          <div
            className="flex w-full max-w-xl items-stretch gap-0.5 overflow-x-auto rounded-2xl border border-white/[0.1] bg-elevated p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] [-ms-overflow-style:none] [scrollbar-width:none] sm:w-auto sm:max-w-none sm:rounded-full sm:p-1.5 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label={t.journey.eyebrow}
          >
            {filters.map((f) => {
              const active = filter === f.key
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.key)}
                  data-cursor={f.label}
                  className={cn(
                    'relative min-w-0 flex-1 whitespace-nowrap rounded-xl px-2.5 py-2.5 text-center text-[11px] font-medium tracking-tight transition-colors sm:flex-none sm:rounded-full sm:px-4 sm:py-2 sm:text-sm',
                    active ? 'text-text' : 'text-muted hover:text-text/85',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="journey-filter-pill"
                      className="absolute inset-0 rounded-xl border border-accent-cyan/40 bg-accent-cyan/15 shadow-[0_0_20px_rgba(34,211,238,0.18)] sm:rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 bottom-1 mx-auto h-[2px] rounded-full bg-gradient-to-r from-accent-cyan via-accent to-accent-violet sm:hidden"
                    />
                  )}
                </button>
              )
            })}
          </div>

          <motion.p
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase"
            animate={{ opacity: [0.45, 1, 0.45], y: [0, 3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
            {t.journey.nextHint}
          </motion.p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {/* Corde / rail central */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-[3px] -translate-x-1/2 rounded-full bg-white/[0.08]"
            aria-hidden
          >
            {/* Texture corde (tirets) */}
            <div
              className="absolute inset-0 opacity-40 lg:hidden"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(180deg, transparent 0 10px, rgba(255,255,255,0.14) 10px 12px)',
              }}
            />
            <motion.div
              className="absolute top-0 left-0 w-full origin-top rounded-full"
              style={{
                height: pathHeight,
                background:
                  'linear-gradient(180deg, #3B82F6 0%, #A78BFA 45%, #22D3EE 100%)',
                boxShadow:
                  '0 0 18px rgba(59,130,246,0.55), 0 0 36px rgba(167,139,250,0.25)',
              }}
            />
            {/* Perle lumineuse qui descend avec le scroll */}
            <motion.span
              className="absolute left-1/2 z-[1] hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_16px_rgba(34,211,238,0.95)] lg:block"
              style={{ top: pathHeight }}
            />
            <motion.span
              className="absolute left-1/2 z-[1] h-3 w-3 -translate-x-1/2 rounded-full bg-accent-cyan shadow-[0_0_20px_rgba(34,211,238,0.9)] lg:hidden"
              style={{ top: pathHeight }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.ol
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 space-y-12 sm:space-y-14 lg:space-y-16"
            >
              {visible.map((item, i) => {
                const nodeColor =
                  item.brandBorder ?? item.brandColor ?? TYPE_META[item.type].accent
                const MobileIcon = TYPE_META[item.type].icon
                return (
                  <div key={item.id} className="relative z-10 isolate">
                    {/* Nœud mobile — sur la corde centrale */}
                    <motion.span
                      className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 items-center justify-center lg:hidden"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    >
                      <span
                        aria-hidden
                        className="absolute h-12 w-12 rounded-full bg-bg"
                      />
                      <span
                        className="absolute h-11 w-11 rounded-full border border-white/10"
                        aria-hidden
                      />
                      <motion.span
                        aria-hidden
                        className="absolute h-14 w-14 rounded-full border"
                        style={{ borderColor: `${nodeColor}55` }}
                        animate={{ scale: [1, 1.28, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.12,
                        }}
                      />
                      <span
                        className="relative flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                          background: `linear-gradient(145deg, ${nodeColor}, ${nodeColor}cc)`,
                          boxShadow: `0 0 22px ${nodeColor}66, inset 0 1px 0 rgba(255,255,255,0.25)`,
                        }}
                      >
                        <MobileIcon className="h-4 w-4 text-white" strokeWidth={2.4} />
                      </span>
                    </motion.span>

                    {/* Segment corde décoratif mobile (sous le nœud → carte) */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-10 z-[1] h-6 w-px -translate-x-1/2 bg-gradient-to-b from-white/25 to-transparent lg:hidden"
                    />

                    <div className="lg:pl-0">
                      <JourneyNode
                        item={item}
                        index={i}
                        progress={pathProgress}
                        locale={locale}
                        currentLabel={t.journey.current}
                      />
                    </div>
                  </div>
                )
              })}
            </motion.ol>
          </AnimatePresence>
        </div>

        {linkedin && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="mt-14 flex justify-center"
          >
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor={t.journey.linkedin}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-white"
            >
              {t.journey.linkedin}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
