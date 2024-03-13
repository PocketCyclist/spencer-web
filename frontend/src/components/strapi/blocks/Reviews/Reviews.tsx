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
      <h5 className="mb-10 px-4 rem:text-[40px] rem:leading-[48px] sm:px-18 md:mb-18 lg:rem:text-[64px] lg:rem:leading-[79px]">
        {heading}
      </h5>
      <Marquee pauseOnClick pauseOnHover delay={2} className="bordered-marquee">
        {/*<div className="w-4 sm:w-18" />*/}
        {reviews.map((review) => {
          const imageAttrs = extractImageAttrs(review.coverImage)
          return (
            <div
              key={review.id}
              className={cn(
                'flex h-full w-full flex-col px-16 rem:max-w-[450px] lg:rem:max-w-[614px]',
              )}
            >
              <div>
                <Image
                  src={imageAttrs.src}
                  alt={imageAttrs.alt}
                  width={240}
                  height={240}
                />
                <p className="mb-4 mt-8 rem:text-[30px] rem:leading-[37px] lg:rem:text-[36px] lg:rem:leading-[44px]">
                  {review.text}
                </p>
                <div className="rem:text-[20px] rem:leading-[25.1px]">
                  {review.author}
                </div>
              </div>
            </div>
          )
        })}
      </Marquee>
    </section>
  )
}
