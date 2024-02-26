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

const Event = async ({ params: { slug } }: { params: { slug: string } }) => {
  const event = await strapiGet<TStrapiSingleResponse<TStrapiEvent>>(
    `events/${slug}`,
  ).catch(() => notFound())

  const parsedDate = parseDateToWords(event.attributes.date, true)

  console.log(event.attributes.media)
  return (
    <>
      <section className="container pt-12">
        <h1 className="mb-2 whitespace-pre-wrap font-serif rem:text-[48px] rem:leading-[59.33px] lg:rem:text-[88px] lg:rem:leading-[108.77px]">
          {event.attributes.title}
        </h1>
        <h3 className="mb-12">
          {parsedDate.date} {parsedDate.dayOfWeek}
        </h3>
        <MediaSlider media={event.attributes.media} />
        <p className="mt-[88px] mb-12 whitespace-pre-wrap rem:text-[16px] rem:leading-[20.08px]">
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
