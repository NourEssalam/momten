import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
  const t = useTranslations('Error')
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">{t('NotFoundPage')}</h1>
    </div>
  )
}
