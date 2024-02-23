import Image from 'next/image'
import Link from 'next/link'

import { CapaIcon } from '@/icons'
import { cn } from '@/lib/cn'

type EventCardProps = {
  className?: string
  date?: string
  dateType?: 'future' | 'past'
  image: {
    alt: string
    src: string
  }
  title: string
  description: string
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
}: EventCardProps) => (
  <Link
    className={cn('group flex flex-col group', className)}
    href={url}
    title={title}
  >
    <div className="mb-8 relative aspect-[252/137] lg:mb-8">
      <Image alt={image.alt} fill src={image.src} />
      {date && (
        <span
          className={cn(
            'w-[100px] h-[100px] absolute bottom-0 right-0 flex justify-end items-end',
            dateType === 'past' && 'text-white',
          )}
        >
          <CapaIcon
            className={cn(
              'rem:w-[156px] rem:h-[162px] absolute top-2.5 left-2.5 text-yellow',
              dateType === 'past' && 'text-red',
            )}
          />
          <span className="p-6 rem:text-[14px] rem:leading-[17.57px] text-right">
            <span className="mb-0.5 font-bold uppercase">SUN</span>
            10th April
          </span>
        </span>
      )}
    </div>
    <div className="grid grid-cols-1 gap-y-4 lg:gap-y-6">
      <h5 className="font-serif font-bold rem:text-[24px] leading-none lg:rem:text-[29.66px]">
        {title}
      </h5>
      <p>{description}</p>
      <div>
        <span className="underline group-hover:no-underline">Details</span>
      </div>
    </div>
  </Link>
)
