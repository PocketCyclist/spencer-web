import { TStrapiSeoComponent } from '@/data/strapi/types/common/seo'
import { TStrapiBlock } from '@/data/strapi/types/common/blocks'
import { TStrapiData, TStrapiImageField } from '@/data/strapi/types/common/api'

export type TStrapiCoursePromoPage = {
  seo: TStrapiSeoComponent
  blocks: TStrapiBlock[]
}

export type TStrapiStat = {
  id: number
  value: string
  label: string
}

export type TStrapiCourseSection = {
  id: number
  title: string
  length: string
  previewMedia: TStrapiImageField | TStrapiData<null>
}
