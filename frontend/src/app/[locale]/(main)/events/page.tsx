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
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TLocale, TParamsWithLocale } from '@/navigation'

const Events = async ({ params: { locale } }: TParamsWithLocale) => {
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

  const featuredEvent = futureEvents[futureEvents.length - 1]

  return (
    <>
      <Hero
        bgImage={extractImageAttrs(
          featuredEvent
            ? featuredEvent.attributes.promoImage
            : pageData.attributes.heroImage,
        )}
        title={
          featuredEvent
            ? featuredEvent.attributes.title
            : pageData.attributes.title
        }
        description={
          featuredEvent
            ? featuredEvent.attributes.promoText
            : pageData.attributes.description
        }
        contentAdditionalComponent={
          featuredEvent ? (
            <Link
              className="max-w-fit underline underline-offset-2 hover:no-underline"
              href={`/events/${featuredEvent.id}`}
              title="Details"
            >
              details
            </Link>
          ) : undefined
        }
      />

      <div className="space-y-16 py-16 lg:space-y-[7.375rem] lg:py-28">
        <section>
          <div className="container">
            <div className="2xl:rem:max-w-[820px]">
              <h2 className="mb-10 font-serif rem:text-[40px] rem:leading-[49.44px] lg:rem:text-[64px] lg:rem:leading-[79.1px]">
                Upcoming events
              </h2>
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 md:gap-y-16">
                {futureEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    date={event.attributes.date}
                    image={extractImageAttrs(event.attributes.promoImage)}
                    title={event.attributes.title}
                    description={event.attributes.promoText}
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
                  'sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:overflow-x-visible md:grid-cols-3 md:gap-y-16',
                  pastEvents.length > 1 &&
                    '-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 no-scrollbar',
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
                      description={event.attributes.promoText}
                      url={`/events/${event.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
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
