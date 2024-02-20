export type TBlockComponent = 'block.quote' | 'block.logo-hero'
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

export type TStrapiBlock = TBlockQuote | TBlockLogoHero
