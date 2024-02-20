import Image from 'next/image'
import { strapiGet } from '@/data/strapi/common'
import { TStrapiSingleResponse } from '@/data/strapi/types/common/api'
import { TStrapiFooter } from '@/data/strapi/types/footer'

export const FooterSocials = async () => {
  const footerData = await strapiGet<TStrapiSingleResponse<TStrapiFooter>>(
    'footer',
  ).then((r) => r.data)
  const socials = footerData.attributes.socials

  return (
    <div>
      <h5 className="mb-4 font-serif font-bold text-footer-title">
        Follow my music
      </h5>
      {socials.length > 0 && (
        <ul className="-m-3">
          {socials.map((item) => (
            <li
              key={item.id}
              className="p-3 inline-flex justify-center items-center"
            >
              <a
                className="flex justify-center items-center"
                href={item.url}
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
