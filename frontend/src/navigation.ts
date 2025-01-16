import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export type TLocale = 'en' | 'fr'
export type TParamsWithLocale = {
  params: {
    locale: string
  }
  searchParams: {
    past?: string
  }
}
export const locales = ['en', 'fr'] as const
export const defaultLocale = 'en' as const
export const localePrefix: 'as-needed' | 'always' | 'never' = 'always'

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
