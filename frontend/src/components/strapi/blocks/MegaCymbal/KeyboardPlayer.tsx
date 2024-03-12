'use client'

import { useCallback, useEffect } from 'react'
import { playNote, TNote } from '@/components/strapi/blocks/MegaCymbal/player'

export type TKey = 'a' | 's' | 'd' | 'f' | 'g' | 'h' | 'j' | 'k' | 'l'
export const keyMap: Record<TKey | string, TNote | undefined> = {
  a: 'c3',
  s: 'c4',
  d: 'c5',
  f: 'd3',
  g: 'd4',
  h: 'f3',
  j: 'f4',
  k: 'g3',
  l: 'g4',
}

export const KeyboardPlayer = () => {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const note = keyMap[e.key]
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
