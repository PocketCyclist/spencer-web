import { Hero } from '@/components/common/Hero/Hero'
import { PostCard } from '@/components/common/PostCard/PostCard'
import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiNewsPage, TStrapiPost } from '@/data/strapi/types/posts'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { CapaIcon } from '@/icons'
import { Metadata } from 'next'
import { TStrapiEventsPage } from '@/data/strapi/types/events'
import { TLocale, TParamsWithLocale } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

const News = async ({ params: { locale } }: TParamsWithLocale) => {
  unstable_setRequestLocale(locale)

  const [pageData, posts] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiNewsPage>>('news-page', {
      locale,
      deepPopulate: true,
    }),
    strapiGet<TStrapiListResponse<TStrapiPost>>('posts', {
      locale,
      query: {
        populate: 'deep',
        sort: 'publishedAt:desc',
        pagination: {
          pageSize: 100,
        },
      },
    }),
  ])

  return (
    <>
      <div className="text-h1-title container">
        <h1 className="font-serif text-[64px] leading-[270px]">
          {pageData.attributes.title}
        </h1>
      </div>

      <section>
        <div className="container py-16 lg:py-28">INSTA FEED HERE</div>
      </section>
    </>
  )
}

export default News

export const generateMetadata = async ({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>(
    `news-page`,
    { query: { populate: 'seo' }, locale },
  )

  return {
    ...page.attributes.seo,
  }
}

{
  /* <div
        className="pointer-events-none relative z-10 hidden select-none 2xl:flex"
        role="presentation"
      >
        <div className="container relative">
          <div className="absolute right-full top-0">
            <CapaIcon
              className="absolute text-yellow rem:-top-[73px] rem:right-[228px] rem:h-[264px] rem:w-[255px]"
              viewBox="0 0 39 40"
            />
            <CapaIcon
              className="absolute text-sand rem:right-[10px] rem:top-[220px] rem:h-[264px] rem:w-[255px]"
              viewBox="0 0 39 40"
            />
            <CapaIcon
              className="absolute text-green rem:right-[156px] rem:top-[556px] rem:h-[264px] rem:w-[255px]"
              viewBox="0 0 39 40"
            />
          </div>
        </div>
      </div> */
}
