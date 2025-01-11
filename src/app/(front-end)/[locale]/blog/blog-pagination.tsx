import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination'
import Container from '@/components/shared-components/Container'
import { Language } from '@/i18n/routing'

export default function BlogPagination({
  title = '',
  page = 1,
  totalPages = 1,
  locale = 'en',
}: {
  title?: string | string[]
  page?: number
  totalPages?: number
  locale?: Language
}) {
  let iterableTotalPages: number[] = []
  if (page === 1) {
    iterableTotalPages = [page, page + 1, page + 2]
  } else if (page === totalPages) {
    iterableTotalPages = [page - 2, page - 1, page]
  } else {
    iterableTotalPages = [page - 1, page, page + 1]
  }

  return (
    <Container>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={{
                pathname: '/blog',
                query: { ...(title ? { title } : {}), page: page > 1 ? page - 1 : 1 },
              }}
              className={`${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
              locale={locale}
            />
          </PaginationItem>
          {iterableTotalPages.map(
            (item) =>
              item > 0 &&
              item <= totalPages && (
                <PaginationItem key={item}>
                  <PaginationLink
                    href={{
                      pathname: '/blog',
                      query: {
                        ...(title ? { title } : {}),
                        page: item !== 1 ? item : 1,
                      },
                    }}
                    className={`${page === item ? 'bg-primary text-white' : ''}`}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ),
          )}

          {totalPages - page > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              locale={locale}
              href={{
                pathname: '/blog',
                query: {
                  ...(title ? { title } : {}),
                  page: page < totalPages ? page + 1 : page,
                },
              }}
              className={`${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Container>
  )
}
