import Image from 'next/image'

import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'
import { PlayButton } from '@/components/ui/PlayButton/PlayButton'

type VideoProps = { cover?: string; src: string }

export const Video = ({ cover, src }: VideoProps) => (
  <section className="rem:h-[500px] relative overflow-hidden bg-red lg:rem:h-[600px] xl:rem:h-[800px]">
    <div className="w-full min-h-full overflow-hidden bg-background md:w-3/4 md:absolute md:right-0 md:top-1/2 md:max-w-[calc(50%+550px-175px)] md:ml-auto md:rounded-l-full md:-translate-y-1/2 md:before:block md:before:pt-[100%]">
      <div className="w-full rem:h-[500px] absolute top-1/2 -translate-y-1/2 lg:rem:h-[600px] xl:rem:h-[800px]">
        {cover && <Image alt="" className="object-cover" fill src={cover} />}
        <VideoDialog
          src={src}
          trigger={
            <PlayButton className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          }
        />
      </div>
    </div>
  </section>
)
