import Image from 'next/image'
import Link from 'next/link'

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
      className={cn('group flex justify-between py-[24px]', className)}
      href={url}
      title={title}
    >
      <div className="grid grid-cols-1 gap-y-4 lg:gap-y-3">
        <h5 className="pr-[15px] leading-none rem:text-[24px] lg:rem:text-[36px]">
          {title}
        </h5>
        <p className="rem:text-[20px] ">
          {parsedDate.dayOfWeek} {parsedDate.date}
          {/* {parsedDate.year} */}
        </p>
      </div>

      <div className="relative hidden aspect-[252/137] overflow-hidden rounded-md md:block">
        <Image
          alt={image.alt}
          src={image.src}
          width={160}
          height={100}
          className=" "
        />
      </div>
    </Link>
  )
}

// <span
//   className={cn(
//     'z-10 p-1.5 text-right rem:text-[14px] rem:leading-[17.57px]',
//     parsedDateType === 'past' ? 'text-white' : 'text-foreground',
//   )}
// ></span>
