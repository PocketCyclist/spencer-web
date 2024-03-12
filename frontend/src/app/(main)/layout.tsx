import type { Metadata } from 'next'

import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { mulish, oldStandardTT } from '@/lib/fonts'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'The Gerard Spencer Project',
  description: 'Handpan Performances, Classes & Wellbeings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${mulish.variable} ${oldStandardTT.variable} bg-background font-sans text-foreground antialiased rem:text-[20px] rem:leading-[25.1px]`}
      >
        <Header />
        <main className="pt-mobile-header lg:pt-header">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
