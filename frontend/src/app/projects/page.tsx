import Image from 'next/image'
import { notFound } from 'next/navigation'

import { SmallMediaImage } from '@/app/projects/components/SmallMediaImage/SmallMediaImage'
import { Hero } from '@/components/common/Hero/Hero'
import { PlayButton } from '@/components/ui/PlayButton/PlayButton'
import { PrevNextNavigation } from '@/components/common/PrevNextNavigation/PrevNextNavigation'
import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'
import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import {
  TStrapiProject,
  TStrapiProjectsPage,
} from '@/data/strapi/types/projects'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { getSurroundingItems } from '@/data/strapi/utils/surroundingItems'

const Projects = async () => {
  const [pageData, projects] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiProjectsPage>>('projects-page'),
    strapiGet<TStrapiListResponse<{ title: string }>>('projects', {
      query: {
        fields: ['title'],
      },
    }),
  ])

  if (!projects.length) return notFound()
  const project = await strapiGet<TStrapiSingleResponse<TStrapiProject>>(
    `projects/${projects[0].id}`,
  )
  const [prevProject, nextProject] = getSurroundingItems(project, projects)

  return (
    <>
      <Hero
        bgImage={extractImageAttrs(pageData.attributes.heroImage)}
        title={pageData.attributes.title}
      />

      <PrevNextNavigation
        prev={
          prevProject
            ? { title: prevProject?.attributes.title, url: '#' }
            : undefined
        }
        next={
          nextProject
            ? { title: nextProject.attributes.title, url: '#' }
            : undefined
        }
      />

      <div>
        <div className="py-16 space-y-12 container lg:py-28 lg:space-y-0 lg:flex lg:flex-row-reverse lg:justify-between">
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
                        <PlayButton className="rem:size-[56px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:rem:size-[80px]" />
                      }
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
