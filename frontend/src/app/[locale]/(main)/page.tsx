import { strapiGet } from '@/data/strapi/common'
import { TStrapiSingleResponse } from '@/data/strapi/types/common/api'
import { StrapiBlocks } from '@/components/strapi/StrapiBlocks/StrapiBlocks'
import { TStrapiLandingPage } from '@/data/strapi/types/landing'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiEventsPage } from '@/data/strapi/types/events'
import { TLocale, TParamsWithLocale } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

const Home = async ({ params: { locale } }: TParamsWithLocale) => {
  unstable_setRequestLocale(locale)
  const pageData = await strapiGet<TStrapiSingleResponse<TStrapiLandingPage>>(
    'landing-page',
    { locale, deepPopulate: true },
  )
  const blocks = pageData.attributes.blocks
  return (
    <>
      <StrapiBlocks blocks={blocks} />
      {/*<pre>*/}
      {/*  {JSON.stringify(pageData, null, 2)}*/}
      {/*</pre>*/}
    </>
  )
}

export default Home

export const generateMetadata = async ({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>(
    `landing-page`,
    { query: { populate: 'seo' }, locale },
  )

  return {
    ...page.attributes.seo,
  }
}
