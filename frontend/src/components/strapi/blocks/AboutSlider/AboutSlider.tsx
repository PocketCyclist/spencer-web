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
    <section>
      <div className="px-4 sm:px-18 grid md:grid-cols-2 lg:pt-32 py-12 md:gap-x-10 xl:gap-x-32">
        <div className="relative aspect-square self-center">
          <Image
            src={imageAttrs.src}
            alt={imageAttrs.alt}
            fill
            className="object-contain"
          />
        </div>
        <div className="self-center">
          <h4 className="flex items-end rem:text-[40px] lg:rem:text-[64px] rem:leading-[49px] lg:rem:leading-[79px] mb-6 mt-12 md:mt-0">
            {slide.heading}
          </h4>
          <p className="rem:text-[22px] rem:leading-[28px] lg:rem:text-[36px] lg:rem:leading-[45px] mb-12 xl:mb-16">
            {slide.description}
          </p>
          <nav className="flex gap-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setSlideIndex(index)}
                disabled={index === slideIndex}
                className={cn(
                  'w-7 h-7 rounded-full border-2 border-black',
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
