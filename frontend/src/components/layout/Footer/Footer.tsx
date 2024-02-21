import Image from 'next/image'

import { FooterNav } from './FooterNav'
import { FooterSocials } from './FooterSocials'
// import { FooterSubscribe } from './FooterSubscribe'

export const Footer = () => (
  <footer>
    <div className="container pt-16 pb-4 grid grid-cols-1 gap-y-14 sm:pb-8 lg:py-[4.5rem]">
      <div>
        <Image
          className="rem:w-[180px] lg:rem:w-[292px]"
          alt="The Gerard Spencer Project - Handpan performances classes & wellbeing"
          src="/images/footer-logo.png"
          width={292}
          height={133}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-14 lg:flex lg:justify-between lg:gap-x-6">
        <div className="lg:rem:basis-[300px]">
          <FooterNav />
        </div>
        {/* <div className="lg:rem:basis-[300px]">
          <FooterSubscribe />
        </div> */}
        <div className="lg:rem:basis-[300px] lg:text-right">
          <FooterSocials />
        </div>
      </div>
      <p className="pt-6 border-t border-border text-footer-copy text-center">
        &copy; 2022 The Gerard Spencer Project
      </p>
    </div>
  </footer>
)
