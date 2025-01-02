import Container from '@/components/shared-components/Container'
import Zpattern from '@/components/shared-components/Zpattern'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import type { Language } from '@/i18n/routing'
import { Media } from '@/payload-types'
import TeamWrapper from './teamWrapper'
export default async function About({ params }: { params: Promise<{ locale: Language }> }) {
  const localePrams = await params
  const { locale } = localePrams
  const result = await queryAboutGlogbal({ locale })
  const { about } = result
  return (
    <section>
      <Container className="flex flex-col justify-center items-center gap-16">
        {about.map((item, index) => (
          <Zpattern
            key={index}
            index={index}
            item={{ ...item, image: item.image as Media }}
            locale={locale}
          />
        ))}
      </Container>
      <TeamWrapper locale={locale} />
    </section>
  )
}

export const queryAboutGlogbal = cache(async ({ locale }: { locale: Language }) => {
  const payload = await getPayload({ config })
  const result = await payload.findGlobal({
    slug: 'about-global', // required
    depth: 2,
    locale: locale,
    // fallbackLocale: false,
    overrideAccess: true,
    showHiddenFields: true,
  })

  return result
})
