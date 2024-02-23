import Image from 'next/image'

import { Hero } from '@/components/common/Hero/Hero'
import { CapaIcon } from '@/icons'

type TAboutImage = {
  alt: string
  src: string
}

type AboutProps = {
  title: string
  description: string
  quote?: string
  author?: string
  firstImage: TAboutImage
  secondImage: TAboutImage
}

export const About = ({
  title,
  description,
  quote,
  author,
  firstImage,
  secondImage,
}: AboutProps) => (
  <div className="space-y-16 lg:space-y-0">
    <Hero
      contentClassName="lg:justify-center"
      bgImage={firstImage}
      title={title}
      description={description}
    />

    {secondImage && quote && author && (
      <section className="overflow-hidden">
        <div className="container lg:py-28 lg:flex">
          <div className="w-screen rem:h-[440px] relative left-1/2 -translate-x-1/2 lg:rem:w-[445px] lg:rem:h-[674px] lg:mr-6 lg:flex-shrink-0 lg:left-0 lg:translate-x-0">
            <Image
              alt={secondImage.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 445px, 100vw"
              src={secondImage.src}
            />
          </div>
          <div className="py-16 lg:rem:max-w-[683px] lg:py-12">
            <Image
              alt=""
              className="size-16 mb-2 lg:rem:size-[100px]"
              src="/images/quote-left.png"
              width={100}
              height={100}
            />
            <div className="pl-16 lg:rem:pl-[100px]">
              <p className="font-serif rem:text-[30px] rem:leading-[37.08px] sm:whitespace-break-spaces lg:rem:text-[36px] lg:rem:leading-[44.5px]">
                {quote}
              </p>
              <p className="mt-6 flex justify-end font-serif rem:text-[24px] rem:leading-[29.66px] lg:mt-16">
                <span className="relative py-7 pl-[1.625rem]">
                  <CapaIcon
                    className="rem:w-[82.07px] rem:h-[85px] absolute top-1/2 left-0 -translate-y-1/2 text-yellow"
                    viewBox="0 0 39 40"
                  />
                  <span className="relative">— {author}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    )}
  </div>
)
