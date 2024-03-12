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
    <section className="px-4 py-12 lg:pt-20 sm:px-18 gap-8 lg:gap-24 flex flex-col items-center text-center bg-[#E0CFC5]">
      <h3 className="rem:text-[40px] rem:leading-[48px] lg:rem:text-[64px] lg:rem:leading-[79px] max-w-[1280px]">
        {heading}
      </h3>
      <div className="relative grid grid-cols-3 grid-rows-3 w-full md:w-[748px] md:h-[748px] items-center justify-center z-0">
        <Image
          className="col-span-3 row-span-3 col-start-1 row-start-1 object-contain"
          src="/images/mega-handpan.png"
          alt="The Handpan"
          fill
        />
        <Note
          note="c3"
          className="col-start-1 row-start-1 z-10 items-end justify-end"
        />
        <Note note="c4" className="col-start-2 row-start-1 z-10" />
        <Note
          note="c5"
          className="col-start-3 row-start-1 z-10 items-end justify-start"
        />

        <Note note="d3" className="col-start-1 row-start-2 z-10" />
        <Note note="d4" className="col-start-2 row-start-2 z-10" />
        <Note note="f3" className="col-start-3 row-start-2 z-10" />

        <Note
          note="f4"
          className="col-start-1 row-start-3 z-10 items-start justify-end"
        />
        <Note note="g3" className="col-start-2 row-start-3 z-10" />
        <Note
          note="g4"
          className="col-start-3 row-start-3 z-10 items-start justify-start"
        />
      </div>
      <h4 className="rem:text-[22px] leading-[28px] lg:rem:text-[36px] lg:rem:leading-[45px] max-w-[924px]">
        {description}
      </h4>
      <KeyboardPlayer />
    </section>
  )
}
