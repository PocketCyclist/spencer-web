import { TStrapiSeoComponent } from '@/data/strapi/types/common/seo'
import {
  TStrapiImageField,
  TStrapiImagesField,
} from '@/data/strapi/types/common/api'
import { TStrapiProjectMediaItem } from '@/data/strapi/types/projects'

export type TStrapiEvent = {
  title: string
  description: string
  date: string
  buyUrl: string
  images: TStrapiImagesField
  promoImage: TStrapiImageField
  media: TStrapiProjectMediaItem[]
  seo: TStrapiSeoComponent
}

export type TStrapiEventsPage = {
  title: string
  description: string
  heroImage: TStrapiImageField
  seo: TStrapiSeoComponent
}
