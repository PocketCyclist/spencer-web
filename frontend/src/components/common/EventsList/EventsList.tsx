'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { EventCard } from '@/components/common/EventCard/EventCard'
import { extractImageAttrs } from '@/data/strapi/utils/extractImageAttrs'
import { TStrapiEvent } from '@/data/strapi/types/events'

interface EventsListProps {
  events: any[] // Массив событий
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const [visibleCount, setVisibleCount] = useState(4) // Начинаем с 5 элементов
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(true)

  const handleShowMore = () => {
    const newVisibleCount = visibleCount + 10 // Показываем еще 10 элементов
    setVisibleCount(newVisibleCount)

    // Если все события показаны, скрываем кнопку
    if (newVisibleCount >= events.length) {
      setIsShowMoreVisible(false)
    }
  }

  const visibleEvents = events.slice(0, visibleCount) // Получаем только видимые события

  return (
    <div className="flex w-full flex-col px-4 lg:px-10 ">
      <div className="events flex w-full flex-col ">
        {visibleEvents.map((event) => (
          <div key={event.id}>
            <EventCard
              className={visibleEvents.length > 1 ? 'event_item' : undefined}
              date={event.attributes.date}
              dateType="past"
              image={extractImageAttrs(event.attributes.promoImage)}
              title={event.attributes.title}
              description={event.attributes.promoText}
              url={`/events/${event.id}`}
            />
          </div>
        ))}

        {isShowMoreVisible && events.length > 0 && (
          <Button className="mt-4" variant={'light'} onClick={handleShowMore}>
            Show more
          </Button>
        )}
        {!isShowMoreVisible && <div className="mt-10">&nbsp;</div>}
      </div>
    </div>
  )
}

export default EventsList
