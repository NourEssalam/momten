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
import Loading from './loading'
import { useTranslations } from 'next-intl'
export default function DialogSearchButton() {
  const t = useTranslations('Search')
  const searchParams = useSearchParams()
  const [searchResults, setSearchResults] = useState<PaginatedDocs | null>(null)

  const search = searchParams.get('search')
  useEffect(() => {
    const searchResults = async () => {
      if (!search) return setSearchResults(null)
      const results: PaginatedDocs = await getSearchResults(search || '')

      setSearchResults(results)
    }
    searchResults()
  }, [search])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <span className="cursor-pointer">
            <CiSearch className="text-grey stroke-1 w-7 h-7 hover:text-accent" />
          </span>
        </DialogTrigger>
        <DialogContent
          className=" gap-0 max-w-[640px] inset-0 p-4 mx-auto md:my-10  bg-white left-[0%] top-[0%] 
      translate-x-[0%] translate-y-[0%]"
        >
          <DialogHeader className=" text-left mb-0 gap-2 space-x-0">
            <DialogTitle className="text-2xl">{t('title')}</DialogTitle>
            <Description></Description>
            <SearchForm />
          </DialogHeader>

          {/* Results */}
          {!searchResults ? (
            <p>{t('start')}</p>
          ) : (
            <div className="overflow-y-scroll md:grid grid-cols-2 gap-3 mt-4 ">
              <div className="flex flex-col gap-2 p-4">
                {searchResults?.docs.length > 0 ? (
                  <Suspense fallback={<Loading />}>
                    <div className=" grid grid-cols-2">
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
                  </Suspense>
                ) : (
                  //
                  <p>{t('notfound')}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
