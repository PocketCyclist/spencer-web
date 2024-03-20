'use client'

import { useEffect } from 'react'
import ErrorComponent from 'next/error'

type Props = {
  error: Error
  reset(): void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen-minus-mobile-header items-center justify-center lg:min-h-screen-minus-header">
      <h1 className="flex h-full flex-col items-center text-center">
        <span className="leading-normal rem:text-[64px]">500</span>
        <span className="leading-normal">{error.name}</span>
      </h1>
    </div>
  )
}
