import Image from 'next/image'

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
  <>
    <div className="relative py-16 lg:py-0">
      <div className={'absolute top-[-14px] lg:top-[-15.25rem]'} id="about" />
      <section className="relative bg-gray-300 text-center text-white  rem:h-[500px] lg:min-h-screen-minus-header ">
        <Image
          alt={firstImage.alt}
          className="object-cover object-[70%,100%] lg:object-center"
          fill
          src={firstImage.src}
        />
      </section>
      <div className="container flex max-w-6xl flex-wrap justify-between gap-y-8 no-scrollbar rem:py-[64px] lg:rem:w-[960px] lg:rem:py-[88px]">
        <h2 className="font-serif text-[48px] leading-[60px]">{author}</h2>
        <p className="whitespace-pre-wrap 2xl:rem:min-h-[200px]">
          {description}
        </p>
        <div className="relative mt-6 w-full rem:h-[300px] lg:rem:h-[500px] ">
          <Image
            alt={secondImage.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 445px, 100vw"
            src={secondImage.src}
          />
        </div>
      </div>
    </div>
  </>
)
