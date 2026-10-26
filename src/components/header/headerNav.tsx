'use client'
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import { Header } from '@/payload-types'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type SetOpenType = React.Dispatch<React.SetStateAction<boolean>>

export default function HeaderNav({
  headerObj,
  englishHeader,
  className,
  setOpen,
}: {
  headerObj: Header
  englishHeader: Header
  className?: string
  setOpen?: SetOpenType
}) {
  const [active, setActive] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const pageRoute = pathname.split('/')[2]
    if (pageRoute) {
      const item = englishHeader.items.find(
        (item) => item.pageName === pageRoute,
      )
      setActive(item?.id ?? '')
    } else {
      const id = englishHeader.items[0].id
      setActive(id ?? '')
    }
  }, [pathname, englishHeader.items])

  const nav = headerObj.items

  const handleClick = (pageId: string) => {
    if (setOpen) {
      setOpen(false)
    }
    setActive(pageId)
  }

  return (
    <nav className={className}>
      {nav.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className={cn(
            'relative inline-block py-2 font-medium capitalize transition-colors duration-300 hover:text-primary',
            // small dot under the active link on desktop
            'lg:after:absolute lg:after:-bottom-1 lg:after:left-1/2 lg:after:h-1 lg:after:w-1 lg:after:-translate-x-1/2 lg:after:rounded-full lg:after:bg-accent lg:after:transition-opacity',
            active === item.id
              ? 'text-accent lg:after:opacity-100'
              : 'text-grey lg:after:opacity-0',
          )}
          onClick={() => handleClick(item.id as string)}
          replace={true}
        >
          {item.pageName}
        </Link>
      ))}
    </nav>
  )
}
