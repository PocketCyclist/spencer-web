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

  // В новом макете видео выводятся flex плиткой. Нужно их отфильтровать и поместить в контейнер.

  const firstElement = [blocks[0]] // Первый элемент Hero

  const videoBlocks = blocks.filter(
    (block) => block.__component === 'block.video',
  ) // Все элементы с компонентом 'block.video'

  const otherBlocks = blocks.filter(
    (block) => block.__component !== 'block.video' && block !== blocks[0],
  ) // Все элементы, которые не являются 'block.video' и не первый элемент

  return (
    <>
      <StrapiBlocks blocks={firstElement} />

      {/* <pre>{JSON.stringify(videoBlocks, null, 2)}</pre> */}

      <section className="relative flex min-h-screen-minus-mobile-header flex-col justify-center pt-24 lg:min-h-screen-minus-header">
        <div className="container flex max-w-5xl flex-wrap justify-between gap-y-2 no-scrollbar">
          {videoBlocks.map((item) => (
            <div key={item.id} className="">
              <Video
                src={item.video.url}
                poster_alt={
                  item.video.previewImage.data.attributes.alternativeText
                }
                poster_src={
                  item.video.previewImage.data.attributes.formats.small.url
                }
                title={
                  item.video.previewImage.data.attributes.alternativeText ||
                  'Video'
                }
              />
            </div>
          ))}
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
