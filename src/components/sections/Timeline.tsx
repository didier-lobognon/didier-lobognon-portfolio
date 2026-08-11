import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import {
  Award,
  Briefcase,
  Code2,
  Cpu,
  ExternalLink,
  GraduationCap,
  MapPin,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react'
import { timeline } from '@/data/timeline'
import { personalInfo } from '@/data/personal'
import { viewportOnce } from '@/lib/animations'
import { pickLocale } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { TimelineItem, TimelineType } from '@/types'
import { useLanguage } from '@/i18n/LanguageProvider'
import { useTheme } from '@/i18n/ThemeProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type FilterKey = 'all' | 'experience' | 'formation' | 'certificat'

const TYPE_META: Record<
  TimelineType,
  { icon: typeof Briefcase; labelFr: string; labelEn: string; hue: string }
> = {
  experience: { icon: Briefcase, labelFr: 'Expérience', labelEn: 'Experience', hue: '#14b8a6' },
  formation: { icon: GraduationCap, labelFr: 'Formation', labelEn: 'Education', hue: '#0ea5e9' },
  certificat: { icon: Award, labelFr: 'Certificat', labelEn: 'Certificate', hue: '#f59e0b' },
  milestone: { icon: Trophy, labelFr: 'Temps fort', labelEn: 'Milestone', hue: '#eab308' },
  stage: { icon: Briefcase, labelFr: 'Expérience', labelEn: 'Experience', hue: '#14b8a6' },
  freelance: { icon: Briefcase, labelFr: 'Expérience', labelEn: 'Experience', hue: '#14b8a6' },
}

type Point = { x: number; y: number; item: TimelineItem; index: number }

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

function shortOrg(name: string, max = 18) {
  const base = name.split(/\s*[—–|]\s*/)[0]?.trim() || name
  if (base.length <= max) return base
  return `${base.slice(0, max - 1)}…`
}

/** Serpent inset — mobile plus centré pour éviter les coupures */
function buildSnakePoints(items: TimelineItem[], compact: boolean): Point[] {
  const left = compact ? 30 : 20
  const right = compact ? 70 : 80
  const midL = compact ? 42 : 36
  const midR = compact ? 58 : 64
  const gap = compact ? 200 : 200
  const startY = compact ? 100 : 110

  const pattern = compact
    ? [left, right, left, right, left, right, left, right]
    : [left, midR, right, midL, left, right, midL, right, left, midR, right]

  return items.map((item, i) => {
    const x = pattern[i % pattern.length]
    const wobble = Math.sin(i * 1.7) * (compact ? 4 : 8)
    return {
      x,
      y: startY + i * gap + wobble,
      item,
      index: i,
    }
  })
}

function snakePath(points: Point[]): string {
  if (!points.length) return ''
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    const dy = b.y - a.y
    d += ` C ${a.x} ${a.y + dy * 0.45}, ${b.x} ${b.y - dy * 0.45}, ${b.x} ${b.y}`
  }
  return d
}

function steppingStones(points: Point[]): { x: number; y: number; key: string }[] {
  const stones: { x: number; y: number; key: string }[] = []
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    for (const t of [0.28, 0.5, 0.72]) {
      stones.push({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        key: `${i}-${t}`,
      })
    }
  }
  return stones
}

function ConquestBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, #070b12 0%, #0a121c 45%, #070b12 100%)'
            : 'linear-gradient(180deg, #f7f8fa 0%, #eef1f4 50%, #f5f6f8 100%)',
        }}
      />

      <div
        className="absolute top-[28%] right-[-12%] h-[42%] w-[40%] rounded-full blur-[110px]"
        style={{ background: isDark ? 'rgba(56,189,248,0.1)' : 'rgba(2,132,199,0.07)' }}
      />
      <div
        className="absolute bottom-[8%] left-[-8%] h-[38%] w-[42%] rounded-full blur-[120px]"
        style={{ background: isDark ? 'rgba(245,158,11,0.07)' : 'rgba(180,83,9,0.05)' }}
      />

      {/* Constellation légère — sans rectangles / barres */}
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[
          [8, 18],
          [22, 32],
          [35, 14],
          [48, 26],
          [62, 20],
          [78, 34],
          [90, 22],
          [12, 55],
          [28, 70],
          [55, 62],
          [72, 78],
          [88, 58],
          [18, 88],
          [42, 92],
          [65, 48],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i % 4 === 0 ? 0.28 : 0.16}
            fill={isDark ? '#94a3b8' : '#64748b'}
            opacity={0.28 + (i % 5) * 0.06}
          />
        ))}
        <path
          d="M8 18 L22 32 L35 14 L48 26"
          fill="none"
          stroke={isDark ? '#64748b' : '#94a3b8'}
          strokeWidth="0.07"
          opacity="0.22"
        />
        <path
          d="M62 20 L78 34 L90 22"
          fill="none"
          stroke={isDark ? '#64748b' : '#94a3b8'}
          strokeWidth="0.07"
          opacity="0.2"
        />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 48%, rgba(2,6,12,0.55) 100%)'
            : 'radial-gradient(ellipse at center, transparent 52%, rgba(15,23,42,0.04) 100%)',
        }}
      />
    </div>
  )
}

function LevelNode({
  point,
  active,
  onSelect,
  locale,
  isDark,
  reduceMotion,
  compact,
}: {
  point: Point
  active: boolean
  onSelect: () => void
  locale: string
  isDark: boolean
  reduceMotion: boolean | null
  compact: boolean
}) {
  const { item, index } = point
  const meta = TYPE_META[item.type]
  const Icon = meta.icon
  const level = index + 1
  const org = shortOrg(item.organization, compact ? 14 : 18)
  const hue = item.brandColor && item.brandColor !== '#F8FAFC' ? item.brandColor : meta.hue

  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      data-cursor={org}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.55, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: Math.min(index * 0.045, 0.4) }}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.05 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      className={cn(
        'absolute z-20 flex -translate-x-1/2 -translate-y-[62%] flex-col items-center',
        compact ? 'w-[4.75rem]' : 'w-[5.25rem] sm:w-[6.75rem]',
      )}
      style={{ left: `${point.x}%`, top: point.y }}
      aria-expanded={active}
      aria-label={`Level ${level}. ${org}`}
    >
      <span
        aria-hidden
        className="absolute top-5 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full blur-lg sm:top-6 sm:h-16 sm:w-16"
        style={{
          background: `radial-gradient(circle, ${hue}66 0%, transparent 70%)`,
          opacity: active ? 1 : 0.55,
        }}
      />

      {/* Anneau extérieur */}
      <span
        aria-hidden
        className={cn(
          'absolute top-[1.65rem] left-1/2 h-[4.1rem] w-[4.1rem] -translate-x-1/2 rounded-[1.35rem] border sm:top-[1.85rem] sm:h-[4.85rem] sm:w-[4.85rem] sm:rounded-[1.5rem]',
          active ? 'opacity-100' : 'opacity-40',
        )}
        style={{ borderColor: `${hue}88` }}
      />

      <span
        className="relative z-30 mb-[-0.4rem] flex h-7 min-w-7 items-center justify-center rounded-full px-2 font-mono text-[11px] font-bold shadow-md sm:h-8 sm:min-w-8 sm:text-xs"
        style={{
          background: `linear-gradient(145deg, ${hue}, ${hue}cc)`,
          color: '#041016',
          boxShadow: `0 4px 14px ${hue}55`,
        }}
      >
        {level}
      </span>

      <span
        className={cn(
          'relative flex h-[3.4rem] w-[3.4rem] items-center justify-center overflow-hidden rounded-[1.05rem] border-2 sm:h-16 sm:w-16 sm:rounded-[1.2rem]',
          isDark ? 'border-white/20' : 'border-white',
        )}
        style={{
          background: item.logoBg ?? '#fff',
          boxShadow: active
            ? `0 0 0 3px ${isDark ? '#07141c' : '#f3faf9'}, 0 0 0 5px ${hue}, 0 16px 36px ${hue}40`
            : isDark
              ? '0 12px 28px rgba(0,0,0,0.5)'
              : '0 12px 28px rgba(15,23,42,0.14)',
        }}
      >
        {item.logo ? (
          <img
            src={item.logo}
            alt=""
            className={cn(
              'h-full w-full',
              item.logoFit === 'cover' ? 'object-cover' : 'object-contain p-1.5',
            )}
            loading="lazy"
          />
        ) : (
          <Icon className="h-5 w-5 text-slate-700" />
        )}
      </span>

      {/* Socle */}
      <span
        aria-hidden
        className="mt-1.5 h-1.5 w-9 rounded-full sm:w-11"
        style={{
          background: `linear-gradient(90deg, transparent, ${hue}99, transparent)`,
        }}
      />

      <span
        className={cn(
          'mt-1.5 line-clamp-1 max-w-[4.75rem] truncate text-center text-[10px] font-semibold sm:max-w-[6.5rem] sm:text-[11px]',
          active
            ? isDark
              ? 'text-teal-100'
              : 'text-slate-900'
            : isDark
              ? 'text-slate-400'
              : 'text-slate-600',
        )}
        title={item.organization}
      >
        {org}
      </span>

      <span
        className={cn(
          'mt-0.5 inline-flex items-center gap-1 font-mono text-[9px] tracking-wide uppercase',
          isDark ? 'text-slate-500' : 'text-slate-400',
        )}
      >
        {item.current ? (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {locale === 'fr' ? 'En cours' : 'Current'}
          </>
        ) : (
          <>
            <Icon className="h-2.5 w-2.5" />
            {locale === 'fr' ? meta.labelFr : meta.labelEn}
          </>
        )}
      </span>
    </motion.button>
  )
}

