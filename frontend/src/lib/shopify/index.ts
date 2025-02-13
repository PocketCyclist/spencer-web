import Shopify from 'shopify-api-node'
import { mutation, query } from '@/lib/shopify/graphql'

interface CustomerDTO {
  email: string
  tags: string[]
  name?: string
  message?: string
}

interface FoundCustomer {
  id: string
}

let shopifyClient: Shopify | null

function getClient(): Shopify {
  if (!shopifyClient) {
    shopifyClient = new Shopify({
      shopName: process.env.SHOPIFY_SHOP_NAME!,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN!,
    })
  }

  return shopifyClient
}

async function findCustomer(email: string): Promise<FoundCustomer | undefined> {
  const response = await getClient().graphql(query.customers, { email })

  return response?.customers?.nodes?.[0]
}

export async function addCustomer(customerDTO: CustomerDTO): Promise<void> {
  const { email, name, message, tags } = customerDTO

  const foundCustomer = await findCustomer(email)

  if (foundCustomer) {
    const customerVariables = {
      input: {
        id: foundCustomer.id,
        ...(name && { firstName: name }),
        ...(message && { note: message }),
      },
    }

    const {
      customerUpdate: { customer },
    } = await getClient().graphql(mutation.customerUpdate, customerVariables)

    if (!customer) {
      throw new Error()
    }

    const tagsVariables = {
      id: foundCustomer.id,
      tags: tags.join(','),
    }

    const {
      tagsAdd: { node },
    } = await getClient().graphql(mutation.tagsAdd, tagsVariables)

    if (!node) {
      throw new Error()
    }
  } else {
    const variables = {
      input: {
        email,
        emailMarketingConsent: {
          marketingState: 'SUBSCRIBED',
        },
        ...(name && { firstName: name }),
        ...(message && { note: message }),
        tags,
      },
    }

    const {
      customerCreate: { customer },
    } = await getClient().graphql(mutation.customerCreate, variables)

    if (!customer) {
      throw new Error()
    }
  }
}
