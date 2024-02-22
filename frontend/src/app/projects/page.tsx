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
  const [pageData, projects] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiProjectsPage>>('projects-page'),
    strapiGet<TStrapiListResponse<TStrapiProject>>('projects'),
  ])
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
