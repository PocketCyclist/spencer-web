import { TStrapiReview } from '@/data/strapi/types/course'
import Marquee from 'react-fast-marquee'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import Image from 'next/image'
import { cn } from '@/lib/cn'

export const Reviews = ({
  heading,
  reviews,
}: {
  heading: string
  reviews: TStrapiReview[]
}) => {
  return (
    <section className="bg-[#FFC441] py-12">
      <h2 className="mb-10 px-4 rem:text-[40px] rem:leading-[48px] md:mb-18 lg:px-18 lg:rem:text-[64px] lg:rem:leading-[79px]">
        {heading}
      </h2>
      <div className="flex w-full snap-x snap-mandatory overflow-x-auto no-scrollbar">
        {/*<div className="w-4 sm:w-18" />*/}
        {reviews.map((review) => {
          const imageAttrs = extractImageAttrs(review.coverImage)
          return (
            <div
              key={review.id}
              className={cn(
                'flex h-full w-full min-w-[100vw] snap-start flex-col border-r border-black px-16 last:border-r-0 sm:rem:min-w-[450px] lg:rem:min-w-[614px]',
              )}
            >
              <Image
                src={imageAttrs.src}
                alt={imageAttrs.alt}
                width={240}
                height={240}
              />
              <p className="mb-4 mt-8 rem:text-[30px] rem:leading-[37px] lg:rem:text-[36px] lg:rem:leading-[44px]">
                {review.text}
              </p>
              <p className="rem:text-[20px] rem:leading-[25.1px]">
                {review.author}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
