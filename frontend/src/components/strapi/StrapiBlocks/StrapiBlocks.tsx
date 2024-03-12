import { About } from '@/components/strapi/blocks/About/About'
import { BigEvent } from '@/components/strapi/blocks/BigEvent/BigEvent'
import { Cymbal } from '@/components/strapi/blocks/Cymbal/Cymbal'
import { Event } from '@/components/strapi/blocks/Event/Event'
import { LogoHero } from '@/components/strapi/blocks/LogoHero/LogoHero'
import { Quote } from '@/components/strapi/blocks/Quote/Quote'
import { Video } from '@/components/strapi/blocks/Video/Video'
import { TStrapiBlock } from '@/data/strapi/types/common/blocks'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { CourseOverview } from '@/components/strapi/blocks/CourseOverview/CourseOverview'
import { MegaCymbal } from '@/components/strapi/blocks/MegaCymbal/MegaCymbal'
import { CourseHero } from '@/components/strapi/blocks/CourseHero/CourseHero'

export const StrapiBlocks = ({ blocks }: { blocks: TStrapiBlock[] }) => {
  return blocks.map((block) => {
    switch (block.__component) {
      case 'block.quote':
        return <Quote text={block.text} author={block.author} />
      case 'block.logo-hero':
        return <LogoHero bgImage={extractImageAttrs(block.backgroundImage)} />
      case 'block.video':
        return (
          <Video
            poster={extractImageAttrs(block.video.previewImage)}
            src={block.video.url}
          />
        )
      case 'block.about':
        return (
          <About
            title={block.title}
            description={block.description}
            quote={block.quote}
            author={block.author}
            firstImage={extractImageAttrs(block.firstImage)}
            secondImage={extractImageAttrs(block.secondImage)}
          />
        )
      case 'block.big-event':
        return (
          <BigEvent
            heading={block.heading}
            description={block.description}
            videoPoster={extractImageAttrs(block.video.previewImage)}
            videoSrc={block.video.url}
          />
        )
      case 'block.event':
        return (
          <Event
            heading={block.heading}
            description={block.description}
            image={extractImageAttrs(block.image)}
          />
        )
      case 'block.cymbal':
        return <Cymbal right={block.right} />
      case 'block.animated-hero':
        return (
          <CourseHero
            title={block.title}
            subtitle={block.subtitle}
            buyUrl={block.buyUrl}
            buyText={block.buyText}
          />
        )
      case 'block.course-overview':
        return (
          <CourseOverview
            title={block.title}
            stats={block.stats}
            sections={block.sections}
            moreText={block.moreText}
            initialSections={block.initialSections}
          />
        )
      case 'block.mega-cymbal':
        return (
          <MegaCymbal heading={block.heading} description={block.description} />
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
