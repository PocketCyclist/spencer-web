import { strapiGet, strapiGetAllLocales } from '@/data/strapi/common'
import {
  TStrapiListResponse,
  TStrapiSingleResponse,
} from '@/data/strapi/types/common/api'
import { notFound } from 'next/navigation'
import { TStrapiEvent } from '@/data/strapi/types/events'
import { getTodayDate, parseDateToWords } from '@/data/strapi/utils/date'
import { MediaSlider } from '@/components/ui/Slider/MediaSlider'
import { Button } from '@/components/ui/Button/Button'
import { Cymbal } from '@/components/strapi/blocks/Cymbal/Cymbal'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import { cn } from '@/lib/cn'
import { EventCard } from '@/components/common/EventCard/EventCard'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { ArrowRightSmallIcon } from '@/icons'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TLocale } from '@/navigation'

const Event = async ({
  params: { slug, locale },
}: {
  params: { slug: string; locale: TLocale }
}) => {
  unstable_setRequestLocale(locale)

  const [event, otherEvents] = await Promise.all([
    strapiGet<TStrapiSingleResponse<TStrapiEvent>>(`events/${slug}`).catch(() =>
      notFound(),
    ),
    strapiGet<TStrapiListResponse<TStrapiEvent>>('events', {
      query: {
        populate: 'promoImage',
        filters: {
          date: { $gte: getTodayDate() },
        },
        sort: 'date:asc',
        pagination: {
          pageSize: 4,
        },
      },
    })
      .then((events) =>
        events.filter((event) => event.id.toString() !== slug).slice(0, 3),
      )
      .then(async (futureEvents) => {
        if (futureEvents.length < 3) {
          const pastEvents = await strapiGet<TStrapiListResponse<TStrapiEvent>>(
            'events',
            {
              query: {
                populate: 'promoImage',
                filters: {
                  date: { $lt: getTodayDate() },
                },
                sort: 'date:desc',
                pagination: {
                  pageSize: 4,
                },
              },
            },
          ).then((events) =>
            events.filter((event) => event.id.toString() !== slug),
          )
          return [...futureEvents, ...pastEvents].slice(0, 3)
        } else {
          return futureEvents
        }
      }),
  ])

  const parsedDate = parseDateToWords(event.attributes.date, true)

  return (
    <>
      <section className="container py-[88px]">
        <h1 className="mb-2 whitespace-pre-wrap font-serif rem:text-[48px] rem:leading-[59.33px] lg:rem:text-[88px] lg:rem:leading-[108.77px]">
          {event.attributes.title}
        </h1>
        <h3 className="mb-12">
          {parsedDate.dayOfWeek} {parsedDate.date}
        </h3>
        <MediaSlider media={event.attributes.media} />
        <p className="mb-12 mt-[88px] whitespace-pre-wrap rem:text-[20px] rem:leading-[25.1px]">
          {event.attributes.description}
        </p>
        {event.attributes.buyUrl && (
          <Button asChild className="sm:flex-1" variant="primary">
            <Link
              href={event.attributes.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy
              <ArrowRightSmallIcon
                className="ml-14 rem:h-[8px] rem:w-[25px]"
                viewBox="0 0 25 8"
              />
            </Link>
          </Button>
        )}
      </section>
      <Cymbal right={true} />
      {otherEvents.length ? (
        <section className="container py-[88px]">
          <div className="2xl:rem:max-w-[820px]">
            <h2 className="mb-10 font-serif rem:text-[40px] rem:leading-[49.44px] lg:rem:text-[64px] lg:rem:leading-[79.1px]">
              Other events
            </h2>
            <div
              className={cn(
                'sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:overflow-x-visible md:grid-cols-3 md:gap-y-16',
                '-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 no-scrollbar',
              )}
            >
              {otherEvents.map((event) => (
                <div key={event.id} className={'pl-4'}>
                  <EventCard
                    className="w-[252px]"
                    date={event.attributes.date}
                    image={extractImageAttrs(event.attributes.promoImage)}
                    title={event.attributes.title}
                    description={event.attributes.promoText}
                    url={`/events/${event.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

export default Event

export const generateStaticParams = async () => {
  return strapiGetAllLocales<TStrapiListResponse<TStrapiEvent>>('events', {
    query: {
      pagination: {
        pageSize: 100,
      },
    },
  }).then((events) =>
    events.map((event) => ({
      slug: event.data.id.toString(),
      locale: event.locale,
    })),
  )
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
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
    ...event.attributes.seo,
  }
}
