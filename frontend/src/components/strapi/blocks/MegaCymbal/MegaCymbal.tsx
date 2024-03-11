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
    <section className="p-18 bg-[#E0CFC5] flex flex-col text-center">
      <h3 className="text-[64px] leading-[79px]">{heading}</h3>
      <div className="relative grid grid-cols-3 w-full h-screen items-center justify-center">
        <Image
          className="col-span-3 row-span-3 col-start-1 row-start-1 object-contain"
          src="/images/mega-handpan.png"
          alt="The Handpan"
          fill
          // width={733}
          // height={730}
        />
        <Note note="c3" className="col-start-1 row-start-1 z-10 mx-auto" />
        <Note note="c4" className="col-start-2 row-start-1 z-10 mx-auto" />
        <Note note="c5" className="col-start-3 row-start-1 z-10 mx-auto" />

        <Note note="d3" className="col-start-1 row-start-2 z-10 mx-auto" />
        <Note note="d4" className="col-start-2 row-start-2 z-10 mx-auto" />
        <Note note="f3" className="col-start-3 row-start-2 z-10 mx-auto" />

        <Note note="f4" className="col-start-1 row-start-3 z-10 mx-auto" />
        <Note note="g3" className="col-start-2 row-start-3 z-10 mx-auto" />
        <Note note="g4" className="col-start-3 row-start-3 z-10 mx-auto" />
      </div>
      <h4 className="text-[36px] leading-[45px]">{description}</h4>
      <KeyboardPlayer />
    </section>
  )
}
