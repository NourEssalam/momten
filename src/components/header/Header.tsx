'use client'
import { Language, Link } from '@/i18n/routing'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import SwitchLanguage from '../shared-components/SwitchLanguage'
import DialogSearchButton from '@/components/search/SearchDialogButton'
import HeaderNav from './headerNav'
import { cn } from '@/lib/cn'

import type { Header } from '@/payload-types'

export default function Header({
  englishHeader,
  headerObj,
  locale,
}: {
  englishHeader: Header
  headerObj: Header
  locale: Language
}) {
  const t = useTranslations('Header')
  const [open, setOpen] = useState(false)
  const [scrollDir, setScrollDir] = useState<'top' | 'up' | 'down'>('top')
  const lastY = useRef(0)

  // Hide the header while scrolling down, show it again when scrolling up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y <= 0) setScrollDir('top')
      else if (y > lastY.current) setScrollDir('down')
      else if (y < lastY.current) setScrollDir('up')
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the mobile menu is open, close it with Escape
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('overflow-hidden')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const hidden = false

  return (
    <header
      className={cn(
        'sticky top-0 z-60 w-full border-b border-tint bg-white transition-opacity duration-500',
        hidden ? 'invisible opacity-0' : 'opacity-100',
      )}
    >
      <div className="mx-auto grid h-[4.5rem] max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-10 lg:px-20">
        <Link href="/" className="block h-14 w-16">
          <Image
            src="/img/logos/momtan-logo-header.png"
            alt="logo of the header"
            width="100"
            height="100"
            sizes="64px"
            className="h-full w-full object-contain"
            priority
          />
        </Link>

        {/* desktop nav */}
        <HeaderNav
          headerObj={headerObj}
          englishHeader={englishHeader}
          className="hidden items-center justify-self-center gap-8 text-base lg:flex"
        />

        {/* actions (search + language, plus the menu button on mobile) */}
        <div className="col-start-3 flex items-center justify-self-end gap-4 lg:gap-6">
          <DialogSearchButton locale={locale} />
          <SwitchLanguage />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t('menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full p-1 text-grey transition-colors hover:text-primary lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-100 flex flex-col bg-white transition-all duration-300 lg:hidden',
          open
            ? 'visible translate-x-0'
            : 'invisible translate-x-full rtl:-translate-x-full',
        )}
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-tint px-5 md:px-10">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block h-14 w-16"
          >
            <Image
              src="/img/logos/momtan-logo-header.png"
              alt="logo of the header"
              width="100"
              height="100"
              sizes="64px"
              className="h-full w-full object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t('close')}
            className="rounded-full p-2 text-grey transition-colors hover:bg-section"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center pb-16">
          <HeaderNav
            headerObj={headerObj}
            englishHeader={englishHeader}
            setOpen={setOpen}
            className="flex flex-col items-center gap-3 text-2xl"
          />
        </div>
      </div>
    </header>
  )
}
