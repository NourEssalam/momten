'use client'
import { useState } from 'react'

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState('general') // default active category

  const categories = [
    'general',
    'sustainability',
    'citizenship',
    'leadership',
    'initiatives',
    'stories',
  ]

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat) // Set the clicked category as active
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-medium text-shade-strong leading-6 mb-8">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`text-lg font-thin  cursor-pointer p-2 ${
              activeCategory === cat
                ? 'text-black border-b-2 border-black font-semibold' // Active category styles
                : 'text-grey-medium hover:underline hover:text-black'
            }`}
            onClick={() => handleCategoryClick(cat)} // Update active category on click
          >
            {/* Link to the category */}
            {/* <Link href={`#`}>{cat}</Link> */}
            <button className="capitalize">{cat}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
