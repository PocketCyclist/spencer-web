import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiNewsPage, TStrapiPost } from '@/data/strapi/types/posts'

const News = async () => {
  const pageData =
    await strapiGet<TStrapiSingleResponse<TStrapiNewsPage>>('news-page')
  const posts = await strapiGet<TStrapiListResponse<TStrapiPost>>('posts')
  console.log(pageData, posts)

  return (
    <>
      <div className="my-4 bg-cyan-50">
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
      </div>
      {posts.map((post) => (
        <div key={post.id} className="my-4 bg-amber-50">
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
      ))}
    </>
  )
}

export default News
