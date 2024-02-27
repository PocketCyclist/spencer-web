export const isActiveRoute = (activeRoute: string, pageRoute: string) => {
  if (pageRoute === '/') {
    return activeRoute === '/'
  } else {
    return activeRoute.startsWith(pageRoute)
  }
}
