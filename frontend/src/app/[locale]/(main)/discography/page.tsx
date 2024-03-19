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
import { TLocale, TParamsWithLocale } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

const Discography = async ({ params: { locale } }: TParamsWithLocale) => {
  unstable_setRequestLocale(locale)
  const [pageData, albums] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiDiscographyPage>>(
      'discography-page',
      { locale, deepPopulate: true },
    ),
    strapiGet<TStrapiListResponse<TStrapiAlbum>>('albums', {
      locale,
      query: {
        populate: 'deep',
        pagination: {
          pageSize: 100,
        },
      },
    }),
  ])

  return (
    <section className="relative flex min-h-screen-minus-mobile-header flex-col justify-center lg:min-h-screen-minus-header">
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
      <div className="container flex max-w-full snap-x snap-mandatory overflow-x-auto py-8 no-scrollbar">
        <div className="min-w-px" />
        {albums.map((item) => (
          <div
            key={item.id}
            className="flex max-w-[95%] flex-shrink-0 snap-start flex-col pl-4 md:pl-10 xl:rem:pl-[100px] sm:[&:nth-child(2)]:pl-[calc((100vw-(640px-2rem*2))/2)] md:[&:nth-child(2)]:pl-[calc((100vw-(768px-2rem*2))/2)] lg:[&:nth-child(2)]:pl-[calc((100vw-(1024px-2rem*2))/2)] xl:[&:nth-child(2)]:pl-[calc((100vw-(1280px-4.125rem*2))/2)]"
          >
            <article className="group flex flex-1 flex-col bg-[rgb(217_217_217/100%)] rem:max-w-[580px]">
              <div className="relative z-0 min-w-[75vw] rem:h-[318px] md:min-w-[30vw]">
                {item.attributes.cover && (
                  <Image
                    alt={item.attributes.cover.data.attributes.alternativeText}
                    className="object-cover"
                    fill
                    sizes="(min-width: 640px) 580px, 95vw"
                    src={item.attributes.cover.data.attributes.url}
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity after:absolute after:inset-0 after:bg-red/50 group-hover:opacity-100" />
                <h5 className="absolute bottom-0 left-0 right-16 z-10 mt-auto max-w-[362px] p-4 font-serif font-[48px] leading-none text-white opacity-0 transition-opacity group-hover:opacity-100 rem:text-[36px] md:p-6">
                  {item.attributes.title}
                </h5>
                {item.attributes.buyUrl && (
                  <Link
                    href={item.attributes.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-4 top-4"
                  >
                    <CartIcon className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                )}
                {item.attributes.videoUrl && (
                  <VideoDialog
                    src={item.attributes.videoUrl}
                    trigger={
                      <button className="absolute bottom-4 right-4">
                        <VideoIcon className="opacity-0 transition-opacity group-hover:opacity-100" />
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

export const generateMetadata = async ({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>(
    `discography-page`,
    { query: { populate: 'seo' }, locale },
  ).catch(() => notFound())

  return {
    ...page.attributes.seo,
  }
}
