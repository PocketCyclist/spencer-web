'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { usePathname } from '@/navigation'

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
      <div className="container py-16 lg:pb-28 lg:pt-20">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {items?.map((item) => (
            <li key={item} className="leading-10">
              {item === 'dots' ? (
                <>&hellip;</>
              ) : (
                <Link
                  aria-current={item === currentPage ? 'page' : undefined}
                  className={cn(
                    'relative block after:absolute after:-inset-x-3 after:inset-y-0',
                    item === currentPage && 'font-bold',
                  )}
                  href={createPageUrl(item)}
                  title={`${item}`}
                >
                  {item === currentPage && (
                    <CapaIcon className="absolute top-0 -z-[1] text-yellow rem:-left-[15px] rem:h-[40px] rem:w-[39px]" />
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
