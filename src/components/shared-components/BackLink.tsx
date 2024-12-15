'use client'
import { cn } from '@/lib/cn'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BackLink({ className = '' }: { className?: string }) {
  const pathname = usePathname()
  const parentPath = pathname.split('/')[1]
  return (
    <Link href={`/${parentPath}`} className={cn(className)}>
      {/* Back */}
      <div className=" flex gap-2  ">
        <ArrowLeft />
        <span className=" translate-x-0 hover:translate-x-2 transition-all duration-700">
          {`Back to ${parentPath}`}
        </span>
      </div>
    </Link>
  )
}
