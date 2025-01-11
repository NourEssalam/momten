'use client'
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
// interface HeaderProps {
//   nav: { pageName: string; url: string; id?: string | null | undefined }[]
// }
import { Header } from '@/payload-types'
// Define the type for the setState function
type SetOpenType = React.Dispatch<React.SetStateAction<boolean>>

export default function HeaderNav({
  headerObj,
  className,
  setOpen,
}: {
  headerObj: Header
  className?: string
  setOpen?: SetOpenType
}) {
  const nav = headerObj.items
  const pathname = usePathname()
  const menu = nav.map((item) => item.pageName)
  let page = pathname.split('/')[2]
  if (!page) page = menu[0]

  return (
    <nav className={className}>
      {nav.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className={`text-grey font-base  capitalize transition-colors duration-300 inline-block
           py-[1.2rem] hover:text-accent active:text-shade ${page === item.pageName ? 'text-accent' : ''}`}
          onClick={() => setOpen && setOpen(false)}
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
