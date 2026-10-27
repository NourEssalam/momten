import type { Language } from '@/i18n/routing'

import TeamWrapper from './teamWrapper'
import { queryAbout } from './query'
import AboutCards from '@/components/about/about-cards'
import AboutHero from '@/components/about/AboutHero'
export default async function About({
  params,
}: {
  params: Promise<{ locale: Language }>
}) {
  const localePrams = await params
  const { locale } = localePrams
  const result = await queryAbout({ locale })

  return (
    <section>
      <AboutHero />
      {result && <AboutCards props={result} locale={locale} />}
      <TeamWrapper locale={locale} />
    </section>
  )
}
