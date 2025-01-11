'use client'
import { Language, Link } from '@/i18n/routing'
import Image from 'next/image'

import { mainMenu } from '@/lib/menus'
import { CiMenuFries } from 'react-icons/ci'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import { useEffect, useState } from 'react'
import { mainMenuType } from '@/lib/types/menu-types'

import SwitchLanguage from '../shared-components/SwitchLanguage'
import DialogSearchButton from '@/components/search/SearchDialogButton'
import HeaderNav from './headerNav'

import type { Header } from '@/payload-types'

export default function Header({ headerObj, locale }: { headerObj: Header; locale: Language }) {
  const [open, setOpen] = useState(false)
  const [sticky, setSticky] = useState('initial')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setSticky('initial')
      } else if (window.scrollY > lastScrollY) {
        setSticky('unset')
      } else if (window.scrollY < lastScrollY) {
        setSticky('set')
      }

      setLastScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)

    if (open) {
      // Use Tailwind's overflow-hidden utility to disable body scroll
      document.body.classList.add('overflow-hidden')
    } else {
      // Remove the class when menu is closed
      document.body.classList.remove('overflow-hidden')
    }

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden')
      window.removeEventListener('scroll', handleScroll)
    }
  }, [open, lastScrollY])

  return (
    <header
      className={`bg-white flex items-center  py-5 px-5 z-60 md:px-10  border-b-4 border-b-primary
     lg:px-20 h-16   w-full justify-between  transition-all duration-700
     ${sticky === 'initial' ? 'sticky top-0  opacity-100' : ''}

     ${sticky === 'set' ? 'sticky top-0  ' : ''}
     ${sticky === 'unset' ? 'sticky top-0 opacity-0 invisible' : ''}`}
    >
      <Link href="/" className=" w-16 h-16 lg:w-16 lg:h-16 ">
        <Image
          src="/img/logos/momtan-logo-header.png"
          alt="logo of the header"
          width="100"
          height="100"
          // fill={true}
          sizes="(max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-contain"
          priority={true}
        />
      </Link>
      {/* //desktop and big screen nav */}
      <HeaderNav headerObj={headerObj} className="hidden lg:flex items-center gap-6  text-lg" />
      {`${sticky === 'set' ? '   ' : ''}`}
      <div className="action hidden  lg:flex justify-between lg:w-24 gap-6 items-center">
        <DialogSearchButton locale={locale} />

        <SwitchLanguage />
      </div>

      {/* nav actions */}
      <div className="action lg:hidden   flex justify-between lg:w-24 gap-6 items-center">
        <DialogSearchButton locale={locale} />

        <SwitchLanguage />
        <div className="open-close relative  flex items-center justify-center">
          <CiMenuFries
            onClick={() => setOpen(!open)}
            className={` stroke-1 w-6 h-6 cursor-pointer text-grey transition-opacity duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <IoIosCloseCircleOutline
            className={`absolute transition-opacity duration-300 ${
              open ? 'opacity-100' : 'opacity-0'
            } cursor-pointer text-grey h-8 w-8 z-900`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* mobile nav */}

      <nav
        className={`w-full h-full  fixed top-0 right-0 flex flex-col
           justify-center items-center gap-0
         bg-white text-tint z-100 transition-all duration-300 transform opacity-90 
           ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <HeaderNav
          headerObj={headerObj}
          setOpen={setOpen}
          className="flex flex-col items-center gap-6  text-lg font-medium"
        />
      </nav>
    </header>
  )
}
