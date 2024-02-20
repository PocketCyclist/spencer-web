import { strapiGet } from '@/data/strapi/common'
import {
  StrapiBlocks,
  TStrapiBlock,
} from '@/components/strapi/StrapiBlocks/StrapiBlocks'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'

const Home = async () => {
  const pageData = await strapiGet('landing-page')
  console.log(pageData)
  const blocks = pageData.data.attributes.blocks as TStrapiBlock[]
  return (
    <>
      <Header />
      <main className="pt-mobile-header lg:header">
        <StrapiBlocks blocks={blocks} />
        {/*<pre>*/}
        {/*  {JSON.stringify(pageData, null, 2)}*/}
        {/*</pre>*/}
      </main>
      <Footer />
    </>
  )
}

export default Home
