import { useSwiper } from 'swiper/react'

import {
  ArrowLeftIcon,
  ArrowLeftLongIcon,
  ArrowRightIcon,
  ArrowRightLongIcon,
  CapaIcon,
} from '@/icons'

export const SlideNavigation = ({
  isBeginning,
  isEnd,
}: {
  isBeginning: boolean
  isEnd: boolean
}) => {
  const swiper = useSwiper()

  return (
    <>
      <button
        aria-disabled={isBeginning}
        aria-label="Previous slide"
        className="pl-10 absolute rem:top-[472px] left-0 inline-flex items-center transition-opacity aria-disabled:opacity-0 lg:rem:pl-[72px] lg:rem:top-[689px]"
        type="button"
        onClick={() => swiper.slidePrev()}
      >
        <CapaIcon
          className="rem:w-[47px] rem:h-[48px] text-yellow lg:rem:w-[63px] lg:rem:h-[64px]"
          viewBox="0 0 39 40"
        />
        <ArrowLeftIcon className="absolute top-1/2 left-0 text-arrow transition-colors group-hover:text-black -translate-y-1/2 lg:hidden" />
        <ArrowLeftLongIcon className="hidden rem:w-[105px] rem:h-[23px] absolute top-1/2 left-0 text-arrow transition-colors group-hover:text-black -translate-y-1/2 lg:block" />
      </button>
      <button
        aria-disabled={isEnd}
        aria-label="Next slide"
        className="pr-10 absolute rem:top-[472px] right-0 inline-flex items-center transition-opacity aria-disabled:opacity-0 lg:rem:pr-[72px] lg:rem:top-[689px]"
        type="button"
        onClick={() => swiper.slideNext()}
      >
        <CapaIcon
          className="rem:w-[47px] rem:h-[48px] text-yellow lg:rem:w-[63px] lg:rem:h-[64px]"
          viewBox="0 0 39 40"
        />
        <ArrowRightIcon className="absolute top-1/2 right-0 text-arrow transition-colors group-hover:text-black -translate-y-1/2 lg:hidden" />
        <ArrowRightLongIcon className="hidden rem:w-[105px] rem:h-[23px] absolute top-1/2 right-0 text-arrow transition-colors group-hover:text-black -translate-y-1/2 lg:block" />
      </button>
    </>
  )
}
