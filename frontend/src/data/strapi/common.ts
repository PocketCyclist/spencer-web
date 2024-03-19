import qs from 'qs'
import { defaultLocale } from '@/navigation'

export type TStrapiGetParams = {
  query?: Record<string, any>
  deepPopulate?: boolean
  locale?: string
}

export type TStrapiQueryParams = {
  locale?: 'en' | 'fr' | string
  populate?: any
} & Record<string, any>

export type TStrapiResource = string

export const strapiGet = async <T extends { data: any }>(
  resource: TStrapiResource,
  { query, deepPopulate, locale }: TStrapiGetParams = {
    query: {},
    deepPopulate: true,
  },
): Promise<T['data']> => {
  const url = buildRequestUrl(resource, { deepPopulate, query, locale })
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
    .finally(() => clearTimeout(timeoutId))
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404 && locale !== defaultLocale) {
          const retryUrl = buildRequestUrl(resource, {
            deepPopulate,
            query,
          })
          const retryController = new AbortController()
          const retryTimeoutId = setTimeout(
            () => retryController.abort(),
            10000,
          )
          return fetch(retryUrl, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_TOKEN as string}`,
              accept: 'application/json',
            },
            signal: retryController.signal,
            next: { revalidate: 1200 },
          })
            .finally(() => clearTimeout(retryTimeoutId))
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Strapi RETRY HTTP error! Url: ${url} Status: ${response.status}`,
                )
              }

              return response.json()
            })
        } else {
          throw new Error(
            `Strapi HTTP error! Url: ${url} Status: ${response.status}`,
          )
        }
      }
      return response.json()
    })
    .then((r) => {
      return r.data as T['data']
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        console.error('Request timed out:', error)
      } else {
        console.error('Error:', error.message || 'An unknown error occurred')
      }
      throw error
    })
}

const buildResourceUrl = (resource: TStrapiResource) =>
  `${process.env.STRAPI_URL}/api/${resource}`

const buildRequestUrl = (
  resource: TStrapiResource,
  { deepPopulate, query, locale }: { locale?: string } & TStrapiGetParams,
) => {
  const url = new URL(buildResourceUrl(resource))
  const getQuery: TStrapiQueryParams = {
    ...(deepPopulate ? { populate: 'deep' } : {}),
    locale,
    ...query,
  }
  url.search = qs.stringify(getQuery)
  return url
}
