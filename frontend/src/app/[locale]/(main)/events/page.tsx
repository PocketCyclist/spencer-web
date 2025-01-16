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
import { LogoHeroNoLogo } from '@/components/strapi/blocks/LogoHeroNoLogo/LogoHeroNoLogo'
import EventsList from '@/components/common/EventsList/EventsList'

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
  const featuredEvent = pastEvents[0] // заменить на futureEvents
  //const listEvents = past == '1' ? pastEvents : futureEvents
  const listEvents = past == '1' ? pastEvents : pastEvents
  const titleEvents = past == '1' ? 'Events archive' : 'Upcoming events'
  const linkEvents =
    past == '1' ? '/' + locale + '/events/' : '/' + locale + '/events?past=1'
  const linkEventsTitle = past == '1' ? 'Upcoming events' : 'Events archive'

  return (
    <>
      <section className="relative flex flex-col items-center justify-center ">
        <div className="text-h1-title container  mx-auto ">
          <h2 className="py-12 font-serif rem:text-[40px] rem:leading-[49.44px] md:py-24 lg:rem:text-[64px] lg:rem:leading-[79.1px]">
            {titleEvents}
          </h2>
        </div>
      </section>

      {past !== '1' && (
        <>
          <LogoHeroNoLogo
            bgImage={{
              alt: '',
              src: featuredEvent.attributes.promoImage.data.attributes.url,
            }}
          ></LogoHeroNoLogo>
          <div className="rem:pb-[20px] lg:rem:pb-[80px]">&nbsp;</div>
        </>
      )}
      <section className="relative mx-auto  flex w-full max-w-[1500px] flex-col items-center rem:pb-[88px] ">
        <EventsList events={listEvents} />
        <div className="w-full  px-4 text-left  rem:mt-[42px] lg:px-10">
          <Link href={linkEvents} className=" underline underline-offset-2">
            {linkEventsTitle}
          </Link>
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
