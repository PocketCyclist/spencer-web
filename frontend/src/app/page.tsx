import Image from 'next/image'
import { strapiGet } from '@/data/strapi/common'
import {
  StrapiBlocks,
  TStrapiBlock,
} from '@/components/strapi/StrapiBlocks/StrapiBlocks'

const Home = async () => {
  const pageData = await strapiGet('landing-page')
  console.log(pageData)
  const blocks = pageData.data.attributes.blocks as TStrapiBlock[]
  return (
    <main>
      <StrapiBlocks blocks={blocks} />
      {/*<pre>*/}
      {/*  {JSON.stringify(pageData, null, 2)}*/}
      {/*</pre>*/}
    </main>
  )
}

export default Home
