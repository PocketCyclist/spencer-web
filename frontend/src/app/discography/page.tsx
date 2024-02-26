import Image from 'next/image'
import Link from 'next/link'
import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiAlbum,
  TStrapiDiscographyPage,
} from '@/data/strapi/types/albums'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiEventsPage } from '@/data/strapi/types/events'
import { notFound } from 'next/navigation'
import { CartIcon, VideoIcon } from '@/icons'
import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'

const Discography = async () => {
  const [pageData, albums] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiDiscographyPage>>(
      'discography-page',
    ),
    strapiGet<TStrapiListResponse<TStrapiAlbum>>('albums', {
      query: {
        populate: 'deep',
        pagination: {
          pageSize: 100,
        },
      },
    }),
  ])

  return (
    <section className="min-h-screen-minus-mobile-header relative flex flex-col justify-center lg:min-h-screen-minus-header">
      <div className="absolute inset-0 -z-[1] after:absolute after:inset-0 after:bg-black/40">
        <Image
          alt={
            pageData.attributes.backgroundImage.data.attributes.alternativeText
          }
          className="object-cover"
          fill
          src={pageData.attributes.backgroundImage.data.attributes.url}
        />
      </div>
      <div className="py-8 container max-w-full flex snap-x snap-mandatory overflow-x-auto no-scrollbar">
        <div className="min-w-px" />
        {albums.map((item) => (
          <div
            key={item.id}
            className="max-w-[95%] pl-4 flex flex-col flex-shrink-0 snap-start sm:[&:nth-child(2)]:pl-[calc((100vw-(640px-2rem*2))/2)] md:pl-10 md:[&:nth-child(2)]:pl-[calc((100vw-(768px-2rem*2))/2)] xl:rem:pl-[100px] lg:[&:nth-child(2)]:pl-[calc((100vw-(1024px-2rem*2))/2)] xl:[&:nth-child(2)]:pl-[calc((100vw-(1280px-4.125rem*2))/2)]"
          >
            <article className="rem:max-w-[580px] group flex flex-col flex-1 bg-[rgb(217_217_217/100%)]">
              <div className="rem:h-[318px] relative min-w-[75vw] md:min-w-[30vw] z-0">
                {item.attributes.cover && (
                  <Image
                    alt={item.attributes.cover.data.attributes.alternativeText}
                    className="object-cover"
                    fill
                    sizes="(min-width: 640px) 580px, 95vw"
                    src={item.attributes.cover.data.attributes.url}
                  />
                )}
                <div className="absolute inset-0 opacity-0 bg-black/40 transition-opacity after:absolute after:inset-0 after:bg-red/50 group-hover:opacity-100" />
                <h5 className="absolute left-0 right-16 bottom-0 mt-auto p-4 md:p-6 font-serif max-w-[362px] rem:text-[36px] leading-none z-10 text-white font-[48px] transition-opacity opacity-0 group-hover:opacity-100">
                  {item.attributes.title}
                </h5>
                {item.attributes.buyUrl && (
                  <Link
                    href={item.attributes.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4"
                  >
                    <VideoIcon className="transition-opacity opacity-0 group-hover:opacity-100" />
                  </Link>
                )}
                {item.attributes.videoUrl && (
                  <VideoDialog
                    src={item.attributes.videoUrl}
                    trigger={
                      <button className="absolute bottom-4 right-4">
                        <CartIcon className="transition-opacity opacity-0 group-hover:opacity-100" />
                      </button>
                    }
                  />
                )}
              </div>
              {/*<div className="p-6 flex flex-col flex-1 min-w-[75vw] md:min-w-[30vw]">*/}
              {/*  <h5 className="mb-4 font-serif rem:text-[36px] leading-none">*/}
              {/*    {item.attributes.title}*/}
              {/*  </h5>*/}
              {/*  <p>{item.attributes.description}</p>*/}
              {/*  <div className="mt-auto pt-9 flex flex-col gap-y-4 sm:flex-row sm:gap-y-0 sm:gap-x-4">*/}
              {/*    <Button asChild className="sm:flex-1" variant="primary">*/}
              {/*      <Link*/}
              {/*        href={item.attributes.buyUrl}*/}
              {/*        target="_blank"*/}
              {/*        rel="noopener noreferrer"*/}
              {/*      >*/}
              {/*        Buy*/}
              {/*      </Link>*/}
              {/*    </Button>*/}
              {/*    <Button asChild className="sm:flex-1" variant="secondary">*/}
              {/*      <Link*/}
              {/*        href={item.attributes.videoUrl}*/}
              {/*        target="_blank"*/}
              {/*        rel="noopener noreferrer"*/}
              {/*      >*/}
              {/*        Watch*/}
              {/*      </Link>*/}
              {/*    </Button>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Discography

export const generateMetadata = async (
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>(
    `discography-page`,
    { query: { populate: 'seo' } },
  ).catch(() => notFound())

  return {
    // ...((await parent) as Metadata),
    ...page.attributes.seo,
  }
}
