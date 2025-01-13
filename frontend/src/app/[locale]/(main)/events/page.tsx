import { strapiGet } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { TStrapiEvent, TStrapiEventsPage } from '@/data/strapi/types/events'
import { getTodayDate } from '@/data/strapi/utils/date'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { EventCard } from '@/components/common/EventCard/EventCard'

import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TLocale, TParamsWithLocale } from '@/navigation'
import { Button } from '@/components/ui/Button/Button'

const Events = async ({ params, searchParams }: TParamsWithLocale) => {
  const { locale } = params
  const { past } = searchParams
  unstable_setRequestLocale(locale)

  const today = getTodayDate()

  const [pageData, futureEvents, pastEvents] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>('events-page', {
      locale,
      deepPopulate: true,
    }),
    strapiGet<TStrapiListResponse<TStrapiEvent>>('events', {
      locale,
      query: {
        populate: 'deep',
        filters: {
          date: { $gte: today },
        },
        sort: 'date:desc',
        pagination: {
          pageSize: 100,
        },
      },
    }),
    strapiGet<TStrapiListResponse<TStrapiEvent>>('events', {
      locale,
      query: {
        populate: 'deep',
        filters: {
          date: { $lt: today },
        },
        sort: 'date:desc',
        pagination: {
          pageSize: 100,
        },
      },
    }),
  ])

  // const featuredEvent = futureEvents[futureEvents.length - 1]
  const featuredEvent = pastEvents[pastEvents.length - 1] // заменить на futureEvents

  const listEvents = past == '1' ? pastEvents : futureEvents
  const titleEvents = past == '1' ? 'Events archive' : 'Upcoming events'
  const linkEvents =
    past == '1' ? '/' + locale + '/events/' : '/' + locale + '/events?past=1'
  const linkEventsTitle = past == '1' ? 'Upcoming events' : 'Events archive'

  return (
    <>
      <section className="relative flex min-h-screen-minus-mobile-header flex-col items-center justify-center rem:pb-[88px]  lg:min-h-screen-minus-header">
        <div className="px-10 2xl:rem:max-w-[1700px]">
          <div className="text-h1-title container">
            <h2 className="py-12 font-serif rem:text-[40px] rem:leading-[49.44px] md:py-24 lg:rem:text-[64px] lg:rem:leading-[79.1px]">
              {titleEvents}
            </h2>
          </div>

          <div className="flex flex-col ">
            {listEvents.map((event) => (
              <div key={event.id}>
                <EventCard
                  className={listEvents.length > 1 ? 'event_item' : undefined}
                  date={event.attributes.date}
                  dateType="past"
                  image={extractImageAttrs(event.attributes.promoImage)}
                  title={event.attributes.title}
                  description={event.attributes.promoText}
                  url={`/events/${event.id}`}
                />
              </div>
            ))}
            <Button className="mt-4" variant={'light'}>
              Show more
            </Button>
            <div className="rem:mt-[42px]">
              <Link href={linkEvents} className="underline underline-offset-2">
                {linkEventsTitle}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Events

export const generateMetadata = async ({
  params: { locale },
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> => {
  const page = await strapiGet<TStrapiSingleResponse<TStrapiEventsPage>>(
    `events-page`,
    { query: { populate: 'seo', locale } },
  ).catch(() => notFound())

  return {
    ...page.attributes.seo,
  }
}
