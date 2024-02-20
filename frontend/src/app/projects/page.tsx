import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import {
  TStrapiProject,
  TStrapiProjectsPage,
} from '@/data/strapi/types/projects'

const Projects = async () => {
  const pageData =
    await strapiGet<TStrapiSingleResponse<TStrapiProjectsPage>>('projects-page')
  const projects = await strapiGet<TStrapiListResponse<TStrapiProject>>(
    'projects',
    {
      query: {
        populate: '*', // TODO: deep is not working for projects resource?
      },
    },
  )
  console.log(pageData, projects)

  return (
    <>
      <div className="my-4 bg-cyan-50">
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
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
