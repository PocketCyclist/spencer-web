import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiPost } from '@/data/strapi/types/posts'
import { notFound } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiProject } from '@/data/strapi/types/projects'

const Post = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await strapiGet<TStrapiSingleResponse<TStrapiPost>>(
    `posts/${slug}`,
  ).catch(() => notFound())

  return (
    <>
      <div className="my-4 bg-amber-50">
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>
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
