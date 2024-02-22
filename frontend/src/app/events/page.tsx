import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiEvent, TStrapiEventsPage } from '@/data/strapi/types/events'
import { getTodayDate } from '@/data/strapi/utils/date'

const Events = async () => {
  const today = getTodayDate()
  const [pageData, futureEvents, pastEvents] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>('events-page'),
    strapiGet<TStrapiListResponse<TStrapiEvent>>('events', {
      deepPopulate: true,
      query: {
        filters: {
          date: { $gte: today },
        },
      },
    }),
    strapiGet<TStrapiListResponse<TStrapiEvent>>('events', {
      deepPopulate: true,
      query: {
        filters: {
          date: { $lt: today },
        },
      },
    }),
  ])
  console.log({ pageData, futureEvents, pastEvents })

  return (
    <>
      <div className="my-4 bg-cyan-50">
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
      </div>
      <div>future events:</div>
      {futureEvents.map((event) => (
        <div key={event.id} className="my-4 bg-amber-50">
          <pre>{JSON.stringify(event, null, 2)}</pre>
        </div>
      ))}
      <hr />
      <div>past events:</div>
      {pastEvents.map((event) => (
        <div key={event.id} className="my-4 bg-amber-50">
          <pre>{JSON.stringify(event, null, 2)}</pre>
        </div>
      ))}
    </>
  )
}

export default Events
