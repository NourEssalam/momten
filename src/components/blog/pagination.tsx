import Link from 'next/link'

export default function Pagination({
  title,
  page,
}: {
  title?: string | string[]
  page?: string | string[]
}) {
  const nextPage = typeof page === 'string' ? Number(page) : 1
  return (
    <Link
      href={{
        pathname: '/blog',
        query: { ...(title ? { title } : {}), page: nextPage + 1 },
      }}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
      // onClick={() => router.replace('?page=2')}
    >
      Next
    </Link>
  )
}
