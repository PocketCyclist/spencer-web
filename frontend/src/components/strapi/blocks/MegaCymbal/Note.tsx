'use client'

import { playNote, TNote } from '@/components/strapi/blocks/MegaCymbal/player'
import { cn } from '@/lib/cn'

export const Note = ({
  note,
  className,
}: {
  note: TNote
  className?: string
}) => {
  const play = () => playNote(note)
  return (
    <div
      className={cn(
        'flex aspect-square w-full items-center justify-center p-3 md:p-6',
        className,
      )}
    >
      <button
        className={cn(
          'flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EEE5DB80] sm:h-[86px] sm:w-[86px]',
        )}
        onClick={play}
        onMouseEnter={play}
      >
        <div className="h-2 w-2 rounded-full bg-white sm:h-5 sm:w-5" />
      </button>
    </div>
  )
}
