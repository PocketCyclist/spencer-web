import Image from 'next/image'

import { CapaIcon, PlayIcon } from '@/icons'

type VideoProps = { cover?: string; src: string }

export const Video = ({ cover, src }: VideoProps) => (
  // TODO: <VideoDialog src={src}>{(open) => <section>...<button onClick={open} /></section>}</VideoDialog>
  <section className="h-[500px] relative overflow-hidden bg-red lg:h-[600px] xl:h-[800px]">
    <div className="w-full absolute right-0 top-1/2 overflow-hidden bg-background -translate-y-1/2 before:block before:pt-[100%] md:w-3/4 md:max-w-[calc(50%+550px-175px)] md:ml-auto md:rounded-l-full">
      <div className="w-full h-[500px] absolute top-1/2 -translate-y-1/2 lg:h-[600px] xl:h-[800px]">
        {cover && <Image alt="" className="object-cover" fill src={cover} />}
        <button
          className="absolute top-1/2 left-1/2 inline-flex justify-center items-center text-white -translate-x-1/2 -translate-y-1/2"
          type="button"
        >
          <CapaIcon
            className="w-[104px] h-[104px] text-red xl:w-[237px] xl:h-[237px]"
            viewBox="0 0 39 40"
          />
          <PlayIcon
            className="w-[23px] h-[27px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-[52px] xl:h-[60px]"
            viewBox="0 0 53 60"
          />
        </button>
      </div>
    </div>
  </section>
)
