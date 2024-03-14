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
    <section className="flex flex-col items-center px-4 py-12 pb-4 sm:px-18 sm:pb-12">
      <div className="grid max-w-[1728px] overflow-hidden rounded-lg bg-[#0C4876] text-[#FFF1E7] lg:grid-cols-2">
        <div className="flex flex-col gap-8 px-4 py-12 text-center lg:px-12 lg:py-18">
          <h3 className="rem:text-[40px] rem:leading-[49px] md:mt-0 lg:rem:text-[64px] lg:rem:leading-[79px]">
            {text}
          </h3>
          <Link
            href={buyUrl}
            className={
              'relative mx-auto mt-4 flex flex-col items-center justify-center sm:mt-12'
            }
          >
            <BuyCircleIcon
              className="rotate text-[#FFC441] rem:h-[104px] rem:w-[104px] md:rem:h-[196px] md:rem:w-[196px]"
              height={196}
              width={196}
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-[19px] font-extrabold leading-[106%] text-[#D64100] md:rem:text-[36px] md:rem:leading-[38px] ">
              <div className="max-w-[150px]">{buyText}</div>
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
