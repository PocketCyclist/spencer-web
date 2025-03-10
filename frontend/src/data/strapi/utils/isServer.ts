import { useEffect, useState } from 'react'

export const useIsServer = () => {
  const [isServer, setIsServer] = useState(true)
  useEffect(() => {
    setIsServer(false)
  }, [])

  return isServer
}

export const isServer = () => typeof window === 'undefined'
