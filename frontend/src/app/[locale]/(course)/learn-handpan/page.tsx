import { strapiGet } from '@/data/strapi/common'
import { TStrapiSingleResponse } from '@/data/strapi/types/common/api'
import { Metadata, ResolvingMetadata } from 'next'
import { StrapiBlocks } from '@/components/strapi/StrapiBlocks/StrapiBlocks'
import { TStrapiCoursePromoPage } from '@/data/strapi/types/course'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TLocale, TParamsWithLocale } from '@/navigation'

const OnlineCourse = async ({ params: { locale } }: TParamsWithLocale) => {
  unstable_setRequestLocale(locale)
  const pageData = await strapiGet<
    TStrapiSingleResponse<TStrapiCoursePromoPage>
  >('course-promo-page', { deepPopulate: true, locale })
  const blocks = pageData.attributes.blocks

  return (
    <>
      <StrapiBlocks blocks={blocks} firstBlockOverlay />
    </>
  )
}

export default OnlineCourse

export const generateMetadata = async ({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiCoursePromoPage>>(
    `course-promo-page`,
    { query: { populate: 'seo', locale } },
  )

  return {
    ...page.attributes.seo,
  }
}
