import { TStrapiSeoComponent } from '@/data/strapi/types/common/seo'
import { TStrapiImageField } from '@/data/strapi/types/common/api'

type TStrapiProjectMediaItemCommon = {
  id: number
  __component: 'component.image' | 'component.video'
}

type TStrapiProjectMediaItemImage = {
  __component: 'component.image'
  image: TStrapiImageField
} & TStrapiProjectMediaItemCommon

type TStrapiProjectMediaItemVideo = {
  __component: 'component.video'
  url: string
  previewImage: TStrapiImageField
} & TStrapiProjectMediaItemCommon

export type TStrapiProjectMediaItem =
  | TStrapiProjectMediaItemImage
  | TStrapiProjectMediaItemVideo

export type TStrapiProject = {
  title: string
  content: string
  coverImage: TStrapiImageField
  seo: TStrapiSeoComponent
  media: TStrapiProjectMediaItem[]
}

export type TStrapiProjectsPage = {
  title: string
  heroImage: TStrapiImageField
  seo: TStrapiSeoComponent
}
