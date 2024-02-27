'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { routesMap } from '@/constants/routes'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CapaIcon } from '@/icons'
import { cn } from '@/lib/cn'
import { isActiveRoute, usePathnameWithHash } from '@/lib/navigation'

const ITEMS = [
  routesMap.home,
  routesMap.about,
  routesMap.discography,
  routesMap.musicProjects,
  routesMap.events,
  routesMap.news,
]

export const Header = () => {
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
    <header className="w-full h-mobile-header fixed top-0 left-0 z-10 bg-background lg:h-header">
      <div className="container h-full flex justify-between items-center gap-y-4">
        <Link href="/" title="Home">
          <Image
            className="rem:w-[152px] lg:rem:w-[264px]"
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
          className="w-10 h-10 relative flex flex-col justify-center items-center lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          type="button"
        >
          <span
            className={cn(
              'w-8 h-0.5 absolute top-1/2 left-1/2 rounded-full bg-foreground -translate-x-1/2 -translate-y-1/2 before:w-full before:h-full before:absolute before:top-0 before:left-0 before:rounded-full before:bg-foreground before:-translate-y-2.5 before:transition-transform after:w-full after:h-full after:absolute after:top-0 after:left-0 after:rounded-full after:bg-foreground after:translate-y-2.5 after:transition-transform',
              isMenuOpen &&
                'bg-transparent before:translate-y-0 before:rotate-45 after:translate-y-0 after:-rotate-45',
            )}
          />
        </button>

        <nav
          className={cn(
            'px-4 py-10 fixed top-mobile-header left-0 right-0 bottom-0 overflow-y-auto border-t border-t-border bg-background opacity-0 transition-all -translate-y-6 pointer-events-none lg:opacity-100 lg:p-0 lg:relative lg:inset-auto lg:overflow-y-visible lg:border-0 lg:bg-transparent lg:transition-none lg:translate-y-0 lg:pointer-events-auto',
            isMenuOpen && 'opacity-100 translate-y-0 pointer-events-auto',
          )}
          id="menu"
        >
          <ul className="space-y-10 lg:flex lg:items-center lg:space-x-8 lg:space-y-0">
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
                      <CapaIcon className="absolute -left-2 top-1/2 text-yellow -translate-y-1/2 lg:-left-[1.125rem]" />
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
