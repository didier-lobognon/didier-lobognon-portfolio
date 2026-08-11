import type { Project } from '@/types'
import { projectsEn } from '@/data/projects.en'

export function pickLocale<T>(fr: T, en: T, locale: string): T {
  return locale === 'en' ? en : fr
}

/** Applique la copie EN d’un projet si locale = en */
export function localizeProject(project: Project, locale: string): Project {
  if (locale !== 'en') return project
  const copy = projectsEn[project.id]
  if (!copy) return project
  return { ...project, ...copy }
}
