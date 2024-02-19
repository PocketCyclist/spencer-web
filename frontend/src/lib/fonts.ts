import { Mulish, Old_Standard_TT } from 'next/font/google'

export const oldStandardTT = Old_Standard_TT({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-old-standard-tt',
})

export const mulish = Mulish({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
})
