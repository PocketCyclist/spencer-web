import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from '@/navigation'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
  }
})
