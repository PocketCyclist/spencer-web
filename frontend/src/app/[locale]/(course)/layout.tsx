import { Footer } from '@/components/layout/Footer/Footer'
import { mulish, oldStandardTT } from '@/lib/fonts'

import '@/styles/globals.css'
import { useTranslations } from 'next-intl'
import { getTranslatedRoutes } from '@/constants/routes'
import { unstable_setRequestLocale } from 'next-intl/server'
import { locales } from '@/navigation'

export default function CourseLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('routes')
  const routes = getTranslatedRoutes(t)

  return (
    <html lang={locale}>
      <body
        className={`${mulish.variable} ${oldStandardTT.variable} bg-white font-sans tracking-[-0.07em] text-foreground antialiased rem:text-[20px] rem:leading-[25.1px]`}
      >
        <main className="">{children}</main>
        <Footer routes={routes} />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
