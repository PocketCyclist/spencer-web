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
        className="absolute left-4 inline-flex items-center pl-10 transition-opacity aria-disabled:opacity-0 rem:top-[472px] sm:left-0 lg:rem:top-[689px] lg:rem:pl-[72px]"
        type="button"
        onClick={() => swiper.slidePrev()}
      >
        <CapaIcon
          className="text-yellow rem:h-[48px] rem:w-[47px] lg:rem:h-[64px] lg:rem:w-[63px]"
          viewBox="0 0 39 40"
        />
        <ArrowLeftIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-arrow transition-colors group-hover:text-black lg:hidden" />
        <ArrowLeftLongIcon className="absolute left-0 top-1/2 hidden -translate-y-1/2 text-arrow transition-colors group-hover:text-black rem:h-[23px] rem:w-[105px] lg:block" />
      </button>
      <button
        aria-disabled={isEnd}
        aria-label="Next slide"
        className="absolute right-4 inline-flex items-center pr-10 transition-opacity aria-disabled:opacity-0 rem:top-[472px] sm:right-0 lg:rem:top-[689px] lg:rem:pr-[72px]"
        type="button"
        onClick={() => swiper.slideNext()}
      >
        <CapaIcon
          className="text-yellow rem:h-[48px] rem:w-[47px] lg:rem:h-[64px] lg:rem:w-[63px]"
          viewBox="0 0 39 40"
        />
        <ArrowRightIcon className="absolute right-0 top-1/2 -translate-y-1/2 text-arrow transition-colors group-hover:text-black lg:hidden" />
        <ArrowRightLongIcon className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-arrow transition-colors group-hover:text-black rem:h-[23px] rem:w-[105px] lg:block" />
      </button>
    </>
  )
}
