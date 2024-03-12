import Image from 'next/image'

import { FooterNav } from './FooterNav'
import { FooterSocials } from './FooterSocials'
import { FooterSubscribe } from '@/components/layout/Footer/FooterSubscribe'
// import { FooterSubscribe } from './FooterSubscribe'

export const Footer = () => (
  <footer>
    <div className="container grid grid-cols-1 gap-y-14 pb-4 pt-16 sm:pb-8 lg:py-[4.5rem]">
      <div>
        <Image
          className="rem:w-[180px] lg:rem:w-[292px]"
          alt="The Gerard Spencer Project - Handpan performances classes & wellbeing"
          src="/images/logo.png"
          width={292}
          height={88}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-14 lg:flex lg:justify-between lg:gap-x-6">
        <div className="lg:rem:basis-[300px]">
          <FooterNav />
        </div>
        <div className="lg:rem:basis-[300px]">
          <FooterSubscribe />
        </div>
        <div className="lg:text-right lg:rem:basis-[300px]">
          <FooterSocials />
        </div>
      </div>
      <p className="border-t border-border pt-6 text-center text-footer-copy">
        &copy; {new Date().getFullYear()} The Gerard Spencer Project
      </p>
    </div>
  </footer>
)
