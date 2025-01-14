'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/search/SearchDialog'
import { Suspense } from 'react'
import { CiSearch } from 'react-icons/ci'
import SearchResultElement from '@/components/search/SearchResultElement'
import { Description } from '@radix-ui/react-dialog'
import SearchForm from '@/components/search/searchForm'
import { useSearchParams } from 'next/navigation'
import { getSearchResults } from '@/components/search/actions'
import { useEffect, useState } from 'react'
import { PaginatedDocs } from 'payload'
import Loading from '../../app/(front-end)/[locale]/loading'
import { useTranslations } from 'next-intl'
import { Language } from '@/i18n/routing'
import { GiArchiveResearch } from 'react-icons/gi'
import NoResult from '@/components/shared-components/no-result'
import SearchList from './searchList'

export default function DialogSearchButton({ locale }: { locale: Language }) {
  const t = useTranslations('Search')
  const searchParams = useSearchParams()
  const [searchResults, setSearchResults] = useState<PaginatedDocs | null>(null)

  const search = searchParams.get('search')
  useEffect(() => {
    const searchResults = async () => {
      if (!search) return setSearchResults(null)
      const results: PaginatedDocs = await getSearchResults(
        search || '',
        locale,
      )

      setSearchResults(results)
    }
    searchResults()
  }, [search, locale])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <span className="cursor-pointer">
            <CiSearch className="text-grey stroke-1 w-7 h-7 hover:text-accent" />
          </span>
        </DialogTrigger>
        <DialogContent
          className="  gap-0 max-w-[640px] max-h-[640px] inset-0 p-4 z-900 mx-auto md:my-10  bg-white left-[0%] top-[0%] 
      translate-x-[0%] translate-y-[0%]"
        >
          <DialogHeader className=" mb-0 gap-2 space-x-0">
            <DialogTitle className="text-2xl  text-center">
              {t('title')}
            </DialogTitle>
            <Description></Description>
            <SearchForm />
          </DialogHeader>

          {/* Results */}
          {!search ? (
            <div className="h-[400px] flex flex-col items-center justify-center gap-4  m-4">
              <GiArchiveResearch size={100} />
              <p className="text-2xl">{t('start')}...</p>
            </div>
          ) : (
            <SearchList locale={locale} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
