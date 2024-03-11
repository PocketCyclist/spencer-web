import Image from 'next/image'
import Link from 'next/link'
import { CapaIcon } from '@/icons'

export const CourseHero = ({
  buyUrl,
  buyText,
  heroTitle,
  heroSubtitle,
}: {
  buyUrl: string
  buyText: string
  heroTitle: string
  heroSubtitle: string
}) => {
  return (
    <section className="bg-[#FFF1E7] h-screen relative">
      <Link
        href="/"
        className={
          'flex justify-center p-12 sm:absolute top-0 left-0 right-0 z-10'
        }
      >
        <Image
          alt="Gerard Spencer - Handpan performances classes & wellbeing"
          src="/images/logo.png"
          width={208}
          height={63}
        />
      </Link>
      <div className="h-full w-full flex flex-col justify-center items-center relative">
        <div className="px-6 mb-40 sm:mb-0 sm:px-12 flex flex-col gap-6 text-center">
          <h1 className="md:whitespace-break-spaces font-serif rem:text-[44px] rem:leading-[50px] sm:rem:text-[68px] sm:rem:leading-[70px] lg:rem:text-[88px] lg:rem:leading-[108px]">
            {heroTitle}
          </h1>
          <h2 className="sm:whitespace-break-spaces font-sans rem:rem:text-[22px] rem:leading-[25px] md:rem:text-[36px] md:rem:leading-[44.5px]">
            {heroSubtitle}
          </h2>
          <Link
            href={buyUrl}
            className={
              'relative flex flex-col justify-center items-center mt-12 sm:mt-4'
            }
          >
            <CapaIcon className="text-[#FFC441]" height={196} width={196} />
            <div className="absolute top-0 right-0 bottom-0 left-0 rem:text-[36px] rem:leading-[38px] flex justify-center items-center text-[#D64100] font-extrabold  ">
              <div className="max-w-[150px]">{buyText}</div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
