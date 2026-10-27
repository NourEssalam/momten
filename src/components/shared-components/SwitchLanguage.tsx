'use client'
import { Check, Globe, Loader2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Language, usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { getPostSlugForLocale } from './switchSlugAction'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
]

export default function SwitchLanguage() {
  const t = useTranslations('SwitchLanguage')
  const locale = useLocale() as Language
  const pathname = usePathname() // path without the language prefix, e.g. /blog/my-post
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const switchTo = (next: Language) => {
    if (next === locale) return

    startTransition(async () => {
      let target = pathname

      // Blog post slugs are translated, so find the matching post in the new language
      const blogPost = pathname.match(/^\/blog\/([^/]+)\/?$/)
      if (blogPost) {
        const slug = await getPostSlugForLocale({ slug: blogPost[1], from: locale, to: next })
        target = slug ? `/blog/${encodeURIComponent(slug)}` : '/blog'
      }

      router.push(`${target}${window.location.search}`, { locale: next })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t('choose')}
          className="rounded-full p-1 text-grey transition-colors hover:text-accent"
        >
          {isPending ? (
            <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
          ) : (
            <Globe className="h-6 w-6" aria-hidden />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-100 w-44 rounded-xl p-1.5 shadow-lg">
        {LANGUAGES.map(({ code, label }) => (
          <DropdownMenuItem
            key={code}
            lang={code}
            onSelect={() => switchTo(code)}
            className={cn(
              'cursor-pointer justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium focus:bg-section focus:text-shade-strong',
              code === locale ? 'bg-section text-shade-strong' : 'text-grey',
            )}
          >
            {label}
            {code === locale && <Check className="h-4 w-4 text-primary" aria-hidden />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
