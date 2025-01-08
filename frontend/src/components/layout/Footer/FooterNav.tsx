'use client'

import { CapaIcon } from '@/icons'
import { cn } from '@/lib/cn'
import { isActiveRoute, usePathnameWithHash } from '@/lib/navigation'
import { TRoutes } from '@/constants/routes'

export const FooterNav = ({ routes }: { routes: TRoutes }) => {
  const ITEMS = [
    routes.about,
    routes.discography,
    routes.musicProjects,
    routes.events,
    routes.news,
    routes.myCourse,
    routes.contact,
    routes.handpanAcademy,
  ]
  const pathname = usePathnameWithHash()

  return (
    <nav>
      <ul className="space-y-6">
        {ITEMS.map((item, index) => {
          const isActive = isActiveRoute(pathname, item.url)
          return (
            <li key={index}>
              <a
                className={isActive ? 'relative' : ''}
                href={item.url}
                title={item.title}
              >
                {isActive && (
                  <CapaIcon className="absolute -left-2 top-1/2 -translate-y-1/2 text-yellow lg:-left-[1.125rem]" />
                )}
                <span className="relative">{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
