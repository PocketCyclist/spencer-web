import { TStrapiImageAttachmentEntity } from '@/data/strapi/types/common/api'

export type TBlockComponent =
  | 'block.quote'
  | 'block.logo-hero'
  | 'block.video'
  | 'block.about'
type TBlockCommon = {
  id: number
  __component: TBlockComponent
}

type TBlockQuote = {
  __component: 'block.quote'
  text: string
  author: string
} & TBlockCommon

type TBlockLogoHero = {
  __component: 'block.logo-hero'
  backgroundImage: {
    data: TStrapiImageAttachmentEntity
  }
} & TBlockCommon

type TBlockVideo = {
  __component: 'block.video'
  url: string
} & TBlockCommon

type TBlockAbout = {
  __component: 'block.about'
  title: string
  description: string
  quote: string
  author: string
} & Record<'firstImage' | 'secondImage', { data: TStrapiImageAttachmentEntity }>

export type TStrapiBlock =
  | TBlockQuote
  | TBlockLogoHero
  | TBlockVideo
  | TBlockAbout
