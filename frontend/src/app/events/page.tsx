import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiEvent, TStrapiEventsPage } from '@/data/strapi/types/events'

const Events = async () => {
  const pageData =
    await strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>('events-page')
  const events = await strapiGet<TStrapiListResponse<TStrapiEvent>>('events')
  console.log(pageData, events)

  return (
    <>
      <div className="my-4 bg-cyan-50">
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
      </div>
      {events.map((event) => (
        <div key={event.id} className="my-4 bg-amber-50">
          <pre>{JSON.stringify(event, null, 2)}</pre>
        </div>
      ))}
    </>
  )
}

export default Events
