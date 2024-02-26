import { parseISO } from 'date-fns/parseISO'
import { format } from 'date-fns/format'

export const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Adding 1 because months are zero-based
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const parseDateToWords = (
  inputDate?: string,
): { dayOfWeek?: string; date?: string } => {
  if (!inputDate) return { dayOfWeek: undefined, date: undefined }
  const dateObj = parseISO(inputDate)

  const dayOfWeek = format(dateObj, 'EEE')
  const day = format(dateObj, 'do MMMM')

  return {
    dayOfWeek,
    date: day,
  }
}
