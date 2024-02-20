export type TBlockComponent = string
export type TStrapiBlock = {
  id: number
  __component: TBlockComponent
} & Record<string, any>
