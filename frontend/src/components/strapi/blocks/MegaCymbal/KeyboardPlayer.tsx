'use client'

import { useCallback, useEffect } from 'react'
import {
  keyMap,
  playNote,
  TKey,
} from '@/components/strapi/blocks/MegaCymbal/player'

export const KeyboardPlayer = () => {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const note = keyMap[e.key as TKey]
    if (note) {
      playNote(note)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return null
}
