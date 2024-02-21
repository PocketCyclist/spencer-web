export type TBlockComponent = 'block.quote' | 'block.logo-hero' | 'block.video'
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
    data: {
      attributes: {
        url: string
      }
    }
  }
} & TBlockCommon

type TBlockVideo = {
  __component: 'block.video'
  url: string
} & TBlockCommon

export type TStrapiBlock = TBlockQuote | TBlockLogoHero | TBlockVideo
