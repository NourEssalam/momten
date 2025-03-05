'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaGlobeAmericas } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getIdByCurrentSlug } from './switchSlugAction'
import { Language } from '@/i18n/routing'

export default function SwitchLanguage() {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const [position, setPosition] = useState(`${segments[1]}`)
  const router = useRouter()

  const handleLanguageChange = (value: React.SetStateAction<string>) => {
    setPosition(value)
    console.log('value', value)
    segments[1] = value as Language
    router.push(segments.join('/'))
  }

  useEffect(() => {
    const getId = async () => {
      const id = await getIdByCurrentSlug({
        slug: segments[segments.length - 1],
        locale: segments[1] as Language,
        position: position as Language,
      })
      return id
    }

    if (segments.length > 3 && segments[2].includes('blog')) {
      getId()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="sm">
          <FaGlobeAmericas
            className="text-grey w-6 h-6  cursor-pointer 
                        hover:text-accent"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-10 z-100 lg:mx-2 justify-center items-center">
        {/* <DropdownMenuLabel>{t('choose')}</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={handleLanguageChange}
          className="items-center justify-center"
        >
          <DropdownMenuRadioItem
            className="items-center justify-center"
            value="ar"
          >
            العربية
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="items-center justify-center"
            value="en"
          >
            English
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="items-center justify-center"
            value="fr"
          >
            Français
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
