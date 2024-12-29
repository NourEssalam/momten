'use client'
import { useEffect, useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'

import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { useTranslations } from 'next-intl'
export default function SearchForm() {
  const t = useTranslations('Search')
  const [search, setSearch] = useState('')
  const [query] = useDebounce(search, 500)
  const router = useRouter()
  useEffect(() => {
    router.push(`?search=${query}`)
  }, [router, query])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          type="search"
          id="search"
          placeholder={t('placeholder')}
          className="md:w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>
  )
}
