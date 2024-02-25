import { useMemo } from 'react'

type UsePaginationProps = {
  boundaries?: number
  currentPage?: number
  siblings?: number
  total: number
}

const DOTS = 'dots' as const

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => index + start)
}

export const usePagination = ({
  boundaries = 1,
  currentPage = 1,
  siblings = 1,
  total,
}: UsePaginationProps): (number | 'dots')[] => {
  const paginationRange = useMemo(() => {
    // + currentPage + 2*DOTS
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2

    if (totalPageNumbers >= total) {
      return range(1, total)
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, boundaries)
    const rightSiblingIndex = Math.min(
      currentPage + siblings,
      total - boundaries,
    )

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1)

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(total - (boundaries - 1), total),
      ]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings
      return [
        ...range(1, boundaries),
        DOTS,
        ...range(total - rightItemCount, total),
      ]
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(total - boundaries + 1, total),
    ]
  }, [boundaries, currentPage, siblings, total])

  return paginationRange
}
