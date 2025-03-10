import Image from 'next/image'

import { FooterNav } from './FooterNav'
import { FooterSocials } from './FooterSocials'
import LocaleSwitcher from '@/components/common/LocaleSwitcher/LocaleSwitcher'
import { TRoutes } from '@/constants/routes'
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl'
import { TLocale } from '@/navigation'
import { FooterSubscribe } from './FooterSubscribe'

export const Footer = ({ routes }: { routes: TRoutes }) => {
  const locale = useLocale() as TLocale
  const messages = useMessages()

  return (
    <footer className="relative bg-background">
      <div className="container grid grid-cols-1 gap-y-14 pb-4 pt-16 sm:pb-8 lg:py-[4.5rem] lg:rem:w-[1092px]">
        <div>
          <Image
            className="rem:w-[180px] lg:rem:w-[292px]"
            alt="The Gerard Spencer Project - Handpan performances classes & wellbeing"
            src="/images/logo.png"
            width={292}
            height={88}
          />
        </div>
        <div className="grid grid-cols-1 gap-y-14 lg:flex lg:justify-between lg:gap-x-2">
          <div className="lg:rem:basis-[300px]">
            <FooterNav routes={routes} />
            <div className="mt-3">
              <LocaleSwitcher />
            </div>
          </div>
          <div className="lg:rem:basis-[300px]">
            <NextIntlClientProvider locale={locale} messages={messages}>
              <FooterSubscribe />
            </NextIntlClientProvider>
          </div>
          <div className="lg:text-right lg:rem:basis-[300px]">
            <FooterSocials locale={locale} />
          </div>
        </div>
        <p className="border-t border-border pt-6 text-center text-footer-copy">
          &copy; {new Date().getFullYear()} The Gerard Spencer Project
        </p>
      </div>
    </footer>
  )
}
