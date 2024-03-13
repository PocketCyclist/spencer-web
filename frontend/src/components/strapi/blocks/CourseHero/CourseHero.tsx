import Image from 'next/image'
import Link from 'next/link'
import { BuyCircleIcon } from '@/icons'

export const CourseHero = ({
  buyUrl,
  buyText,
  title,
  subtitle,
}: {
  title: string
  subtitle: string
  buyUrl: string
  buyText: string
}) => {
  return (
    <section className="relative h-screen bg-[#FFF1E7]">
      <div
        className={
          'left-0 right-0 top-0 z-10 flex justify-center p-12 sm:absolute'
        }
      >
        <Link href="/">
          <Image
            alt="Gerard Spencer - Handpan performances classes & wellbeing"
            src="/images/logo.png"
            width={208}
            height={63}
          />
        </Link>
      </div>
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <div className="mb-40 flex flex-col gap-6 px-6 text-center sm:mb-0 sm:px-12">
          <h1 className="font-serif rem:text-[44px] rem:leading-[50px] sm:rem:text-[68px] sm:rem:leading-[70px] md:whitespace-break-spaces lg:rem:text-[88px] lg:rem:leading-[108px]">
            {title}
          </h1>
          <h2 className="font-sans rem:rem:text-[22px] rem:leading-[25px] sm:whitespace-break-spaces md:rem:text-[36px] md:rem:leading-[44.5px]">
            {subtitle}
          </h2>
          <Link
            href={buyUrl}
            className={
              'relative mt-12 flex flex-col items-center justify-center sm:mt-4'
            }
          >
            <BuyCircleIcon
              className="rotate text-[#FFC441]"
              height={196}
              width={196}
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center font-extrabold text-[#D64100] rem:text-[36px] rem:leading-[38px]  ">
              <div className="max-w-[150px]">{buyText}</div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
