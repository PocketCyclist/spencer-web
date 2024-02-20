import { TStrapiSeoComponent } from '@/data/strapi/types/common/seo'
import { TStrapiBlock } from '@/data/strapi/types/common/blocks'

export type TStrapiLandingPage = {
  seo: TStrapiSeoComponent
  blocks: TStrapiBlock[]
}
