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

export default function SwitchLanguage() {
  const [position, setPosition] = useState('english')
  const router = useRouter()

  const handleLanguageChange = (value: React.SetStateAction<string>) => {
    setPosition(value)

    if (value === 'arabic') {
      router.push('?locale=ar')
    } else if (value === 'french') {
      router.push('?locale=fr')
    } else {
      router.push('?locale=en')
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
        <DropdownMenuLabel>Choose Your Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem value="arabic">Arabic</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="english">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="french">French</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
