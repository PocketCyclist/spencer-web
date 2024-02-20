import { TStrapiSeoComponent } from '@/data/strapi/types/common/seo'
import {
  TStrapiEntity,
  TStrapiImageField,
} from '@/data/strapi/types/common/api'

export type TStrapiProject = TStrapiEntity<{
  title: string
  content: string
  coverImage: TStrapiImageField
  seo: TStrapiSeoComponent
}>

export type TStrapiProjectsPage = {
  title: string
  heroImage: TStrapiImageField
  seo: TStrapiSeoComponent
}
