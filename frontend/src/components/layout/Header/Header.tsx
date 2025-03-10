'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TRoutes } from '@/constants/routes'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CapaIcon } from '@/icons'
import { cn } from '@/lib/cn'
import { isActiveRoute, usePathnameWithHash } from '@/lib/navigation'
import { TLocale } from '@/navigation'
import { useLocale } from 'next-intl'
import { locales } from '@/navigation'
import LocaleSwitcherSelect from '@/components/common/LocaleSwitcher/LocaleSwitcherSelect'
import { HeaderSubmenu } from './HeaderSubmenu'

type TSubroute = {
  id: number
  title: string
}

export const Header = ({ routes }: { routes: TRoutes }) => {
  const locale = useLocale() as TLocale
  const ITEMS = [
    routes.home,
    routes.about,
    routes.discography,
    routes.musicProjects,
    routes.learnHandpan,
    routes.events,
    routes.news,
    routes.contact,
  ]

  const pathname = usePathnameWithHash()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isDesktopScreen = useMediaQuery('(min-width: 1024px)')
  const [subroutes, setSubroutes] = useState<TSubroute[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDropdownOpen, setDropdownIsOpen] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
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

  // Fetch subroutes data
  useEffect(() => {
    const fetchSubroutes = async () => {
      try {
        const response = await fetch(`/api/projects_menu?locale=${locale}`)
        const data = await response.json()
        setSubroutes(data)
        setLoading(false)
      } catch (error) {
        console.error('Error loading subroutes:', error)
        setLoading(false)
      }
    }

    fetchSubroutes()
  }, [locale])

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
      setDropdownIsOpen(window.innerWidth < 1024)
    }

    // Initial check
    checkScreenSize()

    // Add resize listener
    window.addEventListener('resize', checkScreenSize)

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleMouseEnter = () => {
    setDropdownIsOpen(true)
  }

  const handleMouseLeave = () => {
    setDropdownIsOpen(false)
  }
  return (
    <header className="fixed left-0 top-0 z-10 h-mobile-header w-full bg-background lg:h-header lg:py-6">
      {/* <div className="container flex h-full items-center justify-between gap-y-4"> */}
      <div className="container flex h-full items-center justify-between gap-y-4 lg:flex-col">
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
              const isProjects = item.url === '/projects'
              return (
                <li key={index} className="relative">
                  <a
                    aria-current={isActive ? 'page' : undefined}
                    className="topmenu_link_link relative"
                    href={item.url}
                    title={item.title}
                    onMouseEnter={isProjects ? handleMouseEnter : undefined}
                    onMouseLeave={isProjects ? handleMouseLeave : undefined}
                  >
                    {isActive && (
                      <CapaIcon className="absolute -left-2 top-1/2 -translate-y-1/2 text-yellow lg:-left-[1.125rem]" />
                    )}
                    <span className="relative">{item.title}</span>
                  </a>
                  {isProjects && isDropdownOpen && (
                    <>
                      {loading ? (
                        <p className="projects_submenu">
                          <br />
                          Loading projects...
                        </p>
                      ) : error ? (
                        // <p>Error: {error}</p>
                        ''
                      ) : subroutes.length === 0 ? (
                        ''
                      ) : (
                        <div
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <HeaderSubmenu subroutes={subroutes} />
                        </div>
                      )}
                    </>
                  )}
                </li>
              )
            })}
            <li className="header_locales">
              {' '}
              <LocaleSwitcherSelect defaultValue={locale} label={locale}>
                {locales.map((cur) => (
                  <option key={cur} value={cur}>
                    {/* {t('locale', { locale: cur })} */}
                    {cur}
                  </option>
                ))}
              </LocaleSwitcherSelect>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
