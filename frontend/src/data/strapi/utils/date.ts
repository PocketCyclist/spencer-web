import { parseISO } from 'date-fns/parseISO'
import { format } from 'date-fns/format'

export const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Adding 1 because months are zero-based
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const parseDateToWords = (inputDate?: string) => {
  if (!inputDate) return { month: undefined, date: undefined }
  const dateObj = parseISO(inputDate)

  const month = format(dateObj, 'MMM')
  const day = format(dateObj, 'do MMMM')

  return {
    month,
    date: day,
  }
}
