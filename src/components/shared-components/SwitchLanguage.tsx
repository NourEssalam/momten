'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaGlobeAmericas } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { getIdByCurrentSlug } from './switchSlugAction'
import { Language } from '@/i18n/routing'

export default function SwitchLanguage() {
  const t = useTranslations('SwitchLanguage')
  const pathname = usePathname()
  const [position, setPosition] = useState(
    `${pathname.includes('/ar/') || pathname === '/ar' ? 'ar' : 'en'}`,
  )
  const router = useRouter()

  const segments = pathname.split('/')

  const handleLanguageChange = (value: React.SetStateAction<string>) => {
    setPosition(value)

    if (value === 'ar' && (pathname.includes('/en/') || pathname === '/en')) {
      segments[1] = 'ar'
      router.push(segments.join('/'))
    } else if (value === 'en' && (pathname.includes('/ar/') || pathname === '/ar')) {
      segments[1] = 'en'
      router.push(segments.join('/'))
    }
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
      <DropdownMenuContent className="w-48 mr-10">
        <DropdownMenuLabel>{t('choose')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem value="ar">{t('arabic')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">{t('english')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
