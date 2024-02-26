'use client'

import { ReactNode, useState } from 'react'
import { Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { cn } from '@/lib/cn'

import { SlideNavigation } from './SliderNavigation'

import 'swiper/css'
import 'swiper/css/pagination'

import s from './Slider.module.css'

export const Slider = ({ children }: { children: ReactNode }) => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(true)

  return (
    <div className={cn('relative', s.root)}>
      <Swiper
        modules={[Pagination, A11y]}
        onInit={(swiper) => {
          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        slidesPerView={1}
      >
        {children}
        <SlideNavigation isBeginning={isBeginning} isEnd={isEnd} />
      </Swiper>
    </div>
  )
}

export const SliderSlide = SwiperSlide
