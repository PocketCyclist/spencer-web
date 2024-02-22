import {
  TStrapiEntity,
  TStrapiImageField,
} from '@/data/strapi/types/common/api'

export type TStrapiAlbum = {
  title: string
  description: string
  videoUrl: string
  buyUrl: string
  cover: TStrapiImageField
}
