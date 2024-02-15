import { Quote } from '@/components/strapi/blocks/Quote/Quote'

export type TBlockComponent = string
export type TStrapiBlock = {
  id: number
  __component: TBlockComponent
} & Record<string, any>

export const StrapiBlocks = ({blocks}: { blocks: TStrapiBlock[] }) => {
  return blocks.map((block) => {
    switch (block.__component) {
      case 'block.quote':
        return <Quote text={block.text as string} author={block.author as string}/>
      default:
        return <div>Unsupported block: {block.__component}</div>
    }
  })
}
