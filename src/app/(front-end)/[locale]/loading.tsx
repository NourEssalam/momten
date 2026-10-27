import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Loading() {
  const t = useTranslations('Error')

  return (
    <div role="status" aria-live="polite" className="flex min-h-[60vh] items-center justify-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span aria-hidden className="absolute inset-0 rounded-full border-4 border-section" />
        <span
          aria-hidden
          className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary"
        />
        <Image
          src="/img/logos/momtan-logo-header.png"
          alt=""
          width={40}
          height={40}
          className="h-9 w-9 object-contain"
        />
      </div>
      <span className="sr-only">{t('loading')}</span>
    </div>
  )
}
