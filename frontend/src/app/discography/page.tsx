import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/Button/Button'
import { strapiGet } from '@/data/strapi/common'
import { TStrapiAlbum } from '@/data/strapi/types/albums'
import {
  TStrapiListResponse,
  // TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'

const Discography = async () => {
  // const pageData =
  //   await strapiGet<TStrapiSingleResponse<any>>('discography-page') // TODO
  const albums = await strapiGet<TStrapiListResponse<TStrapiAlbum>>('albums')

  return (
    <section className="rem:min-h-[600px] relative flex flex-col justify-center">
      <div className="absolute inset-0 -z-[1] after:absolute after:inset-0 after:bg-black/40">
        {/* <Image alt="alt" className="object-cover" fill src="src" /> */}
      </div>
      <div className="rem:py-[232px] container max-w-full flex snap-x snap-mandatory overflow-x-auto">
        <div className="min-w-px" />
        {albums.map((item) => (
          <div
            key={item.id}
            className="max-w-[95%] pl-4 group flex flex-col flex-shrink-0 snap-start sm:[&:nth-child(2)]:pl-[calc((100vw-(640px-2rem*2))/2)] md:pl-10 md:[&:nth-child(2)]:pl-[calc((100vw-(768px-2rem*2))/2)] xl:rem:pl-[100px] lg:[&:nth-child(2)]:pl-[calc((100vw-(1024px-2rem*2))/2)] xl:[&:nth-child(2)]:pl-[calc((100vw-(1280px-4.125rem*2))/2)]"
          >
            <article className="rem:max-w-[580px] flex flex-col flex-1 bg-[rgb(217_217_217/100%)]">
              <div className="rem:h-[318px] relative">
                {item.attributes.cover && (
                  <Image
                    alt={item.attributes.cover.data.attributes.alternativeText}
                    className="object-cover"
                    fill
                    src={item.attributes.cover.data.attributes.url}
                  />
                )}
                <div className="absolute inset-0 opacity-0 bg-black/40 transition-opacity after:absolute after:inset-0 after:bg-red/50 group-hover:opacity-100" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h5 className="mb-4 font-serif rem:text-[36px] leading-none">
                  {item.attributes.title}
                </h5>
                <p>{item.attributes.description}</p>
                <div className="mt-auto pt-9 flex flex-col gap-y-4 sm:flex-row sm:gap-y-0 sm:gap-x-4">
                  <Button asChild className="sm:flex-1" variant="red">
                    <Link
                      href={item.attributes.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy
                    </Link>
                  </Button>
                  <Button asChild className="sm:flex-1" variant="white">
                    <Link
                      href={item.attributes.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Discography
