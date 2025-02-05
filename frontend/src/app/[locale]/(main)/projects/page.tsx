import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiImageField,
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import {
  TStrapiProject,
  TStrapiProjectsPage,
} from '@/data/strapi/types/projects'
//import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { CapaIcon } from '@/icons'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiEventsPage } from '@/data/strapi/types/events'
import { TLocale, TParamsWithLocale } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import TruncateText from '@/components/common/TruncateText/TruncateText'

const Projects = async ({ params: { locale } }: TParamsWithLocale) => {
  unstable_setRequestLocale(locale)
  const [pageData, projects] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiProjectsPage>>('projects-page', {
      locale,
      deepPopulate: true,
    }),
    strapiGet<
      TStrapiListResponse<{
        title: string
        content: string
        coverImage: TStrapiImageField
      }>
    >('projects', {
      locale,
      query: {
        fields: ['title', 'content'],
        populate: ['coverImage'],
        pagination: {
          pageSize: 100,
        },
      },
    }),
  ])

  if (!projects.length) return notFound()
  const project = await strapiGet<TStrapiSingleResponse<TStrapiProject>>(
    `projects/${projects[0].id}`,
  )

  return (
    <>
      <div className="text-h1-title container">
        <h1 className="py-12 font-serif text-[48px] leading-[60px]  md:py-24 md:leading-[80px] md:rem:text-[64px]">
          {pageData.attributes.title}
        </h1>
      </div>
      <div className=" container flex flex-wrap justify-center gap-8 no-scrollbar  lg:max-w-[71rem] lg:rem:pb-[112px]">
        {projects.map((item) => (
          <div key={item.id}>
            <article className="w-full rem:max-w-[460px] lg:w-auto">
              <div className="relative z-0">
                <Link href={`/projects/${item.id}`}>
                  {item.attributes.coverImage && (
                    <Image
                      alt={
                        item.attributes.coverImage.data.attributes
                          .alternativeText
                      }
                      className="rounded-md object-cover"
                      fill
                      sizes="(min-width: 640px) 580px, 95vw"
                      src={item.attributes.coverImage.data.attributes.url}
                    />
                  )}

                  <h5 className="mt-auto max-w-[362px] font-sans leading-none text-white opacity-0 rem:min-h-[410px] rem:text-[48px]">
                    {item.attributes.title}
                  </h5>
                </Link>
              </div>
              <div className="flex min-w-[75vw] flex-1 flex-col pb-4 pt-8 md:min-w-[20vw]">
                <h5 className="font-sans leading-none rem:text-[36px]">
                  <Link href={`/projects/${item.id}`}>
                    {item.attributes.title}
                  </Link>
                </h5>
                <Link href={`/projects/${item.id}`}>
                  <p className="my-3 font-sans rem:text-[20px]">
                    <TruncateText
                      text={item.attributes.content}
                      maxLength={110}
                    />
                  </p>
                </Link>
                <Link
                  className="max-w-fit underline underline-offset-2 hover:no-underline rem:text-[16px]"
                  href={`/projects/${item.id}`}
                  title="Details"
                >
                  Details
                </Link>
              </div>
            </article>{' '}
          </div>
        ))}
        <div>
          <article className="rem:max-w-[460px] sm:rem:w-[460px]">
            <div className="w-full rem:max-w-[460px] sm:rem:w-[460px]">
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                &nbsp;
                <br />
              </p>{' '}
            </div>
          </article>
        </div>
      </div>

      <div
        className="relative -z-[1] hidden select-none 2xl:flex"
        role="presentation"
      >
        <div className="container relative">
          <div className="absolute right-full rem:bottom-[35px]">
            <CapaIcon
              className="absolute text-blue rem:bottom-[435px] rem:right-[250px] rem:h-[300px] rem:w-[290px]"
              viewBox="0 0 39 40"
            />
            <CapaIcon
              className="absolute text-yellow rem:-right-[42px] rem:bottom-[326px] rem:h-[223px] rem:w-[216px]"
              viewBox="0 0 39 40"
            />
            <CapaIcon
              className="absolute text-red rem:bottom-[36px] rem:right-[100px] rem:h-[283px] rem:w-[274px]"
              viewBox="0 0 39 40"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects

export const generateMetadata = async ({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>(
    `projects-page`,
    { query: { populate: 'seo', locale } },
  )

  return {
    ...page.attributes.seo,
  }
}
