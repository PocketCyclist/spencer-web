import { BuyCircleIcon } from '@/icons'
import Link from 'next/link'

type QuoteProps = {
  author?: string
  text: string
}

const backgroundInviteUrl = '/images/main-pic.jpg'
const buyUrl =
  'https://handpanharmony.com/products/discovery-handpan-workshop-bookeasy'
const buyText = "I'm Ready to Start!"

export const Quote = ({ text, author }: QuoteProps) => (
  <section className="bg-main-pic lg:mb-30 mb-10">
    <div className="container flex flex-col justify-center pb-[3.125rem]  pt-[25rem] lg:mt-[6rem] lg:pb-[3rem] lg:pt-[17.5rem] ">
      <div className="mx-auto rem:max-w-[987px] ">
        <p className="text-center font-serif text-white rem:text-[36px] rem:leading-[44.5px] sm:whitespace-break-spaces lg:rem:text-[64px] lg:rem:leading-[79.1px]">
          {text}
        </p>
        <Link
          href={buyUrl}
          title={buyText}
          className={
            'group relative mx-auto mt-4 flex flex-col items-center justify-center transition-all  duration-700 hover:scale-125 sm:mt-12 md:mt-12'
          }
        >
          <BuyCircleIcon
            className="text-[#FFC441] transition-colors duration-500 group-hover:text-[#D64100] rem:h-[104px] rem:w-[104px] md:rem:h-[196px] md:rem:w-[196px]"
            height={196}
            width={196}
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-[19px] font-extrabold leading-[106%] text-[#D64100] transition-colors duration-500 group-hover:text-[#FFC441] md:rem:text-[36px] md:rem:leading-[38px]">
            <div className="text-center rem:max-w-[150px] md:rem:max-w-[150px]">
              {buyText}
            </div>
          </div>
        </Link>
      </div>
    </div>
  </section>
)
