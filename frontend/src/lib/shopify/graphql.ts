export const query = {
  customers: `
    query Customers($email: String!) {
      customers(query: $email, first: 1) {
        nodes {
          id
        }
      }
    }
  `,
}

export const mutation = {
  customerCreate: `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
      }
    }
  `,
  customerUpdate: `
    mutation customerUpdate($input: CustomerInput!) {
      customerUpdate(input: $input) {
        customer {
          id
        }
      }
    }
  `,
  tagsAdd: `
    mutation tagsAdd($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        node {
          id
        }
      }
    }
  `,
}
