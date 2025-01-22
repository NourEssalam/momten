'use client'
import { Language, Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import { Header } from '@/payload-types'
import { useEffect, useState } from 'react'

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
          className={`font-base capitalize transition-colors duration-300 inline-block active:text-red-500
           py-[1.2rem] hover:text-primary ${active === item.id ? 'text-accent' : 'text-grey'}`}
          onClick={() => handleClick(item.id as string)}
          replace={true}
        >
          {item.pageName}
        </Link>
      ))}
    </nav>
  )
}
