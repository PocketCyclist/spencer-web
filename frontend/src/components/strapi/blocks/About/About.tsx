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
  <div className="relative py-16 lg:mt-16 lg:py-0">
    <div className={'absolute top-[-160px]'} id="about" />
    <Hero
      contentClassName="lg:justify-center"
      bgImage={firstImage}
      title={title}
      description={description}
    />

    {secondImage && quote && author && (
      <section className="overflow-hidden">
        <div className="container lg:flex lg:py-28">
          <div className="relative left-1/2 w-screen -translate-x-1/2 rem:h-[440px] lg:left-0 lg:mr-6 lg:flex-shrink-0 lg:translate-x-0 lg:rem:h-[674px] lg:rem:w-[445px]">
            <Image
              alt={secondImage.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 445px, 100vw"
              src={secondImage.src}
            />
          </div>
          <div className="py-16 lg:py-12 lg:rem:max-w-[683px]">
            <Image
              alt=""
              className="mb-2 size-16 lg:rem:size-[100px]"
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
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-yellow rem:h-[85px] rem:w-[82.07px]"
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
