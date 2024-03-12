import Image from 'next/image'
import { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type HeroProps = {
  className?: string
  contentClassName?: string
  contentAdditionalComponent?: ReactNode
  bgImage: {
    alt: string
    src: string
  }
  title: string
  description?: string
}

export const Hero = ({
  className,
  contentClassName,
  contentAdditionalComponent,
  bgImage,
  title,
  description,
}: HeroProps) => (
  <section className={cn('overflow-hidden', className)}>
    <div className="container lg:flex lg:flex-row-reverse lg:justify-end">
      <div className="relative left-1/2 w-screen -translate-x-1/2 rem:h-[440px] lg:left-0 lg:w-[calc(50vw-20px)] lg:flex-shrink-0 lg:translate-x-0 lg:rem:h-[529px] lg:rem:max-w-[821px] xl:w-[calc(50vw-53px-88px)]">
        <Image
          alt={bgImage.alt}
          className="object-cover"
          fill
          sizes="(min-width: 1920px) 821px, (min-width: 1024px) 50vw, 100vw"
          src={bgImage.src}
        />
      </div>
      <div
        className={cn(
          'flex flex-col space-y-6 py-16 lg:mr-10 lg:flex lg:w-[calc(50%-20px)] lg:flex-shrink-0 lg:flex-col lg:space-y-8 lg:py-4 xl:mr-[88px] xl:w-[calc(50%+53px)]',
          contentClassName,
        )}
      >
        <h1 className="whitespace-pre-wrap font-serif rem:text-[48px] rem:leading-[59.33px] lg:rem:text-[88px] lg:rem:leading-[108.77px]">
          {title}
        </h1>
        {description && <p>{description}</p>}
        {contentAdditionalComponent}
      </div>
    </div>
  </section>
)
