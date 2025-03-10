import { PostCard } from '@/components/common/PostCard/PostCard'
import { Cymbal } from '@/components/strapi/blocks/Cymbal/Cymbal'
import { MediaSlider } from '@/components/ui/Slider/MediaSlider'
import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiPost } from '@/data/strapi/types/posts'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { TStrapiProject } from '@/data/strapi/types/projects'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TLocale } from '@/navigation'
import { ensureBestTranslation } from '@/lib/ensureBestTranslation'

const Post = async ({
  params: { slug, locale },
}: {
  params: { slug: string; locale: TLocale }
}) => {
  unstable_setRequestLocale(locale)

  const [post, latestPosts] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiPost>>(`posts/${slug}`).catch(() =>
      notFound(),
    ),
    strapiGet<TStrapiListResponse<TStrapiPost>>('posts', {
      locale,
      query: {
        populate: 'promoImage',
        sort: 'publishedAt:desc',
        pagination: {
          pageSize: 4,
        },
      },
    }).then((posts) =>
      posts.filter((post) => post.id.toString() !== slug).slice(0, 3),
    ),
  ])

  ensureBestTranslation(post, 'news', locale)

  return (
    <>
      <section>
        <div className="container flex flex-col">
          <header className="py-8 lg:py-12">
            <h1 className="font-serif rem:text-[48px] rem:leading-[59.33px] lg:rem:text-[88px] lg:rem:leading-[108.77px]">
              {post.attributes.title}
            </h1>
            <p className="mt-2 font-bold">Sunday 10th April</p>
          </header>
          <div className="-order-1 lg:order-none">
            <MediaSlider media={post.attributes.media} />
          </div>
          <div className="pb-16 lg:rem:max-w-[800px] lg:rem:py-[88px]">
            <p className="whitespace-pre-wrap 2xl:rem:min-h-[200px]">
              {post.attributes.content}
            </p>
            {/* <div className="mt-12 lg:hidden">
              <Button type="button" variant="primary">
                Buy a ticket
                <ArrowRightSmallIcon className="ml-14" />
              </Button>
            </div> */}
          </div>
        </div>
      </section>
      <Cymbal className="[&>*]:-translate-y-[68%]" right />

      {latestPosts.length > 0 && (
        <section>
          <div className="container py-16 lg:rem:py-[88px]">
            <h2 className="mb-10 font-serif rem:text-[40px] rem:leading-[49.44px] lg:rem:text-[64px] lg:rem:leading-[79.1px]">
              Other news
            </h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
              {latestPosts.map((post) => (
                <PostCard
                  key={post.id}
                  description={post.attributes.promoText}
                  image={extractImageAttrs(post.attributes.promoImage)}
                  title={post.attributes.title}
                  url={`/news/${post.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Post

export const generateStaticParams = async () => {
  return strapiGet<TStrapiListResponse<TStrapiPost>>('posts', {
    query: {
      locale: 'all',
      pagination: {
        pageSize: 100,
      },
    },
  }).then((posts) =>
    posts.map((post) => ({
      slug: post.id.toString(),
      locale: post.attributes.locale,
    })),
  )
}

export const generateMetadata = async ({
  params: { slug, locale },
}: {
  params: { slug: string; locale: TLocale }
}): Promise<Metadata> => {
  const post = await strapiGet<TStrapiSingleResponse<TStrapiProject>>(
    `posts/${slug}`,
    { query: { populate: 'seo' }, locale },
  ).catch(() => notFound())

  return {
    ...post.attributes.seo,
    alternates: {
      canonical: `/${post.attributes.locale}/posts/${post.id}`,
    },
  }
}
