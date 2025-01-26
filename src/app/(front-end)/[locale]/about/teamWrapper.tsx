import Team from '@/components/about/Team'
import Container from '@/components/shared-components/Container'
import { Language } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
export default function TeamWrapper({ locale }: { locale: Language }) {
  const t = useTranslations('Team')
  return (
    <Container>
      <div className="flex flex-col text-center w-full mb-6 sm:mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-shade-strong">
          {t('title')}
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-secondary">
          {t('desc')}
        </p>
      </div>
      <Team locale={locale} />
    </Container>
  )
}
