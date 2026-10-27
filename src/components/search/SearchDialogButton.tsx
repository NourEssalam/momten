'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import Image from 'next/image'
import { ArrowRight, Search, SearchX, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Language, Link } from '@/i18n/routing'
import { useClickedSearchElement } from '@/state-store/search'
import { getSearchResults } from '@/components/search/actions'
import type { SearchResult } from '@/payload-types'

export default function DialogSearchButton({ locale }: { locale: Language }) {
  const t = useTranslations('Search')
  const open = useClickedSearchElement((state) => state.open)
  const setOpen = useClickedSearchElement((state) => state.setOpen)

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={t('title')}
          className="rounded-full p-1 text-grey transition-colors hover:text-accent"
        >
          <Search className="h-6 w-6" aria-hidden />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        {/* centered with auto margins (no transforms), so it works the same in RTL */}
        <DialogPrimitive.Content className="fixed inset-x-4 top-4 z-900 mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl focus:outline-none md:top-[10vh] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
          <DialogPrimitive.Title className="sr-only">{t('title')}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">{t('start')}</DialogPrimitive.Description>
          {/* mounted only while open, so the typed text resets on close */}
          <SearchPanel locale={locale} onNavigate={() => setOpen(false)} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function SearchPanel({ locale, onNavigate }: { locale: Language; onNavigate: () => void }) {
  const t = useTranslations('Search')
  const tHeader = useTranslations('Header')
  const tError = useTranslations('Error')

  const [query, setQuery] = useState('')
  const [debounced] = useDebounce(query, 300)
  const [results, setResults] = useState<SearchResult[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  useEffect(() => {
    const q = debounced.trim()
    if (!q) {
      setResults([])
      setStatus('idle')
      return
    }
    let ignore = false
    setStatus('loading')
    getSearchResults(q, locale)
      .then((res) => {
        if (ignore) return
        setResults(res.docs as unknown as SearchResult[])
        setStatus('done')
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [debounced, locale])

  const hasQuery = query.trim().length > 0
  const isLoading = hasQuery && (status === 'loading' || status === 'idle')
  const items = results.filter((item) => item.slug)

  return (
    <div>
      {/* search field */}
      <div className="flex items-center gap-3 border-b border-tint px-4 py-3 sm:px-5">
        <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        <label htmlFor="site-search" className="sr-only">
          {t('title')}
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('placeholder')}
          dir="auto"
          autoComplete="off"
          enterKeyHint="search"
          className="min-w-0 flex-1 bg-transparent text-base text-shade-strong placeholder:text-grey-light focus:outline-none sm:text-lg [&::-webkit-search-cancel-button]:hidden"
        />
        <DialogPrimitive.Close
          aria-label={tHeader('close')}
          className="rounded-full p-1.5 text-grey transition-colors hover:bg-section"
        >
          <X className="h-5 w-5" aria-hidden />
        </DialogPrimitive.Close>
      </div>

      {/* results */}
      <div className="max-h-[65vh] overflow-y-auto p-2 sm:p-3">
        {!hasQuery && <Hint Icon={Search} text={t('start')} />}

        {isLoading && (
          <ul aria-busy="true" className="space-y-1">
            {[0, 1, 2].map((i) => (
              <li key={i} className="flex items-center gap-4 p-2">
                <div className="h-14 w-20 shrink-0 animate-pulse rounded-lg bg-section" />
                <div className="h-4 flex-1 animate-pulse rounded bg-section" />
              </li>
            ))}
          </ul>
        )}

        {hasQuery && status === 'error' && <Hint Icon={SearchX} text={tError('error')} />}

        {hasQuery && status === 'done' && items.length === 0 && (
          <Hint Icon={SearchX} text={t('notfound')} />
        )}

        {hasQuery && status === 'done' && items.length > 0 && (
          <ul className="space-y-1">
            {items.map((item) => {
              const image = typeof item.image === 'object' && item.image ? item.image : null
              return (
                <li key={item.id}>
                  <Link
                    href={`/blog/${item.slug}`}
                    onClick={onNavigate}
                    className="group flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-section focus-visible:bg-section focus-visible:outline-none"
                  >
                    <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-section">
                      {image?.url && (
                        <Image
                          src={image.url}
                          alt={image.alt || ''}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </span>
                    <span className="line-clamp-2 min-w-0 flex-1 text-sm font-medium text-shade-strong sm:text-base">
                      {item.title}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 rtl:rotate-180"
                      aria-hidden
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

function Hint({ Icon, text }: { Icon: LucideIcon; text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-section text-primary">
        <Icon className="h-7 w-7" aria-hidden />
      </span>
      <p className="text-base text-grey-medium">{text}</p>
    </div>
  )
}
