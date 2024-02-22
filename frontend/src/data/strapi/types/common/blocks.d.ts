import {
  TStrapiImageAttachmentEntity,
  TStrapiImageField,
} from '@/data/strapi/types/common/api'

export type TBlockComponent =
  | 'block.quote'
  | 'block.logo-hero'
  | 'block.video'
  | 'block.about'
  | 'block.big-event'
  | 'block.event'
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
  backgroundImage: TStrapiImageField
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
  firstImage: TStrapiImageField
  secondImage: TStrapiImageField
} & TBlockCommon

type TBlockBigEvent = {
  __component: 'block.big-event'
  heading: string
  description: string
  videoPoster: TStrapiImageField
  videoUrl: string
} & TBlockCommon

type TBlockEvent = {
  __component: 'block.event'
  heading: string
  description: string
  image: TStrapiImageField
} & TBlockCommon

export type TStrapiBlock =
  | TBlockQuote
  | TBlockLogoHero
  | TBlockVideo
  | TBlockAbout
  | TBlockBigEvent
  | TBlockEvent
