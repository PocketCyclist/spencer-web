'use client'

import { TStrapiCourseSection, TStrapiStat } from '@/data/strapi/types/course'
import { cn } from '@/lib/cn'
import Image from 'next/image'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { useState } from 'react'
import MarqueeComponent from 'react-fast-marquee'
import useWindowDimensions from '@/data/strapi/utils/useWindowDimensions'
import { useIsServer } from '@/data/strapi/utils/isServer'

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
  const isServer = useIsServer()
  const { width } = useWindowDimensions()
  const [opened, setOpened] = useState<boolean>(false)
  const sectionsToShow = opened ? sections : sections.slice(0, initialSections)
  const showMore = initialSections < sections.length && !opened
  const marqueeSpeed = isServer ? 0 : (width || 0) > 1024 ? 0 : 50
  const Marquee = isServer
    ? ('div' as unknown as typeof MarqueeComponent)
    : MarqueeComponent
  const marqueeProps = isServer
    ? { className: 'flex opacity-100 overflow-hidden justify-between' }
    : {
        speed: marqueeSpeed,
        pauseOnClick: true,
        pauseOnHover: true,
        className: 'stats-marquee',
        delay: 1,
      }

  return (
    <section>
      <div className="flex flex-col items-center">
        <ul className="w-full justify-between gap-4 border-b border-gray-300 py-12 rem:min-h-[151px] sm:rem:min-h-[170px] lg:px-18 lg:rem:min-h-[149px] lg:rem:max-w-[1728px] xl:rem:min-h-[170px]">
          <Marquee {...marqueeProps}>
            {stats.map((stat) => (
              <li
                key={stat.id}
                className="flex flex-col items-center whitespace-nowrap px-7 lg:px-0"
              >
                <span className="w-full rem:text-[24px] rem:leading-[30px] sm:rem:text-[36px] sm:rem:leading-[45px]">
                  {stat.value}
                </span>
                <span className="w-full rem:text-[18px] rem:leading-[24px] sm:rem:text-[20px] sm:rem:leading-[28px]">
                  {stat.label}
                </span>
              </li>
            ))}
          </Marquee>
        </ul>
        <div className="grid w-full max-w-[1728px] gap-6 px-6 py-12 sm:px-18 lg:grid-cols-2 lg:gap-16 xl:grid-cols-3">
          <h2 className="font-serif rem:text-[40px] rem:leading-[49px] sm:whitespace-break-spaces lg:rem:text-[64px] lg:rem:leading-[79px]">
            {title}
          </h2>
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
