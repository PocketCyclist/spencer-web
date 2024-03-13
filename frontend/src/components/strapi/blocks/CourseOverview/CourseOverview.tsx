'use client'

import { TStrapiCourseSection, TStrapiStat } from '@/data/strapi/types/course'
import { cn } from '@/lib/cn'
import Image from 'next/image'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { useState } from 'react'
import Marquee from 'react-fast-marquee'
import useWindowDimensions from '@/data/strapi/utils/useWindowDimensions'

export const CourseOverview = ({
  title,
  stats,
  sections,
  moreText,
  initialSections,
}: {
  title: string
  stats: TStrapiStat[]
  sections: TStrapiCourseSection[]
  moreText: string
  initialSections: number
}) => {
  const [opened, setOpened] = useState<boolean>(false)
  const sectionsToShow = opened ? sections : sections.slice(0, initialSections)
  const showMore = initialSections < sections.length && !opened
  const { width } = useWindowDimensions()
  const marqueeSpeed = typeof window === 'undefined' ? 0 : width > 1024 ? 0 : 50

  return (
    <section>
      <div className="flex flex-col items-center">
        <ul className="w-full max-w-[1728px] justify-between gap-4 border-b border-gray-300 px-6 py-12 sm:px-18">
          <Marquee
            speed={marqueeSpeed}
            pauseOnClick
            pauseOnHover
            className="stats-marquee"
            delay={1}
          >
            {stats.map((stat) => (
              <li
                key={stat.id}
                className="flex flex-col items-center whitespace-nowrap px-7 lg:px-0"
              >
                <span className="w-full leading-[30px] rem:text-[24px] sm:leading-[45px] sm:rem:text-[36px]">
                  {stat.value}
                </span>
                <span className="w-full leading-[24px] rem:text-[18px] sm:leading-[28px] sm:rem:text-[20px]">
                  {stat.label}
                </span>
              </li>
            ))}
          </Marquee>
        </ul>
        <div className="grid w-full max-w-[1728px] gap-6 px-6 py-12 sm:px-18 lg:grid-cols-2 lg:gap-16 xl:grid-cols-3">
          <div className="font-serif rem:text-[40px] rem:leading-[49px] sm:whitespace-break-spaces lg:rem:text-[64px] lg:rem:leading-[79px]">
            {title}
          </div>
          <ul className="flex flex-col xl:col-span-2">
            {sectionsToShow.map((section, index) => {
              const media =
                section.previewMedia.data &&
                extractImageAttrs(section.previewMedia)
              return (
                <li
                  key={section.id}
                  className={cn(
                    'group flex justify-between gap-6 border-gray-300 py-6',
                    index !== sectionsToShow.length - 1 && 'border-b',
                  )}
                >
                  <div className="flex flex-col justify-center transition-colors group-hover:text-[#D64100]">
                    <span className="rem:text-[22px] rem:leading-[27px] sm:rem:text-[36px] sm:rem:leading-[45px]">
                      {section.title}
                    </span>
                    <span className="rem:text-[21px] rem:leading-[28px]">
                      {section.length}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'relative h-[100px] w-[158px]',
                      media && 'box-shadow',
                    )}
                  >
                    {media && (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        // height={100}
                        // width={158}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </li>
              )
            })}
            {showMore && (
              <button
                onClick={() => setOpened(true)}
                className="mt-5 rounded-full border border-gray-300 p-4 text-[20px] leading-[28px] transition-colors hover:bg-gray-200"
              >
                {moreText.replace(
                  '%itemsLeft',
                  (sections.length - sectionsToShow.length).toString(),
                )}
              </button>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
