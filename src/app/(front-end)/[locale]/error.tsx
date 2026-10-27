'use client'

import { useEffect } from 'react'
import { Home, RotateCcw, TriangleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/cn'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('Error')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="container flex min-h-[60vh] items-center justify-center">
      <div className="flex max-w-xl flex-col items-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-section text-primary">
          <TriangleAlert className="h-10 w-10" aria-hidden />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-shade-strong sm:text-3xl">{t('error')}</h1>
        <p className="mt-3 text-grey-medium">{t('errorDesc')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2 text-base font-semibold')}
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            {t('tryAgain')}
          </button>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'outlinePrimary', size: 'lg' }),
              'gap-2 text-base font-semibold',
            )}
          >
            <Home className="h-4 w-4" aria-hidden />
            {t('backHome')}
          </Link>
        </div>
      </div>
    </section>
  )
}
