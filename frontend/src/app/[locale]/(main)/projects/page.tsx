import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Hero } from '@/components/common/Hero/Hero'
import { PlayButton } from '@/components/ui/PlayButton/PlayButton'
import { PrevNextNavigation } from '@/components/common/PrevNextNavigation/PrevNextNavigation'
import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'
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
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { getSurroundingItems } from '@/data/strapi/utils/surroundingItems'
import { CapaIcon } from '@/icons'
import { Metadata, ResolvingMetadata } from 'next'
import { TStrapiEventsPage } from '@/data/strapi/types/events'
import { SmallMediaImage } from '@/components/common/SmallMediaImage/SmallMediaImage'
import { TLocale, TParamsWithLocale } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

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
        populate: ['coverImage'], // Указываем связанные поля для загрузки
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
  const [prevProject, nextProject] = getSurroundingItems(project, projects)
  //console.log('[projects]', projects)
  // projects.map((item) => {
  //   console.log(item.attributes.coverImage)
  // })

  return (
    <>
      <div className="text-h1-title container">
        <h1 className="py-12 font-serif text-[48px] leading-[60px] md:py-24 md:leading-[80px] md:rem:text-[64px]">
          {pageData.attributes.title}
        </h1>
      </div>
      <div className="container flex max-w-6xl flex-wrap justify-between gap-y-8 no-scrollbar">
        {projects.map((item) => (
          <div key={item.id}>
            <article className="rem:max-w-[464px]">
              <div className="relative z-0">
                {item.attributes.coverImage && (
                  <Image
                    alt={
                      item.attributes.coverImage.data.attributes.alternativeText
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
              </div>
              <div className="flex min-w-[75vw] flex-1 flex-col pb-4 pt-8 md:min-w-[20vw]">
                <h5 className="font-sans leading-none rem:text-[36px]">
                  {item.attributes.title}
                </h5>
                <p className="my-3 font-sans rem:text-[20px]">
                  <TruncateText
                    text={item.attributes.content}
                    maxLength={110}
                  />
                </p>
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
      </div>
      {/* <Hero
        className="lg:py-0"
        contentClassName="py-8 lg:justify-center"
        bgImage={extractImageAttrs(pageData.attributes.heroImage)}
        title={pageData.attributes.title}
      />

      <PrevNextNavigation
        prev={
          prevProject
            ? {
                title: prevProject?.attributes.title,
                url: `/projects/${prevProject.id}` || '#',
              }
            : undefined
        }
        next={
          nextProject
            ? {
                title: nextProject.attributes.title,
                url: `/projects/${nextProject.id}` || '#',
              }
            : undefined
        }
      /> */}

      {/* <div>
        <div className="container space-y-12 py-16 lg:flex lg:flex-row-reverse lg:justify-between lg:space-y-0 lg:py-28">
          <div className="space-y-8 lg:w-[calc(489*100%/1152)]">
            <h2 className="font-serif rem:text-[36px] rem:leading-[44.5px]">
              {project.attributes.title}
            </h2>
            <p className="whitespace-pre-wrap rem:text-[16px] rem:leading-[20.08px]">
              {project.attributes.content}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-[calc(542*100%/1152)] lg:gap-8">
            <div className="relative col-span-2 aspect-[542/305]">
              <Image
                alt={
                  project.attributes.coverImage.data.attributes.alternativeText
                }
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 542px, 100vw"
                src={project.attributes.coverImage.data.attributes.url}
              />
            </div>
            {project.attributes.media.map((item) => (
              <div key={item.id} className="relative aspect-[255/143]">
                {item.__component === 'component.image' && (
                  <SmallMediaImage {...extractImageAttrs(item.image)} />
                )}
                {item.__component === 'component.video' && (
                  <>
                    <SmallMediaImage
                      {...extractImageAttrs(item.previewImage)}
                    />
                    <VideoDialog
                      src={item.url}
                      trigger={
                        <PlayButton className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rem:size-[56px] xl:rem:size-[80px]" />
                      }
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div> */}

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

interface TruncateTextProps {
  text: string
  maxLength?: number
}
export const TruncateText: React.FC<TruncateTextProps> = ({
  text,
  maxLength = 200,
}) => {
  if (!text) return null

  const truncated =
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text

  return <span>{truncated}</span>
}
