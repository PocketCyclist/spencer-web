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
import { Metadata } from 'next'
import { SmallMediaImage } from '@/components/common/SmallMediaImage/SmallMediaImage'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TLocale } from '@/navigation'
import { ensureBestTranslation } from '@/lib/ensureBestTranslation'
import Link from 'next/link'

const Project = async ({
  params: { slug, locale },
}: {
  params: { slug: string; locale: TLocale }
}) => {
  unstable_setRequestLocale(locale)
  const [project, pageData, projects] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiProject>>(`projects/${slug}`).catch(
      () => notFound(),
    ),
    strapiGet<TStrapiSingleResponse<TStrapiProjectsPage>>('projects-page', {
      locale,
      deepPopulate: true,
    }),
    strapiGet<TStrapiListResponse<{ title: string }>>('projects', {
      locale,
      query: {
        fields: ['title'],
        pagination: {
          pageSize: 100,
        },
      },
    }),
  ])

  ensureBestTranslation(project, 'projects', locale)

  if (!projects.length) return notFound()
  //  const [prevProject, nextProject] = getSurroundingItems(project, projects)
  const linkProjects = '/' + locale + '/projects'

  return (
    <>
      <div className="text-h1-title container">
        <div className="py-12 font-sans text-[16px]">
          <Link
            href={linkProjects}
            title="Music Projects"
            className="breadcrumps-link"
          >
            Music Projects
          </Link>
          <span className="px-4">&#x1F784;</span>
          {project.attributes.title}
        </div>
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

      <div>
        <div className="container flex flex-col-reverse justify-between gap-8 pb-8 lg:gap-8 lg:space-y-8 lg:pb-12">
          <div className="mx-auto space-y-8 lg:w-[calc(960*100%/1152)] ">
            <h2 className="font-sans rem:text-[40px] rem:leading-[50px]">
              {project.attributes.title}
            </h2>
            <p className="whitespace-pre-wrap rem:text-[16px] rem:leading-[20.08px]">
              {project.attributes.content}
            </p>
          </div>
          <div className="mx-auto grid grid-cols-2 gap-4 lg:w-[calc(960*100%/1152)] lg:gap-8 ">
            <div className="relative col-span-2 aspect-[542/305]">
              <Image
                {...extractImageAttrs(project.attributes.coverImage)}
                className="object-cover"
                alt=""
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
  }).then((projects) =>
    projects.map((project) => ({
      slug: project.id.toString(),
      locale: project.attributes.locale,
    })),
  )
}

export const generateMetadata = async ({
  params: { slug, locale },
}: {
  params: { slug: string; locale: TLocale }
}): Promise<Metadata> => {
  const project = await strapiGet<TStrapiSingleResponse<TStrapiProject>>(
    `projects/${slug}`,
    { query: { populate: 'seo' }, locale },
  ).catch(() => notFound())

  return {
    ...project.attributes.seo,
    alternates: {
      canonical: `/${project.attributes.locale}/projects/${project.id}`,
    },
  }
}
