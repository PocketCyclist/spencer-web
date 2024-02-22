import Image from 'next/image'

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
    <section className="overflow-hidden">
      <div className="container lg:py-12 lg:flex lg:flex-row-reverse lg:justify-end">
        <div className="w-screen rem:h-[440px] relative left-1/2 -translate-x-1/2 lg:rem:max-w-[821px] lg:w-[calc(50vw-20px)] lg:rem:h-[529px] lg:flex-shrink-0 lg:left-0 lg:translate-x-0 xl:w-[calc(50vw-53px-88px)]">
          <Image
            alt={firstImage.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={firstImage.src}
          />
        </div>
        <div className="py-16 flex flex-col lg:py-12 lg:w-[calc(50%-20px)] lg:mr-10 lg:flex lg:flex-col lg:flex-shrink-0 lg:justify-center xl:w-[calc(50%+53px)] xl:mr-[88px]">
          <h1 className="mb-6 font-serif rem:text-[48px] rem:leading-[59.33px] lg:mb-8 lg:rem:text-[88px] lg:rem:leading-[108.77px]">
            {title}
          </h1>
          <p>{description}</p>
        </div>
      </div>
    </section>

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
