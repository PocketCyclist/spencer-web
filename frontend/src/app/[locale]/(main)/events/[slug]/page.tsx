/* eslint-disable react/jsx-no-undef */
import { strapiGet } from '@/data/strapi/common'
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
import { Metadata } from 'next'
import { cn } from '@/lib/cn'
import { EventCard } from '@/components/common/EventCard/EventCard'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { ArrowRightSmallIcon } from '@/icons'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TLocale } from '@/navigation'
import { ensureBestTranslation } from '@/lib/ensureBestTranslation'
import Image from 'next/image'

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
      locale,
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

  ensureBestTranslation(event, 'events', locale)

  const parsedDate = parseDateToWords(event.attributes.date, true)
  const imageAttrs = event.attributes.promoImage.data.attributes || undefined
  const linkEvents = '/' + locale + '/events'
  return (
    <>
      <div className="text-h1-title container">
        <div className="py-6 font-sans text-[16px] lg:py-14">
          <Link
            href={linkEvents}
            title="Music Projects"
            className="breadcrumps-link "
          >
            Events
          </Link>
          <span className="hidden px-4 pb-1 md:inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="4"
              viewBox="0 0 4 4"
            >
              <circle cx="2" cy="2" r="2" fill="black" />
            </svg>
          </span>
          <span className=" hidden md:inline-block">
            {event.attributes.title}
          </span>
        </div>
      </div>
      <section className="container  overflow-hidden rounded-sm lg:rem:w-[1092px]">
        <div className="relative  rem:min-h-[358px] sm:min-h-[500px] lg:col-start-2 lg:rem:w-[1092px] lg:rem:max-w-[1092px]">
          <Image
            src={imageAttrs.url || ''}
            alt={imageAttrs.alternativeText || ''}
            className="max-w-[1092px] object-cover object-center"
            fill
          />
        </div>
      </section>
      <section className="container pb-[88px] lg:rem:w-[1092px]">
        <h2 className="mb-2 whitespace-pre-wrap font-sans rem:pt-[32px] rem:text-[24px] rem:leading-[30px] lg:mb-5 lg:rem:pt-[64px] lg:rem:text-[40px] lg:rem:leading-[50px]">
          {event.attributes.title}
        </h2>
        <h3 className="mb-5 rem:text-[24px] rem:leading-[30px] lg:mb-5 lg:rem:text-[20px] lg:rem:leading-[28px]">
          {parsedDate.dayOfWeek} {parsedDate.date}
        </h3>
        <p className="mw-[160px] mb-8 whitespace-pre-wrap rem:text-[20px] rem:leading-[25.1px]">
          {event.attributes.description}
        </p>
        {event.attributes.buyUrl && (
          <Button asChild className="min-w-40 sm:flex-1" variant="primary">
            <Link
              href={event.attributes.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy
              {/* <ArrowRightSmallIcon
                className="ml-14 rem:h-[8px] rem:w-[25px]"
                viewBox="0 0 25 8"
              /> */}
            </Link>
          </Button>
        )}
      </section>
      {/* 
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
      ) : null} */}
    </>
  )
}

export default Event

export const generateStaticParams = async () => {
  return strapiGet<TStrapiListResponse<TStrapiEvent>>('events', {
    query: {
      locale: 'all',
      pagination: {
        pageSize: 100,
      },
    },
  }).then((events) =>
    events.map((event) => ({
      slug: event.id.toString(),
      locale: event.attributes.locale,
    })),
  )
}

export const generateMetadata = async ({
  params: { slug, locale },
}: {
  params: { slug: string; locale: TLocale }
}): Promise<Metadata> => {
  const event = await strapiGet<TStrapiSingleResponse<TStrapiEvent>>(
    `events/${slug}`,
    {
      locale,
      query: {
        populate: 'seo',
      },
    },
  ).catch(() => notFound())

  return {
    ...event.attributes.seo,
    alternates: {
      canonical: `/${event.attributes.locale}/events/${event.id}`,
    },
  }
}
