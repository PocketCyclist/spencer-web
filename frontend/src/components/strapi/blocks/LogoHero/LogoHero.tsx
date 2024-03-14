import Image from 'next/image'

type LogoHeroProps = {
  bgImage: {
    alt: string
    src: string
  }
}

export const LogoHero = ({ bgImage }: LogoHeroProps) => (
  <section className="relative bg-gray-300 text-white rem:h-[500px] lg:rem:h-[600px] xl:rem:h-[800px]">
    <Image
      alt={bgImage.alt}
      className="object-cover object-[70%,100%] lg:object-center"
      fill
      src={bgImage.src}
    />
    <Image
      alt="The Gerard Spencer Project - Handpan performances classes & wellbeing"
      className="absolute bottom-20 left-1/2 h-auto max-w-[calc(100%-2rem)] -translate-x-1/2 rem:w-[280px] lg:bottom-1/2 lg:translate-y-1/2 lg:rem:w-[400px] xl:rem:w-[740px]"
      src="/images/logo-hero.svg"
      width={740}
      height={315}
    />
  </section>
)
