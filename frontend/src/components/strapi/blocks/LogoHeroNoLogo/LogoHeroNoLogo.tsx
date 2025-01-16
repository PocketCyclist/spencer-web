import Image from 'next/image'

type LogoHeroNoLogoProps = {
  bgImage: {
    alt: string
    src: string
  }
}

export const LogoHeroNoLogo = ({ bgImage }: LogoHeroNoLogoProps) => (
  <section className="relative bg-gray-300 text-white rem:h-[500px]  lg:min-h-screen-minus-header  ">
    {' '}
    {/* lg:rem:h-[800px] */}
    <Image
      alt={bgImage.alt}
      className="object-cover object-[70%,100%] lg:object-center"
      fill
      src={bgImage.src}
    />
  </section>
)
