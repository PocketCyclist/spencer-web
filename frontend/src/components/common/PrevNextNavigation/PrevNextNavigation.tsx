import Link from 'next/link'

import {
  ArrowLeftIcon,
  ArrowLeftLongIcon,
  ArrowRightIcon,
  ArrowRightLongIcon,
  CapaIcon,
} from '@/icons'

type NavigationItem = {
  url: string
  title: string
}

type PrevNextNavigationProps = {
  prev?: NavigationItem
  next?: NavigationItem
}

export const PrevNextNavigation = ({ prev, next }: PrevNextNavigationProps) => {
  if (!prev && !next) {
    return null
  }

  return (
    <nav>
      <div className="container grid grid-cols-2 items-center gap-x-4 py-8 lg:gap-x-6 lg:py-16">
        {prev && (
          <Link
            className="flex-end group col-start-1 flex items-center gap-x-4 lg:gap-x-8"
            href={prev.url}
          >
            <span className="relative pl-10 lg:rem:pl-[55px]">
              <CapaIcon
                className="text-yellow rem:h-[48px] rem:w-[47px] lg:rem:h-[100px] lg:rem:w-[97px]"
                viewBox="0 0 39 40"
              />
              <ArrowLeftIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-arrow transition-colors group-hover:text-black lg:hidden" />
              <ArrowLeftLongIcon className="absolute left-0 top-1/2 hidden -translate-y-1/2 text-arrow transition-colors group-hover:text-black lg:block" />
            </span>
            <span className="hidden font-serif font-bold rem:text-[36px] rem:leading-[44.5px] lg:block">
              <span className="block font-sans font-normal rem:text-[24px] rem:leading-[30.12px]">
                Previous
              </span>
              {prev.title}
            </span>
          </Link>
        )}
        {next && (
          <Link
            className="group col-start-2 flex items-center justify-end gap-x-4 text-right lg:gap-x-8"
            href={next.url}
          >
            <span className="hidden font-serif font-bold rem:text-[36px] rem:leading-[44.5px] lg:block">
              <span className="block font-sans font-normal rem:text-[24px] rem:leading-[30.12px]">
                Next
              </span>
              {next.title}
            </span>
            <span className="relative pr-10 lg:rem:pr-[55px]">
              <CapaIcon
                className="text-yellow rem:h-[48px] rem:w-[47px] lg:rem:h-[100px] lg:rem:w-[97px]"
                viewBox="0 0 39 40"
              />
              <ArrowRightIcon className="absolute right-0 top-1/2 -translate-y-1/2 text-arrow transition-colors group-hover:text-black lg:hidden" />
              <ArrowRightLongIcon className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-arrow transition-colors group-hover:text-black lg:block" />
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
