import { HTMLAttributes } from 'react'

import { PlayIcon } from '@/icons'
import { cn } from '@/lib/cn'

type PlayButtonProps = HTMLAttributes<HTMLButtonElement>

export const PlayButton = ({ className, ...props }: PlayButtonProps) => (
  <button
    className={cn(
      'rem:size-[88px] inline-flex justify-center items-center text-button-primary transition-colors hover:text-button-primary-hover disabled:text-button-primary-disabled [&:disabled>svg>g>path:last-child]:opacity-80 disabled:pointer-events-none xl:rem:size-[237px]',
      className,
    )}
    type="button"
    {...props}
  >
    <PlayIcon className="size-full" viewBox="0 0 238 237" />
  </button>
)
