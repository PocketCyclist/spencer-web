import { LogoHero } from '@/components/strapi/blocks/LogoHero/LogoHero'
import { Quote } from '@/components/strapi/blocks/Quote/Quote'
import { TStrapiBlock } from '@/data/strapi/types/common/blocks'

export const StrapiBlocks = ({ blocks }: { blocks: TStrapiBlock[] }) => {
  return blocks.map((block) => {
    switch (block.__component) {
      case 'block.quote':
        return <Quote text={block.text} author={block.author} />
      case 'block.logo-hero':
        return <LogoHero bgSrc={block.backgroundImage.data.attributes.url} />
      default:
        return (
          <div>
            Unsupported block: {(block as { __component: string }).__component}
          </div>
        )
    }
  })
}
