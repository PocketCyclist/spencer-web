import { strapiGet } from '@/data/strapi/common'
import { TStrapiSingleResponse } from '@/data/strapi/types/common/api'
import { StrapiBlocks } from '@/components/strapi/StrapiBlocks/StrapiBlocks'
import { TStrapiLandingPage } from '@/data/strapi/types/landing'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiEventsPage } from '@/data/strapi/types/events'
import { TLocale, TParamsWithLocale } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Video } from '@/components/strapi/blocks/Video/Video'

const Home = async ({ params: { locale } }: TParamsWithLocale) => {
  unstable_setRequestLocale(locale)
  const pageData = await strapiGet<TStrapiSingleResponse<TStrapiLandingPage>>(
    'landing-page',
    { locale, deepPopulate: true },
  )
  const blocks = pageData.attributes.blocks

  const firstElement = [blocks[0]] // First block in the list (should be Hero)

  // All the Video blocks
  const videoBlocks = blocks.filter(
    (block) => block.__component === 'block.video',
  )

  // The rest of the blocks in order
  const otherBlocks = blocks.filter(
    (block) => block.__component !== 'block.video' && block !== blocks[0],
  )

  return (
    <>
      <StrapiBlocks blocks={firstElement} />

      {/* <pre>{JSON.stringify(videoBlocks, null, 2)}</pre> */}

      <section className="relative flex min-h-screen-minus-mobile-header flex-col justify-center pt-24 lg:min-h-screen-minus-header">
        <div className="container flex flex-wrap justify-center gap-8 no-scrollbar lg:rem:w-[1092px]">
          {videoBlocks.map((item) => (
            <div key={item.id}>
              <Video
                src={item.video.url}
                poster={{
                  alt: item.video.previewImage.data.attributes.alternativeText,
                  src: item.video.previewImage.data.attributes.formats.small
                    .url,
                }}
                title={
                  item.video.previewImage.data.attributes.alternativeText ||
                  'Video'
                }
              />
            </div>
          ))}
          <div>
            <article className="rem:max-w-[460px]">
              <div className="relative z-0  w-[300px] lg:rem:w-[410px]">
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                  &nbsp;
                  <br />
                </p>{' '}
              </div>
            </article>
          </div>
        </div>
      </section>
      <StrapiBlocks blocks={otherBlocks} />
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
