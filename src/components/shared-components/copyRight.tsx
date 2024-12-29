import { useTranslations } from 'next-intl'
export default function CopyRight({ year }: { year: number }) {
  const t = useTranslations('CopyRight')
  return (
    <p className="text-sm iniline-block text-grey-light lg:col-span-3 text-center">
      {`${t('title')} © ${year} ${t('by Momtan')} ${t('desc')}.`}
    </p>
  )
}
