'use client'
import { Language, Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'

import { Header } from '@/payload-types'
import { useEffect, useState } from 'react'
import { set } from 'lodash'
// Define the type for the setState function
type SetOpenType = React.Dispatch<React.SetStateAction<boolean>>
export default function HeaderNav({
  headerObj,
  className,
  setOpen,
  locale,
}: {
  headerObj: Header
  className?: string
  setOpen?: SetOpenType
  locale?: Language
}) {
  // Data
  const nav = headerObj.items
  const menu = nav.map((item) => item.id)
  const pathname = usePathname()

  // Load initial value from sessionStorage
  useEffect(() => {
    if (!pathname.split('/')[2]) {
      sessionStorage.setItem('activeStored', menu[0] as string)
    }
  })

  // States
  const [active, setActive] = useState(sessionStorage.getItem('activeStored') as string)

  const handleClick = (pageId: string) => {
    if (setOpen) {
      setOpen(false)
    }

    sessionStorage.setItem('activeStored', pageId)
    setActive(sessionStorage.getItem('activeStored') as string)
  }

  return (
    <nav className={className}>
      {nav.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className={`font-base  capitalize transition-colors duration-300 inline-block active:text-accent
           py-[1.2rem] hover:text- ${active === item.id ? 'text-accent' : 'text-grey'} `}
          onClick={() => handleClick(item.id as string)}
          replace={true}
        >
          {item.pageName}
        </Link>
      ))}
      {/* cta */}
      {/* <Link
          href="/donation"
          className="bg-primary/90 hover:bg-accent text-white uppercase font-base text-lg px-5 py-px border rounded-lg "
        >
          Donate
        </Link>{" "}
        */}
    </nav>
  )
}
