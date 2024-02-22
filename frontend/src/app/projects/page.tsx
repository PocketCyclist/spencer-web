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
      <div className="my-4 bg-cyan-50">
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
      </div>
      <div className="my-4 bg-amber-100">
        <pre>{JSON.stringify({ prevProject, nextProject }, null, 2)}</pre>
      </div>
      <div className="my-4 bg-cyan-100">
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </div>
      {projects.map((project) => (
        <div key={project.id} className="my-4 bg-amber-50">
          <pre>{JSON.stringify(project, null, 2)}</pre>
        </div>
      ))}
    </>
  )
}

export default Projects
