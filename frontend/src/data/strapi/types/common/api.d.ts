export type TStrapiData<T> = {
  data: T
}

export type TStrapiEntity<T> = {
  id: number
  attributes: T
}

export type TStrapiSingleResponse<T> = {
  data: TStrapiEntity<T>
  meta: {}
}

export type TStrapiListResponse<T> = {
  data: TStrapiEntity<T>[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type TStrapiImageFormats = 'large' | 'medium' | 'small' | 'thumbnail'
export type TStrapiImageAttachmentEntity = TStrapiEntity<{
  url: string
  width: number
  height: number
  name: string
  alternativeText: string
  ext: '.png' | '.svg' | '.jpg' | string
  mime: 'image/jpeg' | 'image/png' | string
  formats: Record<
    TStrapiImageFormats,
    {
      urL: string
      width: number
      height: number
      name: string
      ext: '.png' | '.svg' | '.jpg' | string
      mime: 'image/jpeg' | 'image/png' | string
    }
  >
}>

export type TStrapiImageField = TStrapiData<TStrapiImageAttachmentEntity>
export type TStrapiImagesField = TStrapiData<TStrapiImageAttachmentEntity[]>
