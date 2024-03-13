import Image from 'next/image'
import { Note } from '@/components/strapi/blocks/MegaCymbal/Note'
import { KeyboardPlayer } from '@/components/strapi/blocks/MegaCymbal/KeyboardPlayer'

export const MegaCymbal = ({
  heading,
  description,
}: {
  heading: string
  description: string
}) => {
  return (
    <section className="flex flex-col items-center gap-8 bg-[#E0CFC5] px-4 py-12 text-center sm:px-18 lg:gap-24 lg:pt-20">
      <h2 className="max-w-[1280px] rem:text-[40px] rem:leading-[48px] lg:rem:text-[64px] lg:rem:leading-[79px]">
        {heading}
      </h2>
      <div className="relative z-0 grid w-full grid-cols-3 grid-rows-3 items-center justify-center md:h-[748px] md:w-[748px]">
        <Image
          className="col-span-3 col-start-1 row-span-3 row-start-1 object-contain"
          src="/images/mega-handpan.png"
          alt="The Handpan"
          fill
        />
        <Note
          note="c3"
          className="z-10 col-start-1 row-start-1 items-end justify-end"
        />
        <Note note="c4" className="z-10 col-start-2 row-start-1" />
        <Note
          note="c5"
          className="z-10 col-start-3 row-start-1 items-end justify-start"
        />

        <Note note="d3" className="z-10 col-start-1 row-start-2" />
        <Note note="d4" className="z-10 col-start-2 row-start-2" />
        <Note note="f3" className="z-10 col-start-3 row-start-2" />

        <Note
          note="f4"
          className="z-10 col-start-1 row-start-3 items-start justify-end"
        />
        <Note note="g3" className="z-10 col-start-2 row-start-3" />
        <Note
          note="g4"
          className="z-10 col-start-3 row-start-3 items-start justify-start"
        />
      </div>
      <h3 className="max-w-[924px] leading-[28px] rem:text-[22px] lg:rem:text-[36px] lg:rem:leading-[45px]">
        {description}
      </h3>
      <KeyboardPlayer />
    </section>
  )
}
