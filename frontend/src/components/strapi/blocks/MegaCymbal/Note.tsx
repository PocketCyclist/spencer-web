'use client'

import { playNote, TNote } from '@/components/strapi/blocks/MegaCymbal/player'
import { cn } from '@/lib/cn'
import { useEffect, useRef, useState } from 'react'

const animationTime = 150

export const Note = ({
  note,
  className,
}: {
  note: TNote
  className?: string
}) => {
  const [pulsing, setPulsing] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const play = () => {
    playNote(note)

    if (pulsing) {
      setPulsing(false)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setPulsing(true)
        timeoutRef.current = setTimeout(() => setPulsing(false), animationTime)
      }, 50)
    } else {
      setPulsing(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setPulsing(false), animationTime)
    }
  }

  return (
    <div
      className={cn(
        'flex aspect-square w-full items-center justify-center p-3 md:p-6',
        className,
      )}
    >
      <button
        aria-label={`Play ${note.toUpperCase()}`}
        className={cn(
          `flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EEE5DB80] transition-all sm:h-[86px] sm:w-[86px]`,
          pulsing && 'pinged',
        )}
        onClick={play}
        onMouseEnter={play}
      >
        <div className="h-2 w-2 rounded-full bg-white sm:h-5 sm:w-5" />
      </button>
    </div>
  )
}
