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
        'flex justify-center items-center w-full aspect-square md:p-6 p-3',
        className,
      )}
    >
      <button
        className={cn(
          'w-[42px] h-[42px] sm:w-[86px] sm:h-[86px] flex justify-center items-center rounded-full bg-[#EEE5DB80]',
        )}
        onClick={play}
        onMouseEnter={play}
      >
        <div className="w-2 h-2 sm:w-5 sm:h-5 bg-white rounded-full" />
      </button>
    </div>
  )
}
