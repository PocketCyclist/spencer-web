import { strapiGet } from '@/data/strapi/common'
import { TStrapiSingleResponse } from '@/data/strapi/types/common/api'
import { Metadata, ResolvingMetadata } from 'next'
import { StrapiBlocks } from '@/components/strapi/StrapiBlocks/StrapiBlocks'
import { TStrapiCoursePromoPage } from '@/data/strapi/types/course'

const OnlineCourse = async () => {
  const pageData = await strapiGet<
    TStrapiSingleResponse<TStrapiCoursePromoPage>
  >('course-promo-page', { deepPopulate: true })
  const blocks = pageData.attributes.blocks

  return (
    <>
      <StrapiBlocks blocks={blocks} />
    </>
  )
}

export default OnlineCourse

export const generateMetadata = async (
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiCoursePromoPage>>(
    `course-promo-page`,
    { query: { populate: 'seo' } },
  )

  return {
    // ...((await parent) as Metadata),
    ...page.attributes.seo,
  }
}
