import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
  const t = useTranslations('Error')
  return <h1>{t('NotFoundPage')}</h1>
}
