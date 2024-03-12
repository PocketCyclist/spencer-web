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

export type TStrapiFAQItem = {
  id: number
  question: string
  answer: string
}

export type TStrapiReview = {
  id: number
  text: string
  author: string
  coverImage: TStrapiImageField
}

type TStrapiAboutSlide = {
  id: number
  heading: string
  description: string
  coverImage: TStrapiImageField
}
