'use client'

import { useTranslations } from 'next-intl'

export default function Error() {
  const t = useTranslations('Error')

  return (
    <div>
      <h1>{t('error')}</h1>
    </div>
  )
}
