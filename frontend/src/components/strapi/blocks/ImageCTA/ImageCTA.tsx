import { TStrapiImageField } from '@/data/strapi/types/common/api'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { BuyCircleIcon, CapaIcon } from '@/icons'
import Link from 'next/link'
import Image from 'next/image'

export const ImageCTA = ({
  text,
  coverImage,
  buyText,
  buyUrl,
}: {
  text: string
  coverImage: TStrapiImageField
  buyText: string
  buyUrl: string
}) => {
  const imageAttrs = extractImageAttrs(coverImage)
  return (
    <section className="flex flex-col items-center px-4 py-4 pb-4 sm:py-12 lg:px-18">
      <div className="grid max-w-[1728px] overflow-hidden rounded-lg bg-[#0C4876] text-[#FFF1E7] lg:grid-cols-2">
        <div className="flex flex-col gap-8 px-4 py-12 text-center lg:px-12 lg:py-18">
          <h3 className="rem:text-[40px] rem:leading-[49px] md:mt-0 lg:rem:text-[64px] lg:rem:leading-[79px]">
            {text}
          </h3>
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
              <div className="rem:max-w-[150px] md:rem:max-w-[150px]">
                {buyText}
              </div>
            </div>
          </Link>
        </div>
        <div className="relative row-start-1 rem:min-h-[358px] sm:min-h-[500px] lg:col-start-2">
          <Image
            src={imageAttrs.src}
            alt={imageAttrs.alt}
            className="object-cover "
            fill
          />
        </div>
      </div>
    </section>
  )
}
