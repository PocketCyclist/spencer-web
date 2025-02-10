import { About } from '@/components/strapi/blocks/About/About'
import { strapiGet } from '@/data/strapi/common'
import { TStrapiDiscographyPage } from '@/data/strapi/types/albums'
import { TStrapiSingleResponse } from '@/data/strapi/types/common/api'
import { TStrapiLandingPage } from '@/data/strapi/types/landing'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { TParamsWithLocale } from '@/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'

const AboutPage = async ({ params: { locale } }: TParamsWithLocale) => {
  unstable_setRequestLocale(locale)
  // Fix for about page - we don't create a special type in admin, but instead we get the 'about' block from Landing page - in order to display it here separately.
  const pageData = await strapiGet<TStrapiSingleResponse<TStrapiLandingPage>>(
    'landing-page',
    { locale, deepPopulate: true },
  )
  const blocks = pageData.attributes.blocks

  const block = blocks.filter((item) => item.__component === 'block.about')[0]
  console.log('aboutBlock', block)

  return (
    <>
      <About
        title={block.title}
        description={block.description}
        quote={block.quote}
        author={block.author}
        firstImage={extractImageAttrs(block.firstImage)}
        secondImage={extractImageAttrs(block.secondImage)}
      />
    </>
  )
}

export default AboutPage

export const generateMetadata = async (
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  // const page = await strapiGet<TStrapiSingleResponse<TStrapiContactPage>>(
  //   `contact-page`,
  //   { query: { populate: 'seo' } },
  // ).catch(() => notFound())

  return {
    // ...((await parent) as Metadata),
    // ...page.attributes.seo,
    title: 'About - The Gerard Spencer Project',
  }
}

{
  /* <Cymbal className="[&>*]:-translate-y-[72.429%]" right /> */
}
