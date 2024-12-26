'use client'
import { Category } from '@/payload-types'
import { useCategoryStore } from '@/state-store/category-store'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function Categories({ result }: { result: Category[] }) {
  // fetch categories
  const categories = result.map((cat: Category) => cat.title)
  categories.unshift('All')
  // handle states
  const setCategory = useCategoryStore((state) => state.setCategory)
  const activeCategory = useCategoryStore((state) => state.category)

  const router = useRouter()
  useEffect(() => {
    router.push(`?title=${activeCategory}`)
  }, [activeCategory, router])

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-medium text-shade-strong leading-6 mb-8 capitalize">
        Categories
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`text-lg font-thin  cursor-pointer  ${
              activeCategory === cat
                ? 'text-black border-b-2 border-black font-semibold' // Active category styles
                : 'text-gray-600  hover:text-black'
            }`}
            onClick={() => setCategory(cat)} // Update active category on click
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
