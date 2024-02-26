import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiNewsPage, TStrapiPost } from '@/data/strapi/types/posts'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiEventsPage } from '@/data/strapi/types/events'

const News = async () => {
  const [pageData, posts] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiNewsPage>>('news-page'),
    strapiGet<TStrapiListResponse<TStrapiPost>>('posts'),
  ])

  return (
    <>
      <div className="my-4 bg-cyan-50">
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
      </div>
      {posts.map((event) => (
        <div key={event.id} className="my-4 bg-amber-50">
          <pre>{JSON.stringify(event, null, 2)}</pre>
        </div>
      ))}
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
