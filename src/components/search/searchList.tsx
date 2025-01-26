'use client'
import { useSearchParams } from 'next/navigation'
import { getSearchResults } from '@/components/search/actions'
import { useEffect, useState } from 'react'
import { Language } from '@/i18n/routing'
import { PaginatedDocs } from 'payload'
import SearchResultElement from './SearchResultElement'
import NoResult from '../shared-components/no-result'
import { delay } from '@/lib/timers'
import SearchLoading from './seearchLoading'

export default function SearchList({ locale }: { locale: Language }) {
  const searchParams = useSearchParams()
  const [searchResults, setSearchResults] = useState<PaginatedDocs | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const search = searchParams.get('search')
  useEffect(() => {
    const searchResults = async () => {
      setIsLoading(true) // Start loading
      await delay(2000)

      const results: PaginatedDocs = await getSearchResults(
        search || '',
        locale,
      )

      setIsLoading(false)
      setSearchResults(results)
    }
    searchResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  if (isLoading) {
    return <SearchLoading />
  }

  return (
    <div className="  mt-4 h-[90%] pb-4">
      {searchResults?.docs && searchResults?.docs.length > 0 ? (
        <div
          className=" h-[400px] flex flex-col gap-1 scrollbar-thumb-rounded-full
                                 scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700
                                  scrollbar-track-slate-300 overflow-y-scroll"
        >
          {searchResults?.docs.map((item) => (
            <SearchResultElement
              key={item.id}
              title={item.title}
              image={item.image}
              slug={item.slug}
              {...item}
            />
          ))}
        </div>
      ) : (
        //
        <NoResult />
      )}
    </div>
  )
}
