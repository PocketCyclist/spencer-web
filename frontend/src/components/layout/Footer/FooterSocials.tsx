import Image from 'next/image'
import { strapiGet } from '@/data/strapi/common'
import { TStrapiSingleResponse } from '@/data/strapi/types/common/api'
import { TStrapiFooter } from '@/data/strapi/types/footer'
import { getTranslations } from 'next-intl/server'

export const FooterSocials = async () => {
  const t = await getTranslations('footer')
  const footerData =
    await strapiGet<TStrapiSingleResponse<TStrapiFooter>>('footer')
  const socials = footerData.attributes.socials

  return (
    <div>
      <h5 className="mb-4 text-footer-title font-bold">{t('followMe')}</h5>
      {socials.length > 0 && (
        <ul className="-m-3">
          {socials.map((item) => (
            <li
              key={item.id}
              className="inline-flex items-center justify-center p-3"
            >
              <a
                className="flex items-center justify-center"
                href={item.url}
                title={item.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt={item.label}
                  src={item.icon.data.attributes.url}
                  width={48}
                  height={48}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
