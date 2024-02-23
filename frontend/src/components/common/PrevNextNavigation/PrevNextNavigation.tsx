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
      <div className="container py-8 grid grid-cols-2 gap-x-4 items-center lg:py-16 lg:gap-x-6">
        {prev && (
          <Link
            className="group col-start-1 flex flex-end gap-x-4 items-center lg:gap-x-8"
            href={prev.url}
          >
            <span className="pl-10 relative lg:rem:pl-[55px]">
              <CapaIcon
                className="rem:w-[47px] rem:h-[48px] text-yellow lg:rem:w-[97px] lg:rem:h-[100px]"
                viewBox="0 0 39 40"
              />
              <ArrowLeftIcon className="absolute top-1/2 left-0 text-arrow transition-colors group-hover:text-black -translate-y-1/2 lg:hidden" />
              <ArrowLeftLongIcon className="hidden absolute top-1/2 left-0 text-arrow transition-colors group-hover:text-black -translate-y-1/2 lg:block" />
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
            className="group col-start-2 flex gap-x-4 justify-end items-center text-right lg:gap-x-8"
            href={next.url}
          >
            <span className="hidden font-serif font-bold rem:text-[36px] rem:leading-[44.5px] lg:block">
              <span className="block font-sans font-normal rem:text-[24px] rem:leading-[30.12px]">
                Next
              </span>
              {next.title}
            </span>
            <span className="pr-10 relative lg:rem:pr-[55px]">
              <CapaIcon
                className="rem:w-[47px] rem:h-[48px] text-yellow lg:rem:w-[97px] lg:rem:h-[100px]"
                viewBox="0 0 39 40"
              />
              <ArrowRightIcon className="absolute top-1/2 right-0 text-arrow transition-colors group-hover:text-black -translate-y-1/2 lg:hidden" />
              <ArrowRightLongIcon className="hidden absolute top-1/2 right-0 text-arrow transition-colors group-hover:text-black -translate-y-1/2 lg:block" />
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
