import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { notFound } from 'next/navigation'
import { TStrapiEvent } from '@/data/strapi/types/events'
import { parseDateToWords } from '@/data/strapi/utils/date'
import { MediaSlider } from '@/components/ui/Slider/MediaSlider'
import { Button } from '@/components/ui/Button/Button'
import { Cymbal } from '@/components/strapi/blocks/Cymbal/Cymbal'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'

const Event = async ({ params: { slug } }: { params: { slug: string } }) => {
  const event = await strapiGet<TStrapiSingleResponse<TStrapiEvent>>(
    `events/${slug}`,
  ).catch(() => notFound())

  const parsedDate = parseDateToWords(event.attributes.date, true)

  return (
    <>
      <section className="container pt-12">
        <h1 className="mb-2 whitespace-pre-wrap font-serif rem:text-[48px] rem:leading-[59.33px] lg:rem:text-[88px] lg:rem:leading-[108.77px]">
          {event.attributes.title}
        </h1>
        <h3 className="mb-12">
          {parsedDate.dayOfWeek} {parsedDate.date}
        </h3>
        <MediaSlider media={event.attributes.media} />
        <p className="mt-[88px] mb-12 whitespace-pre-wrap rem:text-[20px] rem:leading-[25.1px]">
          {event.attributes.description}
        </p>
        <Button asChild className="sm:flex-1" variant="primary">
          <Link
            href={event.attributes.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy
          </Link>
        </Button>
      </section>
      <Cymbal right={true} />
    </>
  )
}

export default Event

export const generateStaticParams = async () => {
  return strapiGet<TStrapiListResponse<TStrapiEvent>>('events').then((events) =>
    events.map((event) => ({
      slug: event.id.toString(),
    })),
  )
}

export const generateMetadata = async (
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const slug = params.slug

  const event = await strapiGet<TStrapiSingleResponse<TStrapiEvent>>(
    `events/${slug}`,
    {
      query: {
        populate: 'seo',
      },
    },
  ).catch(() => notFound())

  return {
    // ...((await parent) as Metadata),
    ...event.attributes.seo,
  }
}
