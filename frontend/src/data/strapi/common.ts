export type TStrapiGetParams = {
  query?: Record<string, any>
  deepPopulate?: boolean
}
export type TStrapiResource = string

export const strapiGet = (
  resource: TStrapiResource,
  { query, deepPopulate }: TStrapiGetParams = { query: {}, deepPopulate: true },
) => {
  const url = new URL(buildResourceUrl(resource))
  url.search = new URLSearchParams({
    ...(deepPopulate ? { populate: 'deep' } : {}),
    ...query,
  }).toString()

  console.log('params', url.toString())

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000) // Set the timeout to 10 seconds (adjust as needed)

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN as string}`,
    },
    signal: controller.signal, // Pass the signal option to the fetch call
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Strapi HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        console.error('Request timed out:', error)
      } else {
        console.error('Error:', error.message || 'An unknown error occurred')
      }
    })
    .finally(() => clearTimeout(timeoutId))
}

const buildResourceUrl = (resource: TStrapiResource) =>
  `${process.env.STRAPI_URL}/api/${resource}`
