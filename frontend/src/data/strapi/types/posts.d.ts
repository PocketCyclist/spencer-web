import { TStrapiSeoComponent } from '@/data/strapi/types/common/seo'
import {
  TStrapiImageField,
  TStrapiImagesField,
} from '@/data/strapi/types/common/api'

export type TStrapiPost = {
  title: string
  promoText: string
  content: string
  promoImage: TStrapiImageField
  images: TStrapiImagesField
  seo: TStrapiSeoComponent
  publishedAt: string
}

export type TStrapiNewsPage = {
  title: string
  description: string
  heroImage: TStrapiImageField
  seo: TStrapiSeoComponent
}
