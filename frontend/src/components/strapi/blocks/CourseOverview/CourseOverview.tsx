'use client'

import { TStrapiCourseSection, TStrapiStat } from '@/data/strapi/types/course'
import { cn } from '@/lib/cn'
import Image from 'next/image'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { useState } from 'react'

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

  return (
    <section>
      <div className="flex flex-col items-center">
        <ul className="border-b border-gray-300 grid grid-cols-2 lg:flex lg:flex-row justify-between w-full py-12 gap-4 md:gap-12 px-6 sm:px-18 max-w-[1728px]">
          {stats.map((stat) => (
            <li key={stat.id} className="">
              <span className="rem:text-[24px] leading-[30px] sm:rem:text-[36px] sm:leading-[45px]">
                {stat.value}
              </span>
              <br />
              <span className="rem:text-[18px] leading-[24px] sm:rem:text-[20px] sm:leading-[28px]">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 w-full max-w-[1728px] px-6 sm:px-18 py-12 gap-6 lg:gap-16">
          <div className="font-serif rem:text-[40px] rem:leading-[49px] sm:whitespace-break-spaces lg:rem:text-[64px] lg:rem:leading-[79px]">
            {title}
          </div>
          <ul className="xl:col-span-2 flex flex-col">
            {sectionsToShow.map((section, index) => {
              const media =
                section.previewMedia.data &&
                extractImageAttrs(section.previewMedia)
              return (
                <li
                  key={section.id}
                  className={cn(
                    'py-6 border-gray-300 flex justify-between gap-6',
                    index !== sectionsToShow.length - 1 && 'border-b',
                  )}
                >
                  <div className="flex flex-col justify-center hover:text-[#D64100] transition-colors">
                    <span className="rem:text-[22px] rem:leading-[27px] sm:rem:text-[36px] sm:rem:leading-[45px]">
                      {section.title}
                    </span>
                    <span className="rem:text-[21px] rem:leading-[28px]">
                      {section.length}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'h-[100px] w-[158px] relative',
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
            {!opened && (
              <button
                onClick={() => setOpened(true)}
                className="p-4 mt-5 border border-gray-300 rounded-full text-[20px] leading-[28px] hover:bg-gray-200 transition-colors"
              >
                {moreText}
              </button>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
