import { strapiGet } from '@/data/strapi/common'
import { TStrapiSingleResponse } from '@/data/strapi/types/common/api'
import { StrapiBlocks } from '@/components/strapi/StrapiBlocks/StrapiBlocks'
import { TStrapiLandingPage } from '@/data/strapi/types/landing'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiEventsPage } from '@/data/strapi/types/events'

const Home = async () => {
  const pageData =
    await strapiGet<TStrapiSingleResponse<TStrapiLandingPage>>('landing-page')
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

export const generateMetadata = async (
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>(
    `landing-page`,
    { query: { populate: 'seo' } },
  )

  return {
    // ...((await parent) as Metadata),
    ...page.attributes.seo,
  }
}
