'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { usePagination } from '@/hooks/usePagination'
import { CapaIcon } from '@/icons'
import { cn } from '@/lib/cn'

type PaginationProps = {
  boundaries?: number
  siblings?: number
  total: number
}

export const Pagination = ({
  boundaries,
  siblings,
  total,
}: PaginationProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const items = usePagination({ boundaries, currentPage, siblings, total })

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <nav
      aria-label="Pagination"
      className="rem:text-[16px] rem:leading-[20.08px]"
    >
      <div className="container py-16 lg:pt-20 lg:pb-28">
        <ul className="flex gap-6 flex-wrap justify-center items-center">
          {items?.map((item) => (
            <li key={item} className="leading-10">
              {item === 'dots' ? (
                <>&hellip;</>
              ) : (
                <Link
                  aria-current={item === currentPage ? 'page' : undefined}
                  className={cn(
                    'relative block after:absolute after:inset-y-0 after:-inset-x-3',
                    item === currentPage && 'font-bold',
                  )}
                  href={createPageUrl(item)}
                  title={`${item}`}
                >
                  {item === currentPage && (
                    <CapaIcon className="rem:w-[39px] rem:h-[40px] absolute rem:-left-[15px] top-0 -z-[1] text-yellow" />
                  )}
                  {item}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
