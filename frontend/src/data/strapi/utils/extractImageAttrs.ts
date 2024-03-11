import { TStrapiImageField } from '@/data/strapi/types/common/api'

export const extractImageAttrs = (field: TStrapiImageField) => {
  if (!field.data) return { alt: 'no image', src: '/images/logo.png' }
  const attrs = field.data.attributes

  return {
    alt: attrs.alternativeText,
    src: attrs.url,
  }
}
