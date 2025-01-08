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
import { Button } from '@/components/ui/Button/Button'

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
  //console.log('[albums]', albums)
  return (
    <section className="relative flex min-h-screen-minus-mobile-header flex-col justify-center lg:min-h-screen-minus-header">
      <div className="text-h1-title container">
        <h1 className="py-12 font-serif text-[48px] leading-[60px] md:py-24 md:leading-[80px] md:rem:text-[64px]">
          Discography
        </h1>
      </div>
      <div className="container flex max-w-6xl flex-wrap justify-between gap-y-8 no-scrollbar">
        {albums.map((item) => (
          <div key={item.id} className="">
            <article className="rem:max-w-[460px]">
              <div className="relative z-0">
                {item.attributes.cover && (
                  <Image
                    alt={item.attributes.cover.data.attributes.alternativeText}
                    className="rounded-md object-cover"
                    fill
                    sizes="(min-width: 640px) 580px, 95vw"
                    src={item.attributes.cover.data.attributes.url}
                  />
                )}

                <h5 className="mt-auto max-w-[362px] font-sans leading-none text-white opacity-0 rem:min-h-[410px] rem:text-[48px]">
                  {item.attributes.title}
                </h5>
              </div>
              <div className="flex min-w-[75vw] flex-1 flex-col pb-6 pt-9 md:min-w-[20vw]">
                <h5 className="mb-4 font-sans leading-none rem:text-[36px]">
                  {item.attributes.title}
                </h5>
                <div className="mt-auto flex flex-col gap-y-4 pb-6 pt-2 sm:flex-row sm:gap-x-4 sm:gap-y-0">
                  <Button asChild className="sm:flex-1" variant="secondary">
                    <Link
                      href={item.attributes.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch
                    </Link>
                  </Button>
                  <Button asChild className="sm:flex-1" variant="primary">
                    <Link
                      href={item.attributes.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy{' '}
                    </Link>
                  </Button>
                </div>
                <p className="font-sans  rem:text-[20px]">
                  {item.attributes.description}
                </p>
              </div>
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

// {
//   item.attributes.buyUrl && (
//     <Link
//       href={item.attributes.buyUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="absolute right-4 top-4"
//     >
//       <CartIcon className="opacity-0 transition-opacity group-hover:opacity-100" />
//     </Link>
//   )
// }
// {
//   item.attributes.videoUrl && (
//     <VideoDialog
//       src={item.attributes.videoUrl}
//       trigger={
//         <button className="absolute bottom-4 right-4">
//           <VideoIcon className="opacity-0 transition-opacity group-hover:opacity-100" />
//         </button>
//       }
//     />
//   )
// }
