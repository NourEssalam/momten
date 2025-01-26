'use client'

import { useEffect, useState } from 'react'
export default function Loading() {
  const [count, setCount] = useState(4)
  useEffect(() => {
    setTimeout(() => {
      if (count === 0) return
      setCount(count - 1)
    }, 4000 / count)
  }, [count])

  return (
    <div className="flex items-center justify-center min-h-screen gap-4" dir="ltr">
      <div className="w-24 h-24 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      <span>{count} Please wait ...</span>
    </div>
  )
}
