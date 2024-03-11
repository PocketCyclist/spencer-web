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

export const notes = {
  c3: '/handpan/samples/C3.mp3',
  c4: '/handpan/samples/C4.mp3',
  c5: '/handpan/samples/C5.mp3',
  d3: '/handpan/samples/D3.mp3',
  d4: '/handpan/samples/D4.mp3',
  f3: '/handpan/samples/F3.mp3',
  f4: '/handpan/samples/F4.mp3',
  g3: '/handpan/samples/G3.mp3',
  g4: '/handpan/samples/G4.mp3',
}

export type TNote = keyof typeof notes

export const playNote = (note: TNote) => {
  const audio = new Audio(notes[note])
  audio.play()
}
