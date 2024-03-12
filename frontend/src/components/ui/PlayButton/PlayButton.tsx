import { HTMLAttributes } from 'react'

import { PlayIcon } from '@/icons'
import { cn } from '@/lib/cn'

type PlayButtonProps = HTMLAttributes<HTMLButtonElement>

export const PlayButton = ({ className, ...props }: PlayButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center justify-center text-button-primary transition-colors hover:text-button-primary-hover disabled:pointer-events-none disabled:text-button-primary-disabled rem:size-[88px] xl:rem:size-[237px] [&:disabled>svg>g>path:last-child]:opacity-80',
      className,
    )}
    type="button"
    {...props}
  >
    <PlayIcon className="size-full" viewBox="0 0 238 237" />
  </button>
)
