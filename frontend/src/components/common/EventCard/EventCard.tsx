import Image from 'next/image'
import Link from 'next/link'

import { CapaIcon } from '@/icons'
import { cn } from '@/lib/cn'
import { useMemo } from 'react'
import { parseDateToWords } from '@/data/strapi/utils/date'

type EventCardProps = {
  className?: string
  date: string
  dateType?: 'future' | 'past'
  image: {
    alt: string
    src: string
  }
  title: string
  description?: string
  url: string
}

export const EventCard = ({
  className,
  date,
  dateType,
  description,
  image,
  title,
  url,
}: EventCardProps) => {
  const parsedDate = useMemo(() => parseDateToWords(date), [date])
  const parsedDateType =
    dateType ||
    (new Date(date).getTime() > new Date().getTime() ? 'future' : 'past')
  return (
    <Link
      className={cn('group flex flex-col', className)}
      href={url}
      title={title}
    >
      <div className="relative mb-8 aspect-[252/137] overflow-hidden lg:mb-8">
        <Image alt={image.alt} fill src={image.src} className="object-cover" />

        <span className="absolute bottom-0 right-0 z-0 flex h-[100px] w-[100px] items-end justify-end">
          <CapaIcon
            className={cn(
              'absolute left-0 top-0 text-yellow rem:h-[162px] rem:w-[156px]',
              parsedDateType === 'past' && 'text-red',
            )}
          />
          <span
            className={cn(
              'z-10 p-1.5 text-right rem:text-[14px] rem:leading-[17.57px]',
              parsedDateType === 'past' ? 'text-white' : 'text-foreground',
            )}
          >
            <span className="mb-0.5 font-bold uppercase">
              {parsedDate.dayOfWeek}
            </span>
            <br />
            {parsedDate.date}
          </span>
        </span>
      </div>
      <div className="grid grid-cols-1 gap-y-4 lg:gap-y-6">
        <h5 className="font-serif font-bold leading-none rem:text-[24px] lg:rem:text-[29.66px]">
          {title}
        </h5>
        <p>{description}</p>
        <div>
          <span className="underline group-hover:no-underline">Details</span>
        </div>
      </div>
    </Link>
  )
}
