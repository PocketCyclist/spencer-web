import { strapiGet } from '@/data/strapi/common'
import { TStrapiSingleResponse } from '@/data/strapi/types/common/api'
import { StrapiBlocks } from '@/components/strapi/StrapiBlocks/StrapiBlocks'
import { TStrapiLandingPage } from '@/data/strapi/types/landing'

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
