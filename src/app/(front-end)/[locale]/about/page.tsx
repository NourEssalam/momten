import type { Language } from '@/i18n/routing'

import TeamWrapper from './teamWrapper'
import { queryAboutMetaData } from './localeApi'
import AboutCards from '@/components/about/about-cards'
export default async function About({ params }: { params: Promise<{ locale: Language }> }) {
  const localePrams = await params
  const { locale } = localePrams
  const result = await queryAboutMetaData({ locale })

  return (
    <section>
      <AboutCards props={result} locale={locale} />
      <TeamWrapper locale={locale} />
    </section>
  )
}
