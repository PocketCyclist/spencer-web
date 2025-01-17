import Image from 'next/image'

import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'
import { PlayButton } from '@/components/ui/PlayButton/PlayButton'

// type VideoProps = {
//   // poster_alt?: string
//   // poster_src?: string
//   poster: ImageAtt
//   src: string
//   title?: string
// }

type VideoProps = {
  poster?: { alt: string; src: string }
  src: string
  title?: string
}

// export const Video = ({ poster, src }: VideoProps) => (

export const Video = ({
  // poster_alt = '',
  // poster_src,
  poster,
  src,
  title = 'Video',
}: VideoProps) => (
  <article className="rem:max-w-[460px]">
    <div className="relative z-0">
      {poster && (
        <Image
          alt={poster.alt}
          className="rounded-md object-cover rem:max-h-[410px]"
          fill
          sizes="(min-width: 640px) 580px, 95vw"
          src={poster.src}
        />
      )}

      <h5 className="mt-auto max-w-[410px] font-sans leading-none  text-white opacity-0 rem:max-h-[410px] rem:min-h-[400px] rem:text-[48px]  lg:min-w-[410px]">
        {title}
      </h5>
    </div>
    <div className="flex min-w-[75vw] flex-1 flex-col gap-8 pb-6 pt-12 md:min-w-[20vw]">
      <p className="font-sans  rem:text-[36px]">{title}</p>
      <p>
        <VideoDialog
          src={src}
          trigger={
            <PlayButton
              small={true}
              className="rem:size-[32px] xl:rem:size-[32px]"
            />
          }
        />
      </p>
    </div>
  </article>
)
