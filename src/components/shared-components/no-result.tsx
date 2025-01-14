import { CiNoWaitingSign } from 'react-icons/ci'
import BackLink from './BackLink'
import { useTranslations } from 'next-intl'
export default function NoResult({ backLink = false }: { backLink?: boolean }) {
  const t = useTranslations('Error')
  return (
    <section className="w-full h-[300px] flex flex-col gap-5 justify-center items-center">
      <CiNoWaitingSign className="text-4xl lg:text-9xl text-red-700" />
      <h2>{t('no-result')}</h2>
      {backLink && <BackLink toPage="blog" />}
    </section>
  )
}
