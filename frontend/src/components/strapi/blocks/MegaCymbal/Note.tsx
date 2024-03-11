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
    <button
      className={cn(
        'w-[86px] h-[86px] flex justify-center items-center rounded-full bg-[#EEE5DB80]',
        className,
      )}
      onClick={play}
      onMouseEnter={play}
    >
      <div className="w-5 h-5 bg-white rounded-full" />
    </button>
  )
}
