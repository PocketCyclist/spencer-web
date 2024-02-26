import Link from 'next/link'

import { Hero } from '@/components/common/Hero/Hero'
import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiEvent, TStrapiEventsPage } from '@/data/strapi/types/events'
import { getTodayDate } from '@/data/strapi/utils/date'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { EventCard } from '@/components/common/EventCard/EventCard'
import { Cymbal } from '@/components/strapi/blocks/Cymbal/Cymbal'
import { cn } from '@/lib/cn'

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

  return (
    <>
      <Hero
        bgImage={extractImageAttrs(pageData.attributes.heroImage)}
        // contentAdditionalComponent={
        //   <Link
        //     className="underline underline-offset-2 hover:no-underline max-w-fit"
        //     href="#"
        //     title="Details"
        //   >
        //     Details
        //   </Link>
        // }
        title={pageData.attributes.title}
        description={pageData.attributes.description}
      />

      <div className="py-16 space-y-16 lg:py-28 lg:space-y-[7.375rem]">
        <section>
          <div className="container">
            <div className="2xl:rem:max-w-[820px]">
              <h2 className="mb-10 font-serif rem:text-[40px] rem:leading-[49.44px] lg:rem:text-[64px] lg:rem:leading-[79.1px]">
                Upcoming events
              </h2>
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-y-12 sm:gap-x-8 md:grid-cols-3 md:gap-y-16">
                {futureEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    date={event.attributes.date}
                    image={extractImageAttrs(event.attributes.promoImage)}
                    title={event.attributes.title}
                    description={event.attributes.description}
                    url={`/events/${event.id}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <Cymbal className="!mt-0 [&>*]:-mt-8" right />
        <section>
          <div className="container">
            <div className="2xl:rem:max-w-[820px]">
              <h2 className="mb-10 font-serif rem:text-[40px] rem:leading-[49.44px] lg:rem:text-[64px] lg:rem:leading-[79.1px]">
                Past events
              </h2>
              <div
                className={cn(
                  'sm:grid sm:grid-cols-2 sm:gap-y-12 sm:gap-x-8 sm:overflow-x-visible md:grid-cols-3 md:gap-y-16',
                  pastEvents.length > 1 &&
                    '-mx-4 px-4 flex snap-x snap-mandatory overflow-x-auto no-scrollbar',
                )}
              >
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className={pastEvents.length > 1 ? 'pl-4' : undefined}
                  >
                    <EventCard
                      className={
                        pastEvents.length > 1 ? 'w-[252px]' : undefined
                      }
                      date={event.attributes.date}
                      dateType="past"
                      image={extractImageAttrs(event.attributes.promoImage)}
                      title={event.attributes.title}
                      description={event.attributes.description}
                      url={`/events/${event.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <div className="my-4 bg-cyan-50">
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
      ))} */}
    </>
  )
}

export default Events
