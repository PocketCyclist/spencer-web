import Image from 'next/image'

type LogoHeroProps = {
  bgSrc: string
}

export const LogoHero = ({ bgSrc }: LogoHeroProps) => (
  <section className="h-[500px] relative text-white lg:h-[600px] xl:h-[800px]">
    <Image
      alt=""
      className="object-cover object-[70%,100%] lg:object-center"
      fill
      src={bgSrc}
    />
    <Image
      alt="The Gerard Spencer Project - Handpan performances classes & wellbeing"
      className="max-w-[calc(100%-2rem)] w-[280px] h-auto absolute bottom-20 left-1/2 -translate-x-1/2 lg:w-[400px] lg:bottom-1/2 lg:translate-y-1/2 xl:w-[740px]"
      src="/images/logo-hero.svg"
      width={740}
      height={315}
    />
  </section>
)
