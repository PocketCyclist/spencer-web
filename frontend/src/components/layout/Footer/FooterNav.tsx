'use client'

import { routesMap } from '@/constants/routes'
import { CapaIcon } from '@/icons'
import { cn } from '@/lib/cn'
import { isActiveRoute, usePathnameWithHash } from '@/lib/navigation'

const ITEMS = [
  routesMap.about,
  routesMap.discography,
  routesMap.musicProjects,
  routesMap.events,
  routesMap.news,
  routesMap.myCourse,
  routesMap.contact,
  routesMap.handpanAcademy,
]

export const FooterNav = () => {
  const pathname = usePathnameWithHash()

  return (
    <nav>
      <ul className="space-y-6">
        {ITEMS.map((item, index) => {
          const isActive = isActiveRoute(pathname, item.url)
          return (
            <li key={index}>
              <a
                aria-current={isActive ? 'page' : undefined}
                className={cn(isActive && 'pointer-events-none relative')}
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
