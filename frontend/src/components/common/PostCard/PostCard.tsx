import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/cn'

type PostCardProps = {
  className?: string
  description: string
  image: {
    alt: string
    src: string
  }
  isLarge?: boolean
  title: string
  url: string
}

export const PostCard = ({
  className,
  description,
  image,
  isLarge,
  title,
  url,
}: PostCardProps) => (
  <Link
    className={cn('group group flex flex-col', className)}
    href={url}
    title={title}
  >
    <div
      className={cn(
        'relative mb-10 aspect-[350/220]',
        isLarge ? 'lg:mb-14 lg:aspect-[557/350]' : 'lg:mb-8',
      )}
    >
      <Image className="object-cover" alt={image.alt} fill src={image.src} />
    </div>
    <div className="grid grid-cols-1 gap-y-4 lg:gap-y-6">
      <h5 className="font-serif leading-none rem:text-[28px] lg:rem:text-[40px]">
        {title}
      </h5>
      <p className={cn('line-clamp-3', !isLarge && 'lg:line-clamp-4')}>
        {description}
      </p>
      <div>
        <span className="underline group-hover:no-underline">Details</span>
      </div>
    </div>
  </Link>
)
