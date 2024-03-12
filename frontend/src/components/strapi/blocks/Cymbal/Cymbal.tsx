import Image from 'next/image'
import { cn } from '@/lib/cn'

type CymbalProps = {
  className?: string
  right: boolean
}

export const Cymbal = ({ className, right }: CymbalProps) => {
  if (!right) {
    return null
  }

  return (
    <div
      className={cn('relative -z-[1] hidden select-none 2xl:flex', className)}
      role="presentation"
    >
      <Image
        className="absolute right-0 top-1/2 -translate-y-1/2 rem:w-[340px] 3xl:rem:w-[513px]"
        alt="Handpan decoration"
        src="/images/handpan-right.png"
        width={513}
        height={700}
      />
    </div>
  )
}
