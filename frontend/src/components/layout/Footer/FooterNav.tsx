'use client'

import { usePathname } from 'next/navigation'

import { CapaIcon } from '@/icons'
import { cn } from '@/lib/cn'

const ITEMS = [
  { url: '/about', title: 'About' },
  { url: '/discography', title: 'Discography' },
  { url: '/music-projects', title: 'Music Projects' },
  { url: '/events', title: 'Events' },
  { url: '/news', title: 'News' },
  { url: '/my-course', title: 'My course' },
  { url: '/contact', title: 'Contact' },
  { url: '/handpan-academy', title: 'Handpan Academy' },
]

export const FooterNav = () => {
  const pathname = usePathname()

  const isItemActive = (url: string) => pathname === url

  return (
    <nav>
      <ul className="space-y-6">
        {ITEMS.map((item, index) => (
          <li key={index}>
            <a
              aria-current={isItemActive(item.url) ? 'page' : undefined}
              className={cn(
                isItemActive(item.url) && 'relative pointer-events-none',
              )}
              href={item.url}
              title={item.title}
            >
              {isItemActive(item.url) && (
                <CapaIcon className="absolute -left-2 top-1/2 text-yellow -translate-y-1/2 lg:-left-[1.125rem]" />
              )}
              <span className="relative">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
