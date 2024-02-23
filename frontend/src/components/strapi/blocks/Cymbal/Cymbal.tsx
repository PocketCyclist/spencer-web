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
      className={cn('hidden relative -z-[1] select-none 2xl:flex', className)}
      role="presentation"
    >
      <Image
        className="rem:w-[340px] absolute top-1/2 right-0 -translate-y-1/2 3xl:rem:w-[513px]"
        alt="Handpan decoration"
        src="/images/handpan-right.png"
        width={513}
        height={700}
      />
    </div>
  )
}
