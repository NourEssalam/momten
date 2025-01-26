'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/search/SearchDialog'
import { CiSearch } from 'react-icons/ci'
import { Description } from '@radix-ui/react-dialog'
import SearchForm from '@/components/search/searchForm'
import { useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'
import { Language } from '@/i18n/routing'
import { GiArchiveResearch } from 'react-icons/gi'
import SearchList from './searchList'
import { useClickedSearchElement } from '@/state-store/search'

export default function DialogSearchButton({ locale }: { locale: Language }) {
  const t = useTranslations('Search')
  const searchParams = useSearchParams()
  const open = useClickedSearchElement((state) => state.open)
  const setOpen = useClickedSearchElement((state) => state.setOpen)
  const search = searchParams.get('search')

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span className="cursor-pointer">
            <CiSearch
              className="text-grey stroke-1 w-7 h-7 hover:text-accent"
              onClick={() => setOpen(true)}
            />
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
