import type { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer/Footer'
import { mulish, oldStandardTT } from '@/lib/fonts'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'The Gerard Spencer Project',
  description: 'Handpan Performances, Classes & Wellbeings',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/android-chrome-192x192.png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function CourseLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale}>
      <body
        className={`${mulish.variable} ${oldStandardTT.variable} bg-white font-sans tracking-[-0.07em] text-foreground antialiased rem:text-[20px] rem:leading-[25.1px]`}
      >
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
