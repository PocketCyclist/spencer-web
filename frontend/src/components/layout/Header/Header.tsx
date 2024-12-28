'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TRoutes } from '@/constants/routes'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CapaIcon } from '@/icons'
import { cn } from '@/lib/cn'
import { isActiveRoute, usePathnameWithHash } from '@/lib/navigation'

export const Header = ({ routes }: { routes: TRoutes }) => {
  const ITEMS = [
    routes.home,
    routes.about,
    routes.discography,
    routes.musicProjects,
    routes.events,
    routes.news,
  ]

  const pathname = usePathnameWithHash()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isDesktopScreen = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (isDesktopScreen) {
      setIsMenuOpen(false)
    }
  }, [isDesktopScreen])

  useEffect(() => {
    document.documentElement.classList[isMenuOpen ? 'add' : 'remove'](
      'overflow-hidden',
    )
  }, [isMenuOpen])

  return (
    <header className="fixed left-0 top-0 z-10 h-mobile-header w-full bg-background lg:h-header">
      {/* <div className="container flex h-full items-center justify-between gap-y-4"> */}
      <div className="container flex h-full flex-col items-center justify-between gap-y-4">
        <Link href="/" title={routes.home.title}>
          <Image
            className="m-4 rem:w-[152px] lg:rem:w-[264px]"
            alt="Gerard Spencer - Handpan performances classes & wellbeing"
            src="/images/logo.png"
            width={264}
            height={79}
          />
        </Link>

        <button
          aria-expanded={isMenuOpen}
          aria-controls="menu"
          aria-label="Toggle menu"
          className="relative flex h-10 w-10 flex-col items-center justify-center lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          type="button"
        >
          <span
            className={cn(
              'absolute left-1/2 top-1/2 h-0.5 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-full before:-translate-y-2.5 before:rounded-full before:bg-foreground before:transition-transform after:absolute after:left-0 after:top-0 after:h-full after:w-full after:translate-y-2.5 after:rounded-full after:bg-foreground after:transition-transform',
              isMenuOpen &&
                'bg-transparent before:translate-y-0 before:rotate-45 after:translate-y-0 after:-rotate-45',
            )}
          />
        </button>

        <nav
          className={cn(
            'pointer-events-none fixed bottom-0 left-0 right-0 top-mobile-header -translate-y-6 overflow-y-auto border-t border-t-border bg-background px-4 py-10  opacity-0 transition-all lg:pointer-events-auto lg:relative lg:inset-auto lg:translate-y-0 lg:overflow-y-visible lg:border-0 lg:bg-transparent lg:p-0 lg:opacity-100 lg:transition-none',
            isMenuOpen && 'pointer-events-auto translate-y-0 opacity-100',
          )}
          id="menu"
        >
          <ul className="space-y-10 pb-6 pt-2 lg:flex lg:items-center lg:space-x-8 lg:space-y-0">
            {ITEMS.map((item, index) => {
              const isActive = isActiveRoute(pathname, item.url)
              return (
                <li key={index}>
                  <a
                    aria-current={isActive ? 'page' : undefined}
                    className="relative"
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
      </div>
    </header>
  )
}
