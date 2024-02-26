import { PostCard } from '@/components/common/PostCard/PostCard'
import { Cymbal } from '@/components/strapi/blocks/Cymbal/Cymbal'
// import { Button } from '@/components/ui/Button/Button'
import { MediaSlider } from '@/components/ui/Slider/MediaSlider'
import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiPost } from '@/data/strapi/types/posts'
// import { ArrowRightSmallIcon } from '@/icons'
import { notFound } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiProject } from '@/data/strapi/types/projects'

const Post = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await strapiGet<TStrapiSingleResponse<TStrapiPost>>(
    `posts/${slug}`,
  ).catch(() => notFound())

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
            <p className="2xl:rem:min-h-[200px] whitespace-pre-wrap">
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

      <section>
        <div className="container py-16 lg:rem:py-[88px]">
          <h2 className="mb-10 font-serif rem:text-[40px] rem:leading-[49.44px] lg:rem:text-[64px] lg:rem:leading-[79.1px]">
            Other news
          </h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-y-12 sm:gap-x-8 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
            <PostCard
              description="The Gerard Spencer Project is the consecration of the Handpan, The Gerard Spencer Project is the consecration of the Handpan..."
              image={{ alt: '', src: '' }}
              title="Some Post Title Goes Here"
              url="#"
            />
            <PostCard
              description="The Gerard Spencer Project is the consecration of the Handpan, The Gerard Spencer Project is the consecration of the Handpan..."
              image={{ alt: '', src: '' }}
              title="Some Post Title Goes Here"
              url="#"
            />
            <PostCard
              description="The Gerard Spencer Project is the consecration of the Handpan, The Gerard Spencer Project is the consecration of the Handpan..."
              image={{ alt: '', src: '' }}
              title="Some Post Title Goes Here"
              url="#"
            />
          </div>
        </div>
      </section>

      {/* <div className="my-4 bg-amber-50">
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </div> */}
    </>
  )
}

export default Post

export const generateStaticParams = async () => {
  return strapiGet<TStrapiListResponse<TStrapiPost>>('posts').then((posts) =>
    posts.map((post) => ({
      slug: post.id.toString(),
    })),
  )
}

export const generateMetadata = async (
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const slug = params.slug
  const post = await strapiGet<TStrapiSingleResponse<TStrapiProject>>(
    `posts/${slug}`,
    { query: { populate: 'seo' } },
  ).catch(() => notFound())

  return {
    // ...((await parent) as Metadata),
    ...post.attributes.seo,
  }
}
