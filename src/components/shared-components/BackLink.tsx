'use client'
import { cn } from '@/lib/cn'

import { Link } from '@/i18n/routing'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
export default function BackLink({
  className = '',
  toPage,
}: {
  className?: string
  toPage?: string
}) {
  const t = useTranslations('BackLinks')
  return (
    <Link href={`/${toPage}`} className={cn(className)}>
      {/* Back */}
      <div className=" flex gap-2  ">
        <ArrowLeft />
        <span className=" translate-x-0 hover:translate-x-2 transition-all duration-300">
          {t(toPage)}
        </span>
      </div>
    </Link>
  )
}
