import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { notFound } from 'next/navigation'
import { TStrapiEvent } from '@/data/strapi/types/events'

const Event = async ({ params: { slug } }: { params: { slug: string } }) => {
  const event = await strapiGet<TStrapiSingleResponse<TStrapiEvent>>(
    `events/${slug}`,
  ).catch(() => notFound())

  return (
    <>
      <div className="my-4 bg-amber-50">
        <pre>{JSON.stringify(event, null, 2)}</pre>
      </div>
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
