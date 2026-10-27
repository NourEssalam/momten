import { Home } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/cn'

// Also used as a plain component (e.g. by the About detail page), so it takes no props.
export default function NotFoundPage() {
  const t = useTranslations('Error')

  return (
    <section className="container flex min-h-[60vh] items-center justify-center">
      <div className="relative isolate flex max-w-xl flex-col items-center text-center">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-section blur-3xl"
        />
        <p className="bg-gradient-to-br from-primary to-shade bg-clip-text text-8xl font-extrabold leading-none text-transparent sm:text-9xl">
          404
        </p>
        <h1 className="mt-6 text-2xl font-bold text-shade-strong sm:text-3xl">
          {t('NotFoundPage')}
        </h1>
        <p className="mt-3 text-grey-medium">{t('notFoundDesc')}</p>
        <Link
          href="/"
          className={cn(buttonVariants({ size: 'lg' }), 'mt-8 gap-2 text-base font-semibold')}
        >
          <Home className="h-4 w-4" aria-hidden />
          {t('backHome')}
        </Link>
      </div>
    </section>
  )
}
