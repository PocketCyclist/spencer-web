import { TStrapiListResponse } from '@/data/strapi/types/common/api'
import { strapiGet } from '@/data/strapi/common'

export async function getProjectsMenuProps(locale: string) {
  const [projects] = await Promise.all([
    strapiGet<
      TStrapiListResponse<{
        title: string
      }>
    >('projects', {
      locale,
      query: {
        fields: ['title'],
        pagination: {
          pageSize: 100,
        },
      },
    }),
  ])

  const mapped_projects = projects.map((project) => ({
    id: project.id,
    title: project.attributes.title,
  }))

  return mapped_projects
}
