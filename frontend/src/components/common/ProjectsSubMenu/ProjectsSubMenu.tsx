import { TStrapiListResponse } from '@/data/strapi/types/common/api'
import { strapiGet } from '@/data/strapi/common'

export async function getServerSideProps() {
  const locale = 'en' // Здесь выберите нужный язык локализации
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

  return {
    props: {
      projects: projects,
    },
  }
}
