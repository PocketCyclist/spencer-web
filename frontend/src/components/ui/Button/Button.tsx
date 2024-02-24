import { ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/cn'

type ButtonProps = {
  asChild?: boolean
  variant: 'primary' | 'secondary'
} & ButtonHTMLAttributes<HTMLButtonElement>

const VARIANT_CLASSES_MAP = {
  primary:
    'bg-button-primary text-white hover:bg-button-primary-hover disabled:bg-button-primary-disabled disabled:text-white/80',
  secondary:
    'bg-button-secondary text-black hover:bg-button-secondary-hover disabled:bg-button-secondary-disabled disabled:text-black/[0.32]',
} as const

export const Button = ({
  asChild,
  children,
  className,
  variant,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(
        'rem:h-[60px] rem:px-[26px] inline-flex justify-center items-center font-bold rem:text-[20px] rem:leading-[25.1px] transition-colors disabled:pointer-events-none',
        VARIANT_CLASSES_MAP[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
