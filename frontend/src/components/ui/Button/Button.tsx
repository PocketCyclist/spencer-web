import { ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/cn'

type ButtonProps = {
  asChild?: boolean
  variant: 'red' | 'white'
} & ButtonHTMLAttributes<HTMLButtonElement>

const VARIANT_CLASSES_MAP = {
  red: 'bg-red text-white hover:bg-red/90',
  white: 'bg-white text-black hover:bg-[rgb(240_240_240/100%)]',
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
        'rem:h-[60px] rem:px-[26px] inline-flex justify-center items-center font-bold rem:text-[20px] rem:leading-[25.1px] transition-colors',
        VARIANT_CLASSES_MAP[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
