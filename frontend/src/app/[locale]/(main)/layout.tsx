import type { Metadata } from 'next'

import { Header } from '@/components/layout/Header/Header'
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

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale}>
      <body
        className={`${mulish.variable} ${oldStandardTT.variable} bg-background font-sans tracking-[-0.07em] text-foreground antialiased rem:text-[20px] rem:leading-[25.1px]`}
      >
        <Header />
        <main className="pt-mobile-header lg:pt-header">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
