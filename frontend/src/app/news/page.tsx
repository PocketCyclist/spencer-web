import { Hero } from '@/components/common/Hero/Hero'
import { PostCard } from '@/components/common/PostCard/PostCard'
// import { Pagination } from '@/components/ui/Pagination/Pagination'
import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiNewsPage, TStrapiPost } from '@/data/strapi/types/posts'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { CapaIcon } from '@/icons'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiEventsPage } from '@/data/strapi/types/events'

const News = async () => {
  const [pageData, posts] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiNewsPage>>('news-page'),
    strapiGet<TStrapiListResponse<TStrapiPost>>('posts', {
      query: {
        populate: 'deep',
        sort: 'publishedAt:desc',
      },
    }),
  ])

  return (
    <>
      <div
        className="hidden relative z-10 select-none pointer-events-none 2xl:flex"
        role="presentation"
      >
        <div className="container relative">
          <div className="absolute right-full top-0">
            <CapaIcon
              className="rem:w-[255px] rem:h-[264px] absolute rem:right-[228px] rem:-top-[73px] text-yellow"
              viewBox="0 0 39 40"
            />
            <CapaIcon
              className="rem:w-[255px] rem:h-[264px] absolute rem:right-[10px] rem:top-[220px] text-sand"
              viewBox="0 0 39 40"
            />
            <CapaIcon
              className="rem:w-[255px] rem:h-[264px] absolute rem:right-[156px] rem:top-[556px] text-green"
              viewBox="0 0 39 40"
            />
          </div>
        </div>
      </div>

      <Hero
        bgImage={extractImageAttrs(pageData.attributes.heroImage)}
        title={pageData.attributes.title}
        description={pageData.attributes.description}
      />

      {posts.length > 0 && (
        <section>
          <div className="container py-16 lg:py-28">
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-8 lg:gap-y-20">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  description={post.attributes.promoText}
                  image={extractImageAttrs(post.attributes.promoImage)}
                  isLarge
                  title={post.attributes.title}
                  url={`/news/${post.id}`}
                />
              ))}
            </div>

            {/* <div className="mt-16 lg:mt-20">
            <Pagination total={10} />
          </div> */}
          </div>
        </section>
      )}
    </>
  )
}

export default News

export const generateMetadata = async (
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>(
    `news-page`,
    { query: { populate: 'seo' } },
  )

  return {
    // ...((await parent) as Metadata),
    ...page.attributes.seo,
  }
}
