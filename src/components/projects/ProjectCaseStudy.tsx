import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Database,
  ImageIcon,
  LayoutDashboard,
  Server,
  Shield,
  Smartphone,
  X,
  ZoomIn,
} from 'lucide-react'
import type { Project } from '@/types'
import { getLenisInstance } from '@/lib/lenis'
import { localizeProject } from '@/lib/localize'
import { useLanguage } from '@/i18n/LanguageProvider'
import { cn } from '@/lib/utils'

const FEATURE_ICONS = [Smartphone, Smartphone, LayoutDashboard, LayoutDashboard, LayoutDashboard, Shield]

interface ProjectCaseStudyProps {
  project: Project | null
  open: boolean
  onClose: () => void
}

export function ProjectCaseStudy({ project: projectRaw, open, onClose }: ProjectCaseStudyProps) {
  const { locale } = useLanguage()
  const fr = locale === 'fr'
  const project = useMemo(
    () => (projectRaw ? localizeProject(projectRaw, locale) : null),
    [projectRaw, locale],
  )
  const accent = project?.accent ?? '#12B76A'
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const galleryImages = useMemo(() => {
    if (!project) return [] as string[]
    const list = project.gallery?.length ? [...project.gallery] : []
    if (project.image && !list.includes(project.image)) {
      list.unshift(project.image)
    }
    return list.length ? list : project.image ? [project.image] : []
  }, [project])

  const openLightbox = (src: string) => {
    const idx = galleryImages.indexOf(src)
    setLightboxIndex(idx >= 0 ? idx : 0)
  }

  const closeLightbox = () => setLightboxIndex(null)

  useEffect(() => {
    if (!open) {
      setLightboxIndex(null)
      return
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const lenis = getLenisInstance()
    lenis?.stop()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          e.stopPropagation()
          closeLightbox()
          return
        }
        onClose()
      }
      if (lightboxIndex === null || galleryImages.length < 2) return
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryImages.length))
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) =>
          i === null ? 0 : (i - 1 + galleryImages.length) % galleryImages.length,
        )
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, lightboxIndex, galleryImages.length])

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <motion.button
            type="button"
            aria-label={fr ? 'Fermer' : 'Close'}
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="relative z-10 flex h-[92vh] max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[1.75rem] border-2 bg-card sm:rounded-[1.75rem]"
            style={{
              borderColor: accent,
              boxShadow: `0 0 0 1px ${accent}55, 0 0 48px ${accent}28, 0 40px 120px rgba(0,0,0,0.5)`,
            }}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-elevated/95 px-5 py-3.5 backdrop-blur-xl sm:px-7">
              <div className="min-w-0">
                <p className="truncate font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
                  {fr ? 'Détail du projet' : 'Project details'}
                </p>
                <p className="truncate text-sm font-medium text-white">{project.title}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor={fr ? 'Voir le site' : 'Visit site'}
                    className="inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold text-[#050816] transition-transform hover:scale-[1.02] sm:px-4"
                    style={{
                      background: accent,
                      boxShadow: `0 8px 24px ${accent}33`,
                    }}
                  >
                    {fr ? 'Voir le site' : 'Visit site'}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  data-cursor={fr ? 'Fermer' : 'Close'}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-slate-200 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-card"
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Hero */}
              <section className="relative overflow-hidden">
                <button
                  type="button"
                  onClick={() => openLightbox(project.image)}
                  data-cursor={fr ? 'Agrandir' : 'Zoom'}
                  className="group relative block aspect-[16/9] w-full overflow-hidden sm:aspect-[21/8]"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
                  <span
                    className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                    style={{ boxShadow: `0 0 20px ${accent}33` }}
                  >
                    <ZoomIn className="h-3.5 w-3.5" style={{ color: accent }} />
                    {fr ? 'Agrandir' : 'Zoom'}
                  </span>
                </button>

                <div className="relative -mt-12 px-5 pb-2 sm:-mt-14 sm:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.45 }}
                    className="rounded-3xl border border-white/15 bg-elevated p-5 shadow-xl sm:p-7"
                  >
                    <p
                      className="mb-3 font-medium text-[11px] tracking-[0.2em] uppercase"
                      style={{ color: accent }}
                    >
                      {fr ? 'Le projet' : 'The project'}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.category && (
                        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-200">
                          {project.category}
                        </span>
                      )}
                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
                        {project.period ?? project.year}
                      </span>
                      {project.role && (
                        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
                          {project.role}
                        </span>
                      )}
                    </div>

                    <h2
                      id="case-study-title"
                      className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                      {project.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                      {project.longDescription}
                    </p>
                    {project.overview?.map((p) => (
                      <p
                        key={p.slice(0, 40)}
                        className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
                      >
                        {p}
                      </p>
                    ))}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/15 bg-bg px-2.5 py-1 font-mono text-[11px] text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              <div className="space-y-12 px-5 py-10 sm:px-8 sm:py-12">
                {(project.contributions?.length ||
                  project.contributionNote ||
                  project.contributionHighlights?.length) && (
                  <section>
                    <SectionLabel accent={accent}>
                      {fr ? 'Ma contribution' : 'My contribution'}
                    </SectionLabel>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                      {fr ? 'Ce que j’ai fait sur ce projet' : 'What I did on this project'}
                    </h3>
                    {project.contributionNote && (
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
                        {project.contributionNote}
                      </p>
                    )}

                    {project.contributionHighlights &&
                      project.contributionHighlights.length > 0 && (
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {project.contributionHighlights.map((card, i) => (
                            <motion.div
                              key={card.title}
                              initial={{ opacity: 0, y: 14 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.06 }}
                              className="rounded-2xl border border-white/12 bg-elevated p-5"
                            >
                              <p className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                                {fr ? 'Mon apport' : 'My impact'}
                              </p>
                              <h4 className="mt-2 font-display text-base font-semibold text-white sm:text-lg">
                                {card.title}
                              </h4>
                              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                {card.description}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      )}

                    {project.contributions && project.contributions.length > 0 && (
                      <div
                        className={`mt-6 grid gap-4 ${project.contributions.length > 1 ? 'lg:grid-cols-2' : 'max-w-3xl'}`}
                      >
                        {project.contributions.map((block) => (
                          <ul
                            key={block.area}
                            className="space-y-2.5 rounded-2xl border border-white/12 bg-elevated p-5"
                          >
                            <li className="mb-1 list-none font-display text-sm font-semibold text-white">
                              {block.area === 'frontend' ? 'Frontend' : 'Backend'}
                            </li>
                            {block.items.map((item) => (
                              <li key={item} className="flex gap-2.5 text-sm text-slate-300">
                                <CheckCircle2
                                  className="mt-0.5 h-4 w-4 shrink-0"
                                  style={{ color: accent }}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* Modules */}
                {project.features && project.features.length > 0 && (
                  <section>
                    <SectionLabel accent={accent}>
                      {fr ? 'Le système' : 'The system'}
                    </SectionLabel>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                      {fr ? 'Modules de la plateforme' : 'Platform modules'}
                    </h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {project.features.map((feature, i) => {
                        const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length] ?? ArrowUpRight
                        return (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            whileHover={{ y: -4 }}
                            className="rounded-2xl border border-white/12 bg-elevated p-4"
                          >
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-bg text-slate-300">
                              <Icon className="h-4 w-4" />
                            </div>
                            <h4 className="font-display text-sm font-semibold text-white">
                              {feature.title}
                            </h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-[13px]">
                              {feature.description}
                            </p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </section>
                )}

                {/* Architecture */}
                {project.architecture && project.architecture.length > 0 && (
                  <section>
                    <SectionLabel accent={accent}>{fr ? 'Architecture' : 'Architecture'}</SectionLabel>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                      {fr ? 'Architecture technique' : 'Technical architecture'}
                    </h3>
                    <div className="relative mt-8">
                      <div
                        className="absolute top-3 bottom-3 left-[15px] w-px bg-white/15 sm:left-[19px]"
                        aria-hidden
                      />
                      {project.architecture.map((step, i) => (
                        <motion.div
                          key={step.title}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ delay: i * 0.06, duration: 0.4 }}
                          className="relative flex gap-4 pb-7 last:pb-0 sm:gap-5"
                        >
                          <div className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-bg text-slate-300 sm:h-10 sm:w-10">
                            {i === 0 ? (
                              <Boxes className="h-3.5 w-3.5" />
                            ) : i === project.architecture!.length - 1 ? (
                              <Database className="h-3.5 w-3.5" />
                            ) : (
                              <Server className="h-3.5 w-3.5" />
                            )}
                          </div>
                          <div className="rounded-2xl border border-white/12 bg-elevated px-4 py-3 sm:px-5">
                            <p className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                              {String(i + 1).padStart(2, '0')}
                            </p>
                            <h4 className="mt-1 font-display text-sm font-semibold text-white sm:text-base">
                              {step.title}
                            </h4>
                            <p className="mt-1 text-xs text-slate-400 sm:text-sm">{step.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Tech */}
                {project.techStack && project.techStack.length > 0 && (
                  <section>
                    <SectionLabel accent={accent}>
                      {fr ? 'Stack technique' : 'Tech stack'}
                    </SectionLabel>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                      {fr ? 'Outils de production' : 'Production tools'}
                    </h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {project.techStack.map((group, i) => (
                        <motion.div
                          key={group.label}
                          initial={{ opacity: 0, scale: 0.96 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.04 }}
                          className="rounded-2xl border border-white/12 bg-elevated p-4"
                        >
                          <p
                            className="text-[11px] font-semibold tracking-wide uppercase"
                            style={{ color: accent }}
                          >
                            {group.label}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {group.items.map((item) => (
                              <span
                                key={item}
                                className="rounded-md border border-white/12 bg-bg px-2 py-1 text-[11px] text-slate-200"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Gallery */}
                <section>
                  <SectionLabel accent={accent}>{fr ? 'Galerie' : 'Gallery'}</SectionLabel>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                    {fr ? 'Aperçus produit' : 'Product previews'}
                  </h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {(project.gallery?.length ? project.gallery : [project.image]).map((src, i) => (
                      <motion.button
                        key={`${src}-${i}`}
                        type="button"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => openLightbox(src)}
                        data-cursor={fr ? 'Agrandir' : 'Zoom'}
                        className="group relative overflow-hidden rounded-2xl border border-white/12 text-left"
                      >
                        <img
                          src={src}
                          alt={`${project.title} — ${i + 1}`}
                          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span
                          className="absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90"
                          style={{ boxShadow: `0 0 20px ${accent}44` }}
                        >
                          <ZoomIn className="h-4 w-4" style={{ color: accent }} />
                        </span>
                      </motion.button>
                    ))}
                    {(project.gallery?.length ?? 1) < 2 &&
                      [1, 2].map((n) => (
                        <div
                          key={`ph-${n}`}
                          className="flex aspect-[16/10] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-elevated"
                        >
                          <ImageIcon className="h-6 w-6 text-slate-500" />
                          <p className="text-xs text-slate-500">
                            {fr ? `Capture à venir 0${n}` : `Coming soon 0${n}`}
                          </p>
                        </div>
                      ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>

          <ImageLightbox
            open={lightboxIndex !== null}
            images={galleryImages}
            index={lightboxIndex ?? 0}
            title={project.title}
            accent={accent}
            fr={fr}
            onClose={closeLightbox}
            onPrev={() =>
              setLightboxIndex((i) =>
                i === null ? 0 : (i - 1 + galleryImages.length) % galleryImages.length,
              )
            }
            onNext={() =>
              setLightboxIndex((i) =>
                i === null ? 0 : (i + 1) % galleryImages.length,
              )
            }
            onSelect={setLightboxIndex}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ImageLightbox({
  open,
  images,
  index,
  title,
  accent,
  fr,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: {
  open: boolean
  images: string[]
  index: number
  title: string
  accent: string
  fr: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onSelect: (i: number) => void
}) {
  const src = images[index]
  const multi = images.length > 1

  return (
    <AnimatePresence>
      {open && src && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            aria-label={fr ? 'Fermer' : 'Close'}
            className="absolute inset-0 bg-bg/88 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            aria-hidden
            className="theme-ambient pointer-events-none absolute top-1/2 left-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{ background: accent }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.22, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={fr ? 'Aperçu image' : 'Image preview'}
            className="relative z-10 flex w-full max-w-5xl flex-col"
            initial={{ opacity: 0, scale: 0.88, y: 28, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.92, y: 16, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div className="min-w-0">
                <p className="truncate font-mono text-[10px] tracking-[0.18em] text-slate-400 uppercase">
                  {title}
                </p>
                <p className="text-xs text-slate-500">
                  {index + 1} / {images.length}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                data-cursor={fr ? 'Fermer' : 'Close'}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-surface/9 shadow-2xl sm:rounded-3xl"
              style={{
                boxShadow: `0 0 0 1px ${accent}33, 0 0 60px ${accent}22, 0 40px 100px rgba(0,0,0,0.55)`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={src}
                  src={src}
                  alt={`${title} — ${index + 1}`}
                  initial={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="max-h-[72vh] w-full object-contain"
                />
              </AnimatePresence>

              {multi && (
                <>
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label={fr ? 'Précédente' : 'Previous'}
                    data-cursor={fr ? 'Précédente' : 'Previous'}
                    className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/65 sm:left-3 sm:h-11 sm:w-11"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label={fr ? 'Suivante' : 'Next'}
                    data-cursor={fr ? 'Suivante' : 'Next'}
                    className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/65 sm:right-3 sm:h-11 sm:w-11"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {multi && (
              <div className="mt-4 flex justify-center gap-2 overflow-x-auto px-1 pb-1">
                {images.map((thumb, i) => (
                  <button
                    key={`${thumb}-${i}`}
                    type="button"
                    onClick={() => onSelect(i)}
                    className={cn(
                      'relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition-all sm:h-14 sm:w-20',
                      i === index
                        ? 'border-transparent opacity-100 scale-105'
                        : 'border-white/15 opacity-55 hover:opacity-90',
                    )}
                    style={
                      i === index
                        ? { boxShadow: `0 0 0 2px ${accent}, 0 0 18px ${accent}55` }
                        : undefined
                    }
                  >
                    <img
                      src={thumb}
                      alt=""
                      className="h-full w-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SectionLabel({ children, accent }: { children: ReactNode; accent: string }) {
  return (
    <p className="font-medium text-xs tracking-[0.22em] uppercase" style={{ color: accent }}>
      {children}
    </p>
  )
}
