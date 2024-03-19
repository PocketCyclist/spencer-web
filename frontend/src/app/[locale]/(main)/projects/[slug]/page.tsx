import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import {
  TStrapiProject,
  TStrapiProjectsPage,
} from '@/data/strapi/types/projects'
import { getSurroundingItems } from '@/data/strapi/utils/surroundingItems'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/common/Hero/Hero'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { PrevNextNavigation } from '@/components/common/PrevNextNavigation/PrevNextNavigation'
import Image from 'next/image'
import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'
import { PlayButton } from '@/components/ui/PlayButton/PlayButton'
import { CapaIcon } from '@/icons'
import { Metadata, ResolvingMetadata } from 'next'
import { SmallMediaImage } from '@/components/common/SmallMediaImage/SmallMediaImage'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TLocale } from '@/navigation'

const Project = async ({
  params: { slug, locale },
}: {
  params: { slug: string; locale: TLocale }
}) => {
  unstable_setRequestLocale(locale)
  const [pageData, projects, project] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiProjectsPage>>('projects-page'),
    strapiGet<TStrapiListResponse<{ title: string }>>('projects', {
      query: {
        fields: ['title'],
        pagination: {
          pageSize: 100,
        },
      },
    }),
    strapiGet<TStrapiSingleResponse<TStrapiProject>>(`projects/${slug}`).catch(
      () => notFound(),
    ),
  ])

  if (!projects.length) return notFound()
  const [prevProject, nextProject] = getSurroundingItems(project, projects)

  return (
    <>
      <Hero
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
      />

      <div>
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
                {...extractImageAttrs(project.attributes.coverImage)}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 542px, 100vw"
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

export default Project

export const generateStaticParams = async () => {
  return strapiGet<TStrapiListResponse<TStrapiProject>>('projects', {
    query: {
      locale: 'all',
      pagination: {
        pageSize: 100,
      },
    },
    noLocalize: true,
  }).then((projects) =>
    projects.map((project) => ({
      slug: project.id.toString(),
      locale: project.attributes.locale,
    })),
  )
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const slug = params.slug
  const project = await strapiGet<TStrapiSingleResponse<TStrapiProject>>(
    `projects/${slug}`,
    { query: { populate: 'seo' } },
  ).catch(() => notFound())

  return {
    ...project.attributes.seo,
  }
}
