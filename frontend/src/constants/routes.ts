export const routesMap = {
  home: {
    url: '/',
    title: 'Home',
  },
  about: {
    url: '/#about',
    title: 'About',
  },
  discography: {
    url: '/discography',
    title: 'Discography',
  },
  musicProjects: {
    url: '/projects',
    title: 'Music Projects',
  },
  events: {
    url: '/events',
    title: 'Events',
  },
  news: {
    url: '/news',
    title: 'News',
  },
  myCourse: {
    url: '/learn-handpan',
    title: 'My course',
  },
  contact: {
    url: '/contact',
    title: 'Contact',
  },
  handpanAcademy: {
    url: 'https://handpanharmony.com',
    title: 'Handpan Academy',
  },
  learnHandpan: {
    url: '/learn-handpan',
    title: 'Learn Handpan',
  },
} as const

export type TRoutes = typeof routesMap

export const getTranslatedRoutes = (t: (k: string) => string): TRoutes => {
  return Object.fromEntries(
    Object.entries(routesMap).map(([key, route]) => [
      key,
      { url: route.url, title: t(key) },
    ]),
  ) as TRoutes
}
