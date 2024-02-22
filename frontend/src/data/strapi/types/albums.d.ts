import { TStrapiImageField } from '@/data/strapi/types/common/api'
import { TStrapiSeoComponent } from '@/data/strapi/types/common/seo'

export type TStrapiAlbum = {
  title: string
  description: string
  videoUrl: string
  buyUrl: string
  cover: TStrapiImageField
}

export type TStrapiDiscographyPage = {
  backgroundImage: TStrapiImageField
  seo: TStrapiSeoComponent
}
