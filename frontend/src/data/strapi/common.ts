import qs from 'qs'
import { getLocale } from 'next-intl/server'

export type TStrapiGetParams = {
  query?: Record<string, any>
  deepPopulate?: boolean
  localized?: boolean
}

export type TStrapiQueryParams = {
  locale?: 'en' | 'fr' | string
  populate?: any
} & Record<string, any>

export type TStrapiResource = string

export const strapiGet = async <T extends { data: any }>(
  resource: TStrapiResource,
  { query, deepPopulate, localized }: TStrapiGetParams = {
    query: {},
    deepPopulate: true,
    localized: false,
  },
): Promise<T['data']> => {
  const url = new URL(buildResourceUrl(resource))
  const getQuery: TStrapiQueryParams = {
    ...(deepPopulate ? { populate: 'deep' } : {}),
    ...(localized ? { locale: await getLocale() } : {}),
    ...query,
  }
  url.search = qs.stringify(getQuery)

  // console.log('params', url.toString())

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN as string}`,
      accept: 'application/json',
    },
    signal: controller.signal,
    next: { revalidate: 1200 },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Strapi HTTP error! Url: ${url} Status: ${response.status}`,
        )
      }
      return response.json()
    })
    .then((r) => r.data as T['data'])
    .catch((error) => {
      if (error.name === 'AbortError') {
        console.error('Request timed out:', error)
      } else {
        console.error(
          'LOOK ME UP FOR DEFAULT LOCALE RETRY Error:',
          error.message || 'An unknown error occurred',
        )
      }
      throw error
    })
    .finally(() => clearTimeout(timeoutId))
}

const buildResourceUrl = (resource: TStrapiResource) =>
  `${process.env.STRAPI_URL}/api/${resource}`