function PointModal({
  point,
  locale,
  currentLabel,
  isDark,
  level,
  onClose,
  compact,
}: {
  point: Point
  locale: string
  currentLabel: string
  isDark: boolean
  level: number
  onClose: () => void
  compact: boolean
}) {
  const fr = locale === 'fr'
  const { item } = point
  const meta = TYPE_META[item.type]
  const Icon = meta.icon
  const title = pickLocale(item.titleFr, item.titleEn, locale)
  const period = pickLocale(item.periodFr, item.periodEn, locale)
  const location = pickLocale(item.locationFr, item.locationEn, locale)
  const description = pickLocale(item.descriptionFr, item.descriptionEn, locale)
  const tags =
    item.tagsFr && item.tagsEn
      ? pickLocale(item.tagsFr, item.tagsEn, locale)
      : item.tagsFr ?? item.tagsEn
  const hue = item.brandColor && item.brandColor !== '#F8FAFC' ? item.brandColor : meta.hue

  const placeBelow = !compact && point.y < 360
  const preferLeft = point.x > 72
  const preferRight = point.x < 28
  const tx = preferLeft ? '-100%' : preferRight ? '0%' : '-50%'
  const ty = placeBelow ? '0.9rem' : 'calc(-100% - 0.9rem)'

  const card = (
    <motion.div
      initial={{ opacity: 0, y: compact ? 24 : placeBelow ? -8 : 8, scale: compact ? 1 : 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: compact ? 16 : placeBelow ? -6 : 6, scale: compact ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn(
        'overflow-hidden rounded-2xl border backdrop-blur-xl',
        compact && 'flex max-h-[min(78vh,36rem)] flex-col',
        isDark
          ? 'border-white/10 bg-[#0e1f2a]/98 shadow-[0_28px_70px_rgba(0,0,0,0.65)]'
          : 'border-slate-900/8 bg-white/98 shadow-[0_28px_60px_rgba(15,23,42,0.2)]',
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="relative flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4"
        style={{
          background: `linear-gradient(135deg, ${hue} 0%, ${hue}bb 55%, ${isDark ? '#0e1f2a' : '#ffffff'} 100%)`,
        }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 font-mono text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          LVL {String(level).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-black/25 p-2 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/40"
          aria-label={fr ? 'Fermer' : 'Close'}
          data-cursor={fr ? 'Fermer' : 'Close'}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        className={cn(
          'relative px-4 py-4 sm:px-6 sm:py-6',
          compact && 'min-h-0 flex-1 overflow-y-auto overscroll-contain',
        )}
        {...(compact ? { 'data-lenis-prevent': true } : {})}
      >
        <div className={cn('mb-4 flex gap-3 sm:gap-4', compact ? 'flex-col' : 'items-start')}>
          {item.logo && (
            <span
              className={cn(
                'flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border shadow-md',
                compact ? 'h-14 w-14' : 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]',
                isDark ? 'border-white/10' : 'border-slate-900/8',
              )}
              style={{ background: item.logoBg ?? '#fff' }}
            >
              <img
                src={item.logo}
                alt=""
                className={cn(
                  'h-full w-full',
                  item.logoFit === 'cover' ? 'object-cover' : 'object-contain p-1.5',
                )}
              />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <span
              className={cn(
                'inline-flex max-w-full items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] font-medium sm:text-xs',
                isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-50 text-teal-800',
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {fr ? meta.labelFr : meta.labelEn}
                {item.current ? ` · ${currentLabel}` : ''}
              </span>
            </span>
            <h3
              className={cn(
                'mt-2 font-display font-semibold leading-snug tracking-tight text-balance',
                compact ? 'text-lg' : 'text-xl sm:text-2xl',
                isDark ? 'text-slate-50' : 'text-slate-900',
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                'mt-1 font-medium',
                compact ? 'text-sm' : 'text-base',
                isDark ? 'text-slate-300' : 'text-slate-700',
              )}
            >
              {item.organization}
            </p>
          </div>
        </div>

        <p
          className={cn(
            'flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] sm:text-[13px]',
            isDark ? 'text-slate-500' : 'text-slate-400',
          )}
        >
          <span>{period}</span>
          <span className="opacity-40">·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {location}
          </span>
        </p>

        <p
          className={cn(
            'mt-3 leading-relaxed text-pretty sm:mt-4',
            compact ? 'text-sm' : 'text-[15px] sm:text-base',
            isDark ? 'text-slate-400' : 'text-slate-600',
          )}
        >
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'rounded-lg border px-2.5 py-1 font-mono text-[11px] sm:text-xs',
                  isDark
                    ? 'border-white/10 bg-white/[0.04] text-slate-400'
                    : 'border-slate-900/8 bg-slate-50 text-slate-500',
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )

  if (compact) {
    return createPortal(
      <div className="fixed inset-0 z-[80]">
        <motion.button
          type="button"
          aria-label={fr ? 'Fermer' : 'Close'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={onClose}
        />
        <div
          className="absolute inset-x-3"
          style={{ bottom: 'max(5.75rem, calc(env(safe-area-inset-bottom, 0px) + 4.75rem))' }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {card}
        </div>
      </div>,
      document.body,
    )
  }

  return (
    <div
      className="absolute z-40 w-[min(26rem,calc(100%-1rem))] sm:w-[30rem]"
      style={{
        left: `${point.x}%`,
        top: point.y,
        transform: `translate(${tx}, ${ty})`,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => e.stopPropagation()}
    >
      <span
        aria-hidden
        className={cn(
          'absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45',
          preferLeft && 'left-auto right-10 translate-x-0',
          preferRight && 'left-10 translate-x-0',
          placeBelow ? '-top-1.5' : '-bottom-1.5',
        )}
        style={{
          background: isDark ? '#0e1f2a' : '#ffffff',
          borderRight: placeBelow ? undefined : `1px solid ${hue}44`,
          borderBottom: placeBelow ? undefined : `1px solid ${hue}44`,
          borderLeft: placeBelow ? `1px solid ${hue}44` : undefined,
          borderTop: placeBelow ? `1px solid ${hue}44` : undefined,
        }}
      />
      {card}
    </div>
  )
}


export function Timeline() {
  const { t, locale } = useLanguage()
  const { isDark } = useTheme()
  const reduceMotion = useReducedMotion()
  const compact = !useMediaQuery('(min-width: 640px)')
  const [filter, setFilter] = useState<FilterKey>('all')
  const [activeId, setActiveId] = useState<string | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLen, setPathLen] = useState(1)

  const visible = useMemo(
    () => [...timeline].filter((item) => matchesFilter(item, filter)).reverse(),
    [filter],
  )

  const points = useMemo(() => buildSnakePoints(visible, compact), [visible, compact])
  const pathD = useMemo(() => snakePath(points), [points])
  const stones = useMemo(() => steppingStones(points), [points])
  // Extra bas mobile : labels + zone hors WhatsApp FAB
  const boardHeight = points.length
    ? points[points.length - 1].y + (compact ? 200 : 160)
    : 240

  const activePoint = points.find((p) => p.item.id === activeId) ?? null

  useEffect(() => {
    setActiveId(null)
  }, [filter])

  useEffect(() => {
    const el = pathRef.current
    if (!el) return
    setPathLen(el.getTotalLength() || 1)
  }, [pathD])

  useEffect(() => {
    if (!activeId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  useEffect(() => {
    if (!compact || !activeId) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [compact, activeId])

  const { scrollYProgress } = useScroll({
    target: boardRef,
    offset: ['start 80%', 'end 50%'],
  })
  const draw = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 200 : 50,
    damping: 22,
    mass: 0.5,
  })
  const dashOffset = useTransform(draw, [0, 1], [pathLen, 0])

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: t.journey.filters.all },
    { key: 'experience', label: t.journey.filters.experience },
    { key: 'formation', label: t.journey.filters.formation },
    { key: 'certificat', label: t.journey.filters.certificat },
  ]

  const linkedin = personalInfo.socials.find((s) => s.id === 'linkedin')?.href
  const trace = isDark ? '#2dd4bf' : '#0f766e'
  const traceSoft = isDark ? 'rgba(45,212,191,0.22)' : 'rgba(15,118,110,0.18)'

  return (
    <section
      id="journey"
      className="relative isolate overflow-x-clip py-24 pb-32 sm:py-32 sm:pb-32"
    >
      <ConquestBackground isDark={isDark} />

      <div className="relative w-full px-4 sm:px-6 lg:px-10">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-[0.18em] uppercase',
                isDark
                  ? 'border-teal-400/30 bg-teal-400/10 text-teal-300'
                  : 'border-teal-800/15 bg-teal-50 text-teal-900',
              )}
            >
              <Cpu className="h-3.5 w-3.5" />
              {t.journey.eyebrow}
            </span>
            <span
              className={cn(
                'font-mono text-[10px] tracking-[0.16em] uppercase',
                isDark ? 'text-slate-500' : 'text-slate-400',
              )}
            >
              conquest://career
            </span>
          </div>

          <h2
            className={cn(
              'font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl',
              isDark ? 'text-slate-50' : 'text-slate-900',
            )}
          >
            {t.journey.title}
          </h2>
          <p
            className={cn(
              'mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty sm:text-lg',
              isDark ? 'text-slate-400' : 'text-slate-600',
            )}
          >
            {t.journey.description}
          </p>
        </motion.header>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mb-6 flex flex-col items-center gap-4 sm:mb-8"
        >
          <div
            role="tablist"
            aria-label={t.journey.eyebrow}
            className={cn(
              'inline-flex flex-wrap justify-center gap-1 rounded-xl border p-1 backdrop-blur-md',
              isDark ? 'border-white/10 bg-black/25' : 'border-slate-900/8 bg-white/60',
            )}
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
                    'relative rounded-lg px-3 py-2 font-mono text-[12px] tracking-tight transition-colors',
                    active
                      ? isDark
                        ? 'bg-teal-400/15 text-teal-200'
                        : 'bg-teal-900 text-white'
                      : isDark
                        ? 'text-slate-500 hover:text-slate-300'
                        : 'text-slate-500 hover:text-slate-800',
                  )}
                >
                  {f.label}
                </button>
              )
            })}
          </div>

          <p
            className={cn(
              'inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase',
              isDark ? 'text-slate-500' : 'text-slate-400',
            )}
          >
            <Code2 className="h-3.5 w-3.5" />
            {t.journey.nextHint}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${compact ? 'm' : 'd'}`}
            ref={boardRef}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="relative mx-auto w-full max-w-[1400px]"
            style={{ height: boardHeight }}
            onClick={() => setActiveId(null)}
          >
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 100 ${boardHeight}`}
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d={pathD}
                fill="none"
                stroke={traceSoft}
                strokeWidth={compact ? 7 : 5.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={pathD}
                fill="none"
                stroke={trace}
                strokeWidth={compact ? 1.6 : 1.25}
                strokeLinecap="round"
                strokeDasharray="2 2.6"
                opacity={0.35}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke={trace}
                strokeWidth={compact ? 2.6 : 2.1}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLen}
                style={{ strokeDashoffset: dashOffset }}
                opacity={0.95}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {stones.map((s, i) => (
              <span
                key={s.key}
                aria-hidden
                className="absolute z-10 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-2 sm:w-2"
                style={{
                  left: `${s.x}%`,
                  top: s.y,
                  background: trace,
                  opacity: 0.4 + (i % 3) * 0.15,
                  boxShadow: isDark ? `0 0 10px ${trace}` : undefined,
                }}
              />
            ))}

            {points.map((point) => {
              const hue =
                point.item.brandColor && point.item.brandColor !== '#F8FAFC'
                  ? point.item.brandColor
                  : TYPE_META[point.item.type].hue
              return (
                <span
                  key={`zone-${point.item.id}`}
                  aria-hidden
                  className="pointer-events-none absolute z-[5] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl sm:h-36 sm:w-36"
                  style={{
                    left: `${point.x}%`,
                    top: point.y,
                    background: `radial-gradient(circle, ${hue}40 0%, transparent 70%)`,
                  }}
                />
              )
            })}

            {points.map((point) => (
              <LevelNode
                key={point.item.id}
                point={point}
                active={activeId === point.item.id}
                onSelect={() =>
                  setActiveId((id) => (id === point.item.id ? null : point.item.id))
                }
                locale={locale}
                isDark={isDark}
                reduceMotion={reduceMotion}
                compact={compact}
              />
            ))}

            <AnimatePresence>
              {activePoint && (
                <PointModal
                  key={activePoint.item.id}
                  point={activePoint}
                  locale={locale}
                  currentLabel={t.journey.current}
                  isDark={isDark}
                  level={activePoint.index + 1}
                  onClose={() => setActiveId(null)}
                  compact={compact}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {linkedin && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="mt-12 flex justify-center sm:mt-14"
          >
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor={t.journey.linkedin}
              className={cn(
                'group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-sm transition-colors',
                isDark
                  ? 'border-teal-400/30 bg-teal-400/10 text-teal-200 hover:bg-teal-400/20'
                  : 'border-teal-900/15 bg-teal-950 text-white hover:bg-teal-900',
              )}
            >
              {t.journey.linkedin}
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
