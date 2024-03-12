import Image from 'next/image'

type EventProps = {
  heading?: string
  description: string
  image: {
    alt: string
    src: string
  }
}

export const Event = ({ heading, description, image }: EventProps) => (
  <section className="text-center">
    <div className="container py-8 lg:rem:py-[88px]">
      {heading && (
        <h2 className="mb-8 font-serif font-bold rem:text-[64px] rem:leading-[79.1px] lg:rem:mb-[88px]">
          {heading}
        </h2>
      )}
      <div className="space-y-12 lg:flex lg:flex-row-reverse lg:items-center lg:justify-between lg:space-y-0">
        <div className="lg:w-[43.316%] lg:text-left">
          <p>{description}</p>
        </div>
        <div className="relative rem:h-[358px] lg:w-[46.2674%] lg:rem:h-[284px]">
          {image && (
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 533px, 100vw"
              src={image.src}
            />
          )}
        </div>
      </div>
    </div>
  </section>
)
