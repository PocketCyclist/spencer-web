import Image from 'next/image'

import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'
import { PlayButton } from '@/components/ui/PlayButton/PlayButton'
import Link from 'next/link'

type VideoProps = {
  poster?: { alt: string; src: string }
  src: string
  title?: string
}

export const Video = ({ poster, src, title = 'Video' }: VideoProps) => (
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

      <h5 className="mt-auto min-w-[410px] min-w-[90vw] max-w-[410px]  font-sans leading-none text-white opacity-0 rem:max-h-[410px]  rem:min-h-[400px] rem:text-[48px] md:min-w-[20vw]">
        {title}
      </h5>
    </div>
    <div className="flex min-w-[75vw] flex-1 flex-col gap-8 pb-6 pt-12 lg:rem:min-w-[410px]">
      <p className=" font-sans rem:text-[36px]">
        <Link href={src} target="_blank" rel="noopener noreferrer" className="">
          {title}
        </Link>
      </p>
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
