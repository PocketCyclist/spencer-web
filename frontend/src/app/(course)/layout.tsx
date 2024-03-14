import type { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer/Footer'
import { mulish, oldStandardTT } from '@/lib/fonts'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'The Gerard Spencer Project',
  description: 'Handpan Performances, Classes & Wellbeings',
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${mulish.variable} ${oldStandardTT.variable} bg-white font-sans tracking-[-0.07em] text-foreground antialiased rem:text-[20px] rem:leading-[25.1px]`}
      >
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
