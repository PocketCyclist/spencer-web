import { TStrapiImageField } from '@/data/strapi/types/common/api'

export const extractImageAttrs = (field: TStrapiImageField) => {
  const attrs = field.data.attributes

  return {
    alt: attrs.alternativeText,
    src: attrs.url,
  }
}
