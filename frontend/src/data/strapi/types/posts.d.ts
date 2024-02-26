import { TStrapiSeoComponent } from '@/data/strapi/types/common/seo'
import {
  TStrapiImageField,
  TStrapiImagesField,
} from '@/data/strapi/types/common/api'
import { TStrapiProjectMediaItem } from '@/data/strapi/types/projects'

export type TStrapiPost = {
  title: string
  promoText: string
  content: string
  promoImage: TStrapiImageField
  seo: TStrapiSeoComponent
  publishedAt: string
  media: TStrapiProjectMediaItem[]
}

export type TStrapiNewsPage = {
  title: string
  description: string
  heroImage: TStrapiImageField
  seo: TStrapiSeoComponent
}
