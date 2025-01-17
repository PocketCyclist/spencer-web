import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

type InputCommonProps = {
  invalid?: boolean
  size: 'sm' | 'lg'
  valid?: boolean
}

type InputPropsAsInput = {
  as?: 'input'
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  InputCommonProps

type InputPropsAsTextarea = {
  as: 'textarea'
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  InputCommonProps

type InputProps = InputPropsAsInput | InputPropsAsTextarea

const SIZE_CLASSES_MAP = {
  input: {
    sm: 'rem:h-[40px] lg:rem:h-[60px] py-1.5',
    lg: 'rem:h-[61px] rem:py-[17px]',
  },
  textarea: {
    sm: 'rem:h-[200px] py-1.5',
    lg: 'rem:h-[230px] rem:py-[17px]',
  },
} as const

export const Input = ({
  className,
  invalid,
  size,
  valid,
  ...props
}: InputProps) => {
  const componentClassName = cn(
    'w-full px-3.5 border border-input-border placeholder:transition-colors placeholder:text-input-placeholder hover:placeholder:text-input-hover-placeholder focus:outline-none disabled:border-input-disabled-border disabled:placeholder:text-input-disabled-placeholder disabled:pointer-events-none',
    SIZE_CLASSES_MAP[props.as || 'input'][size],
    invalid && 'border-input-error-border',
    valid && 'border-input-success-border',
    className,
  )

  if (props.as === 'textarea') {
    const { as, ...restProps } = props
    return <textarea className={componentClassName} {...restProps} />
  }

  const { as, ...restProps } = props
  return <input className={componentClassName} {...restProps} />
}
