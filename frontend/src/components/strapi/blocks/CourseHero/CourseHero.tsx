'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BuyCircleIcon } from '@/icons'
import { useIsServer } from '@/data/strapi/utils/isServer'
import { cn } from '@/lib/cn'

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
  const isServer = useIsServer()
  return (
    <section className="relative flex h-screen flex-col bg-[#FFF1E7]">
      <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden">
        <Image
          src="/images/course-hero/top-left.png"
          className={cn(
            'absolute -left-32 top-[5vh] scale-75 transition-all duration-1500 ease-in-out xl:scale-75 2xl:left-[3vw] 2xl:scale-100',
            isServer && 'translate-x-[-120%] translate-y-[-75%] opacity-0',
          )}
          alt="Capture the synergy of music in this image featuring two artists in performance: Gerard mesmerizes with the handpan, while a woman accompanies him on guitar, her voice filling the air with melody. Witness the harmony of their collaboration as they create a captivating musical experience."
          width={337}
          height={245}
        />
        <Image
          src="/images/course-hero/top-right.gif"
          className={cn(
            'absolute right-[-120px] top-[-6rem] scale-[40%] rounded-[1.5rem] transition-all duration-1500 ease-in-out xl:top-[20vh] xl:scale-75 2xl:right-[1vw] 2xl:scale-100',
            isServer && 'translate-x-[150%] translate-y-[-75%] opacity-0',
          )}
          alt="Experience the magic of Gerard's performance with the handpan in this captivating image. His hands move with precision and passion, conjuring melodies that enchant and captivate the audience. Witness the fusion of skill and emotion as Gerard brings the handpan to life on stage."
          width={345}
          height={472}
        />
        <Image
          src="/images/course-hero/bottom-left.gif"
          className={cn(
            'absolute bottom-[-4vw] scale-75 rounded-[1.5rem] transition-all duration-1500 ease-in-out rem:left-[-220px] xs:bottom-8 xs:rem:left-[-135px] sm:scale-75 xl:scale-75 2xl:scale-100',
            isServer && 'translate-x-[-100%] opacity-0',
          )}
          alt="Immerse yourself in the artistry of the handpan with this dynamic image capturing hands in motion, effortlessly coaxing out melodies. Dive deeper into the experience by exploring the interactive keys A-L on your keyboard."
          width={400}
          height={376}
        />
        <Image
          src="/images/course-hero/bottom-right.png"
          className={cn(
            'absolute -bottom-8 scale-50 transition-all duration-1500 ease-in-out rem:right-[-230px] md:-right-20 md:rem:bottom-[-230px] xl:right-[7vw] xl:scale-75 2xl:scale-100',
            isServer && 'translate-y-[100%] opacity-0',
          )}
          alt="The image shows a handpan, a unique and captivating musical instrument resembling a large, inverted steel drum. Its distinctive shape is akin to a convex UFO with a central, shallow bowl and a series of dented tongues encircling it. Each tongue is meticulously crafted to produce different pitches when struck with the hands or fingers, creating a mesmerizing array of harmonious tones. The handpan's metallic surface reflects ambient light, casting subtle glimmers and shadows that accentuate its intricate design. Its overall appearance evokes a sense of mystique and enchantment, inviting viewers to explore its musical potential and artistic beauty."
          width={460}
          height={460}
        />
      </div>
      <div className={'relative flex justify-center p-4 sm:p-12'}>
        <Link href="/" title="Home">
          <Image
            alt="Gerard Spencer - Handpan performances classes & wellbeing"
            src="/images/logo.png"
            className="rem:h-[48px] rem:w-[161px] sm:h-[63px] sm:w-[208px]"
            width={208}
            height={63}
          />
        </Link>
      </div>
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col gap-6 px-4 text-center sm:mb-0 sm:px-12">
          <h1 className="font-serif rem:text-[44px] rem:leading-[50px] sm:rem:text-[68px] sm:rem:leading-[70px] md:whitespace-break-spaces lg:rem:text-[88px] lg:rem:leading-[108px] ">
            {title}
          </h1>
          <h2 className="font-sans rem:rem:text-[22px] rem:leading-[25px] sm:whitespace-break-spaces md:rem:text-[36px] md:rem:leading-[44.5px]">
            {subtitle}
          </h2>
          <Link
            href={buyUrl}
            title={buyText}
            className={
              'group relative mx-auto flex flex-col items-center justify-center  transition-all duration-700 hover:scale-125 md:mt-12'
            }
          >
            <BuyCircleIcon
              className="rotate text-[#FFC441] transition-colors duration-700 group-hover:text-[#D64100] rem:h-[104px] rem:w-[104px] md:rem:h-[196px] md:rem:w-[196px]"
              height={196}
              width={196}
            />
            <div className="duration-400 absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-[19px] font-extrabold leading-[106%] text-[#D64100] transition-colors duration-500 group-hover:text-[#FFC441] md:rem:text-[36px] md:rem:leading-[38px]">
              <div className="rem:max-w-[150px] md:rem:max-w-[150px]">
                {buyText}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
