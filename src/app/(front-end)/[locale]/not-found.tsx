import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
  const t = useTranslations('Error')
  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-1xl lg:text-3xl  bg-red-700">{t('NotFoundPage')}</h1>
    </div>
  )
}
