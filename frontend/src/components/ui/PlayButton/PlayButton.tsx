import { HTMLAttributes } from 'react'

import { PlayIcon } from '@/icons'
import { cn } from '@/lib/cn'

type PlayButtonProps = HTMLAttributes<HTMLButtonElement>

export const PlayButton = ({ className, ...props }: PlayButtonProps) => (
  <button
    className={cn(
      'rem:size-[88px] inline-flex justify-center items-center text-red xl:rem:size-[237px]',
      className,
    )}
    type="button"
    {...props}
  >
    <PlayIcon className="size-full" viewBox="0 0 238 237" />
  </button>
)
