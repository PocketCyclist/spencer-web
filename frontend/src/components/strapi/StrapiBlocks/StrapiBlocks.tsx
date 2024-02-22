import { About } from '@/components/strapi/blocks/About/About'
import { BigEvent } from '@/components/strapi/blocks/BigEvent/BigEvent'
import { Event } from '@/components/strapi/blocks/Event/Event'
import { LogoHero } from '@/components/strapi/blocks/LogoHero/LogoHero'
import { Quote } from '@/components/strapi/blocks/Quote/Quote'
import { Video } from '@/components/strapi/blocks/Video/Video'
import { TStrapiImageAttachmentEntity } from '@/data/strapi/types/common/api'
import { TStrapiBlock } from '@/data/strapi/types/common/blocks'

const extractImageAttrs = (
  attrs: TStrapiImageAttachmentEntity['attributes'],
) => ({
  alt: attrs.alternativeText,
  src: attrs.url,
})

export const StrapiBlocks = ({ blocks }: { blocks: TStrapiBlock[] }) => {
  return blocks.map((block) => {
    switch (block.__component) {
      case 'block.quote':
        return <Quote text={block.text} author={block.author} />
      case 'block.logo-hero':
        return <LogoHero bgSrc={block.backgroundImage.data.attributes.url} />
      case 'block.video':
        return <Video src={block.url} />
      case 'block.about':
        return (
          <About
            title={block.title}
            description={block.description}
            quote={block.quote}
            author={block.author}
            firstImage={extractImageAttrs(block.firstImage.data.attributes)}
            secondImage={extractImageAttrs(block.secondImage.data.attributes)}
          />
        )
      case 'block.big-event':
        return (
          <BigEvent
            heading={block.heading}
            description={block.description}
            // videoPoster={extractImageAttrs(block.videoPoster.data.attributes)}
            videoSrc={block.videoUrl}
          />
        )
      case 'block.event':
        return (
          <Event
            heading={block.heading}
            description={block.description}
            image={extractImageAttrs(block.image.data.attributes)}
          />
        )
      default:
        return (
          <div>
            Unsupported block: {(block as { __component: string }).__component}
          </div>
        )
    }
  })
}
