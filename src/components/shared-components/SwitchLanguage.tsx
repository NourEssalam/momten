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
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function SwitchLanguage() {
  const t = useTranslations('SwitchLanguage')
  const pathname = usePathname()
  const [position, setPosition] = useState(
    `${pathname.includes('/ar/') || pathname === '/ar' ? 'arabic' : 'english'}`,
  )
  const router = useRouter()
  const handleLanguageChange = (value: React.SetStateAction<string>) => {
    setPosition(value)

    if (value === 'arabic' && (pathname.includes('/en/') || pathname === '/en')) {
      const segments = pathname.split('/')
      segments[1] = 'ar'
      router.push(segments.join('/'))
    } else if (value === 'english' && (pathname.includes('/ar/') || pathname === '/ar')) {
      const segments = pathname.split('/')
      segments[1] = 'en'
      router.push(segments.join('/'))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="sm">
          <FaGlobeAmericas className="text-grey w-6 h-6  cursor-pointer hover:text-accent" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-10">
        <DropdownMenuLabel>{t('choose')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem value="arabic">{t('arabic')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="english">{t('english')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
