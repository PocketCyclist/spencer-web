import { TStrapiSeoComponent } from '@/data/strapi/types/common/seo'
import {
  TStrapiImageField,
  TStrapiImagesField,
} from '@/data/strapi/types/common/api'

export type TStrapiEvent = {
  title: string
  description: string
  date: string
  buyUrl: string
  images: TStrapiImagesField
  promoImage: TStrapiImageField
  seo: TStrapiSeoComponent
}

export type TStrapiEventsPage = {
  title: string
  description: string
  heroImage: TStrapiImageField
  seo: TStrapiSeoComponent
}
