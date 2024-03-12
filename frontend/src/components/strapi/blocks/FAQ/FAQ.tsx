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
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 w-full max-w-[1728px] px-6 sm:px-18 py-12 gap-6 lg:gap-16">
        <div className="font-serif rem:text-[40px] rem:leading-[49px] sm:whitespace-break-spaces lg:rem:text-[64px] lg:rem:leading-[79px]">
          {title}
        </div>
        <ul className="xl:col-span-2 flex flex-col">
          {itemsToShow.map((section, index) => (
            <li
              key={section.id}
              className={cn(
                'py-6 border-gray-300 flex justify-between gap-6 group',
                index !== itemsToShow.length - 1 && 'border-b',
              )}
            >
              <div className="flex flex-col justify-center">
                <span className="rem:text-[22px] rem:leading-[27px] sm:rem:text-[36px] sm:rem:leading-[45px] text-[#D64100] group-hover:text-black transition-colors">
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
              className="p-4 mt-5 border border-gray-300 rounded-full text-[20px] leading-[28px] hover:text-[#D64100] transition-colors"
            >
              {moreText}
            </button>
          )}
        </ul>
      </div>
    </section>
  )
}
