'use client'

import { TStrapiFAQItem } from '@/data/strapi/types/course'
import { cn } from '@/lib/cn'
import { useState } from 'react'

export const FAQ = ({
  title,
  items,
  moreText,
  initialItems,
}: {
  title: string
  items: TStrapiFAQItem[]
  moreText: string
  initialItems: number
}) => {
  const [opened, setOpened] = useState<boolean>(false)
  const itemsToShow = opened ? items : items.slice(0, initialItems)
  const showMore = initialItems < items.length && !opened

  return (
    <section className="flex flex-col items-center">
      <div className="grid w-full max-w-[1728px] gap-6 px-6 py-12 sm:px-18 lg:grid-cols-2 lg:gap-16 xl:grid-cols-3">
        <div className="font-serif rem:text-[40px] rem:leading-[49px] sm:whitespace-break-spaces lg:rem:text-[64px] lg:rem:leading-[79px]">
          {title}
        </div>
        <ul className="flex flex-col xl:col-span-2">
          {itemsToShow.map((section, index) => (
            <li
              key={section.id}
              className={cn(
                'group flex justify-between gap-6 border-gray-300 py-6',
                index !== itemsToShow.length - 1 && 'border-b',
              )}
            >
              <div className="flex flex-col justify-center">
                <span className="text-[#D64100] transition-colors group-hover:text-black rem:text-[22px] rem:leading-[27px] sm:rem:text-[36px] sm:rem:leading-[45px]">
                  {section.question}
                </span>
                <span className="rem:text-[21px] rem:leading-[28px]">
                  {section.answer}
                </span>
              </div>
            </li>
          ))}
          {showMore && (
            <button
              onClick={() => setOpened(true)}
              className="mt-5 rounded-full border border-gray-300 p-4 text-[20px] leading-[28px] transition-colors hover:text-[#D64100]"
            >
              {moreText}
            </button>
          )}
        </ul>
      </div>
    </section>
  )
}
