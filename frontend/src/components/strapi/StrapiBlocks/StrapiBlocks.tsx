import { Quote } from '@/components/strapi/blocks/Quote/Quote'
import { TStrapiBlock } from '@/data/strapi/types/common/blocks'

export const StrapiBlocks = ({ blocks }: { blocks: TStrapiBlock[] }) => {
  return blocks.map((block) => {
    switch (block.__component) {
      case 'block.quote':
        return (
          <Quote text={block.text as string} author={block.author as string} />
        )
      default:
        return <div>Unsupported block: {block.__component}</div>
    }
  })
}
