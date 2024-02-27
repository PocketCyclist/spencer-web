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
    className={cn('group flex flex-col group', className)}
    href={url}
    title={title}
  >
    <div
      className={cn(
        'mb-10 relative aspect-[350/220]',
        isLarge ? 'lg:mb-14 lg:aspect-[557/350]' : 'lg:mb-8',
      )}
    >
      <Image className="object-cover" alt={image.alt} fill src={image.src} />
    </div>
    <div className="grid grid-cols-1 gap-y-4 lg:gap-y-6">
      <h5 className="font-serif rem:text-[28px] leading-none lg:rem:text-[40px]">
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
