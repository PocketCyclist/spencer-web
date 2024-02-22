const getSurroundingIndexes = (
  index: number,
  length: number,
): [prev: number | undefined, next: number | undefined] => {
  if (length === 0) return [undefined, undefined]
  if (index < 0) return [undefined, 0]
  if (length === 1) return [undefined, undefined]
  if (length === 2) return index === 1 ? [0, undefined] : [undefined, 1]

  const lastIndex = length - 1
  return [
    index === 0 ? lastIndex : index - 1,
    index < lastIndex ? index + 1 : 0,
  ]
}

export const getSurroundingItemsByIndex = <T>(
  index: number,
  items: T[],
): [prev: T | undefined, next: T | undefined] => {
  const [prev, next] = getSurroundingIndexes(index, items.length)
  return [
    prev === undefined ? undefined : items[prev],
    next === undefined ? undefined : items[next],
  ]
}

export const getSurroundingItems = <T extends { id: number }>(
  item: T,
  items: T[],
): [prev: T | undefined, next: T | undefined] =>
  getSurroundingItemsByIndex(
    items.findIndex((t) => t.id === item.id),
    items,
  )
