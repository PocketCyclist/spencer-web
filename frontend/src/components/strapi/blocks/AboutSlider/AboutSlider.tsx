'use client'

import { TStrapiAboutSlide } from '@/data/strapi/types/course'
import Image from 'next/image'
import { useState } from 'react'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { cn } from '@/lib/cn'

export const AboutSlider = ({ slides }: { slides: TStrapiAboutSlide[] }) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const slide = slides[slideIndex]
  const imageAttrs = extractImageAttrs(slide.coverImage)
  return (
    <section className="flex flex-col items-center px-4 py-12 sm:px-18">
      <div className="grid md:grid-cols-2 md:gap-x-10 lg:pt-32 xl:gap-x-32">
        <div className="relative aspect-square self-center">
          <Image
            src={imageAttrs.src}
            alt={imageAttrs.alt}
            fill
            className="object-contain"
          />
        </div>
        <div className="self-center">
          <h2 className="mb-6 mt-12 flex items-end rem:text-[40px] rem:leading-[49px] md:mt-0 lg:rem:text-[64px] lg:rem:leading-[79px]">
            {slide.heading}
          </h2>
          <p className="mb-12 rem:text-[22px] rem:leading-[28px] lg:rem:text-[36px] lg:rem:leading-[45px] xl:mb-16">
            {slide.description}
          </p>
          <nav className="flex gap-4">
            {slides.map((slide, index) => (
              <button
                aria-label={`Go to ${slide.heading}`}
                key={slide.id}
                onClick={() => setSlideIndex(index)}
                disabled={index === slideIndex}
                className={cn(
                  'h-7 w-7 rounded-full border-2 border-black',
                  index === slideIndex && 'bg-black',
                )}
              />
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
