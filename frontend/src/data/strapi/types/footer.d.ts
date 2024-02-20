export type TStrapiSocial = {
  id: number
  url: string
  label: string
  icon: {
    data: {
      attributes: {
        url: string
      }
    }
  }
}

export type TStrapiFooter = {
  socials: TStrapiSocial[]
}
