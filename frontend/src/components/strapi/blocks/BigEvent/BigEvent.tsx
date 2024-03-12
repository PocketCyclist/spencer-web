import Image from 'next/image'

import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'
import { PlayButton } from '@/components/ui/PlayButton/PlayButton'

type BigEventProps = {
  heading: string
  description: string
  videoPoster?: {
    alt: string
    src: string
  }
  videoSrc: string
}

export const BigEvent = ({
  heading,
  description,
  videoPoster,
  videoSrc,
}: BigEventProps) => (
  <section className="overflow-hidden text-center">
    <div className="container lg:rem:py-[88px]">
      <header className="mb-12 lg:mb-16">
        <h2 className="mb-8 font-serif font-bold rem:text-[64px] rem:leading-[79.1px] lg:rem:mb-[88px]">
          {heading}
        </h2>
        <p className="font-serif rem:text-[30px] rem:leading-[37.08px] md:mx-auto md:rem:max-w-[538px] lg:rem:text-[36px] lg:rem:leading-[44.5px]">
          {description}
        </p>
      </header>
      {videoSrc && (
        <div className="relative left-1/2 w-screen -translate-x-1/2 rem:h-[390px] md:rem:h-[619px] md:rem:max-w-[1100px]">
          {videoPoster && (
            <Image
              alt={videoPoster.alt}
              className="object-cover"
              fill
              src={videoPoster.src}
            />
          )}
          <VideoDialog
            src={videoSrc}
            trigger={
              <PlayButton className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            }
          />
        </div>
      )}
    </div>
  </section>
)
