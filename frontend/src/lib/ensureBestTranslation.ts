import { TStrapiEntity } from '@/data/strapi/types/common/api'
import { redirect, TLocale } from '@/navigation'

export const ensureBestTranslation = <T extends TStrapiEntity<{}>>(
  entity: T,
  path: string,
  currentLocale: TLocale,
) => {
  if (entity?.attributes.locale !== currentLocale) {
    const target = entity.attributes.localizations?.data.find(
      (i) => i.attributes.locale == currentLocale,
    )

    if (target) {
      redirect(`/${path}/${target.id}`)
    }
  }
}
