import { cn } from '@/lib/cn'

import React from 'react'
// import clsx from "clsx";

type ContainerProps = {
  id?: string
  variant?: 'default' | 'rounded-primary' | 'rounded-secondary'
  className?: string // Allow custom styles to be passed
  innerClassName?: string
}

export default function Container({
  children,
  id,
  variant = 'default',
  className,
  innerClassName,
  ...props
}: Readonly<{
  children: React.ReactNode
}> &
  ContainerProps) {
  return (
    <section
      className={cn(
        'container',
        // Primary rounded section
        className,
      )}
      {...props}
    >
      {variant === 'default' ? (
        children
      ) : (
        <div
          className={cn(
            'p-4 md:p-8 overflow-hidden',
            {
              'rounded-3xl  lg:shadow-2xl  bg-section': variant === 'rounded-primary',
              // Secondary rounded section
              'rounded-3xl  bg-green-300': variant === 'rounded-secondary',
            },
            innerClassName,
          )}
        >
          {children}
        </div>
      )}
    </section>
  )
}
