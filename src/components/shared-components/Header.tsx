'use client'
import Link from 'next/link'
import Image from 'next/image'

import { mainMenu } from '@/lib/menus'
import { CiMenuFries } from 'react-icons/ci'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import { useEffect, useState } from 'react'
import { mainMenuType } from '@/lib/types/menu-types'

import SwitchLanguage from './SwitchLanguage'
import SearchWrapper from '@/components/search/searchWrapper'
import DialogSearchButton from '@/components/search/SearchDialogButton'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [sticky, setSticky] = useState('initial')

  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setSticky('initial')
      } else if (window.scrollY > lastScroll) {
        setSticky('unset')
      } else if (window.scrollY < lastScroll) {
        setSticky('set')
      }

      lastScroll = window.scrollY - 1
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
  }, [open])

  return (
    <header
      className={`bg-white flex items-center py-5 px-5 md:px-10  border-b-4 border-b-primary
     lg:px-20 h-16   w-full justify-between  transition-all duration-700
     ${sticky === 'initial' ? 'sticky top-0 opacity-100' : ''}

     ${sticky === 'set' ? 'sticky top-0 z-20 ' : ''}
     ${sticky === 'unset' ? 'sticky top-0 opacity-0' : ''}`}
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
      <nav className="hidden lg:flex items-center gap-6 text-xs">
        {mainMenu.map((menu: mainMenuType) => (
          <Link
            key={menu.name}
            href={menu.href}
            className="text-grey font-base text-lg capitalize transition-colors duration-300 inline-block
           py-[1.2rem] hover:text-accent active:text-shade"
          >
            {menu.name}
          </Link>
        ))}
        {/* cta */}
        {/* <Link
          href="/donation"
          className="bg-primary/90 hover:bg-accent text-white uppercase font-base text-lg px-5 py-px border rounded-lg "
        >
          Donate
        </Link>{" "} */}
      </nav>
      <div className="action hidden  lg:flex justify-between lg:w-24 gap-6 items-center">
        <DialogSearchButton />

        <SwitchLanguage />
      </div>

      {/* nav actions */}
      <div className="action lg:hidden   flex justify-between lg:w-24 gap-6 items-center">
        <DialogSearchButton />

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
            } cursor-pointer text-grey h-8 w-8 z-20`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* mobile nav */}

      <nav
        className={`w-full h-full  fixed top-0 right-0 flex flex-col
           justify-center items-center gap-0
         bg-white text-tint z-5 transition-all duration-300 transform opacity-90 
           ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col items-center justify-center   w-full h-[90%] overflow-scroll">
          {mainMenu.map((menu: mainMenuType) => (
            <Link
              key={menu.name}
              href={menu.href}
              className="text-grey font-medium text-xl capitalize transition-colors duration-300 
           py-[1.2rem] hover:text-shade active:text-shade"
              onClick={() => setOpen(!open)}
            >
              {menu.name}
            </Link>
          ))}
          {/* <Button asChild>
            <Link
              href="/donation"
              //     className="bg-primary/90 hover:bg-primary hover:transform hover:scale-[1.05] text-white uppercase
              //  font-medium text-xl px-5 py-px border rounded-lg "
            >
              Donate
            </Link>
          </Button> */}
        </div>
      </nav>
    </header>
  )
}
