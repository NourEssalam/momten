'use client'
import { Link } from '@/i18n/routing'

interface HeaderProps {
  nav: { pageName: string; url: string; id?: string | null | undefined }[]
}
export default function HeaderNav({ nav }: HeaderProps) {
  return (
    <nav className="hidden lg:flex items-center gap-6 text-xs">
      {nav.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          className="text-grey font-base text-lg capitalize transition-colors duration-300 inline-block
           py-[1.2rem] hover:text-accent active:text-shade"
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
