'use client'

import { TStrapiProjectMediaItem } from '@/data/strapi/types/projects'
import { Slider, SliderSlide } from '@/components/ui/Slider/Slider'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import Image from 'next/image'
import { PlayButton } from '@/components/ui/PlayButton/PlayButton'
import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'

export const MediaSlider = ({
  media,
  coverImage = '',
}: {
  media: TStrapiProjectMediaItem[]
  coverImage?: any
}) => {
  return (
    <Slider>
      {coverImage && (
        <p>
          <SliderSlide>
            <div className="h-full w-full">
              <Image
                src={coverImage.attributes.url}
                alt={coverImage.attributes.alternativeText}
                className="object-cover"
                fill
              />
            </div>
          </SliderSlide>
        </p>
      )}
      {media.map((item, index) => {
        switch (item.__component) {
          case 'component.image':
            const imageAttrs = extractImageAttrs(item.image)
            return (
              <SliderSlide key={index}>
                <div className="h-full w-full">
                  <Image
                    src={imageAttrs.src}
                    alt={imageAttrs.alt}
                    className="object-cover"
                    fill
                  />
                </div>
              </SliderSlide>
            )

          case 'component.video':
            const previewAttrs = extractImageAttrs(item.previewImage)
            return (
              <SliderSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={previewAttrs.src}
                    alt={previewAttrs.alt}
                    className="object-cover"
                    fill
                  />
                  <VideoDialog
                    src={item.url}
                    trigger={
                      <PlayButton className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    }
                  />
                </div>
                {/*<Video src={item.url} poster={previewAttrs} />*/}
              </SliderSlide>
            )
        }
      })}
    </Slider>
  )
}
