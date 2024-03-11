import {
  TStrapiImageAttachmentEntity,
  TStrapiImageField,
} from '@/data/strapi/types/common/api'
import { TStrapiCourseSection, TStrapiStat } from '@/data/strapi/types/course'

export type TBlockComponent =
  | 'block.quote'
  | 'block.logo-hero'
  | 'block.video'
  | 'block.about'
  | 'block.big-event'
  | 'block.event'
  | 'block.cymbal'
  | 'block.course-overview'
  | 'block.mega-cymbal'

export type TStrapiBlock =
  | TBlockQuote
  | TBlockLogoHero
  | TBlockVideo
  | TBlockAbout
  | TBlockBigEvent
  | TBlockEvent
  | TBlockCymbal
  | TBlockCourseOverview
  | TBlockMegaCymbal

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
  video: {
    url: string
    previewImage: TStrapiImageField
  }
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
  video: {
    url: string
    previewImage: TStrapiImageField
  }
} & TBlockCommon

type TBlockEvent = {
  __component: 'block.event'
  heading: string
  description: string
  image: TStrapiImageField
} & TBlockCommon

type TBlockCymbal = {
  __component: 'block.cymbal'
  right: boolean // ignore it
} & TBlockCommon

type TBlockCourseOverview = {
  __component: 'block.course-overview'
  title: string
  stats: TStrapiStat[]
  sections: TStrapiCourseSection[]
} & TBlockCommon

type TBlockMegaCymbal = {
  __component: 'block.mega-cymbal'
  heading: string
  description: string
} & TBlockCommon
