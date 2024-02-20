import Image from 'next/image'

import { strapiGet } from '@/data/strapi/common'

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
} & Record<string, any>

export const FooterSocials = async () => {
  const footerData = await strapiGet('footer')
  const socials = footerData.data.attributes.socials as TStrapiSocial[]

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
