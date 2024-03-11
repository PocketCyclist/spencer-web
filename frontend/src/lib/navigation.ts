import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const isActiveRoute = (
  activeRoute: string | undefined,
  pageRoute: string,
) => {
  if (!activeRoute) return false
  if (pageRoute === '/') {
    return activeRoute === '/'
  } else {
    return activeRoute.startsWith(pageRoute)
  }
}

export const usePathnameWithHash = () => {
  const basePathname = usePathname()
  const hash = useHash()
  const [pathname, setPathname] = useState<string>(basePathname)

  useEffect(() => {
    setPathname(hash ? basePathname + '#' + hash : basePathname)
  }, [basePathname, hash])
  return pathname
}

export function useHash() {
  const [hash, setHash] = useState<string>('')

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash.slice(1))
    }
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return hash
}
