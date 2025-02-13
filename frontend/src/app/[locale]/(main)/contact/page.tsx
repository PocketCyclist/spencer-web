import { Cymbal } from '@/components/strapi/blocks/Cymbal/Cymbal'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/common/ContactForm/ContactForm'
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl'
import { TLocale } from '@/navigation'

const Contact = () => {
  const locale = useLocale() as TLocale
  const messages = useMessages()

  return (
    <>
      <div className="text-h1-title container">
        <div className="text-h1-title container">
          <h1 className="py-12 font-serif text-[48px] leading-[60px] md:py-24 md:leading-[80px] md:rem:text-[64px]">
            Contact
          </h1>
        </div>
      </div>

      <section>
        <div className="container pb-10  rem:max-w-[1092px]">
          <h3 className="form-header font-serif">Feel free to contact me</h3>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ContactForm />
          </NextIntlClientProvider>
          <div className="py-4 pt-8">
            <h4 className="form-header font-serif">Booking</h4>
            <Link
              className="max-w-fit underline underline-offset-2 hover:no-underline"
              href={`mailto:laurent@handpanharmony.com`}
              title="Details"
            >
              laurent@handpanharmony.com
            </Link>
          </div>
          <div className="pb-12 pt-8">
            <h4 className="form-header font-serif">Informations générales</h4>
            <Link
              className="max-w-fit underline underline-offset-2 hover:no-underline"
              href={`mailto:contact@handpanharmony.com`}
              title="Details"
            >
              contact@handpanharmony.com
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact

export const generateMetadata = async (
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  // const page = await strapiGet<TStrapiSingleResponse<TStrapiContactPage>>(
  //   `contact-page`,
  //   { query: { populate: 'seo' } },
  // ).catch(() => notFound())

  return {
    // ...((await parent) as Metadata),
    // ...page.attributes.seo,
    title: 'Contact Us - The Gerard Spencer Project',
  }
}

{
  /* <Cymbal className="[&>*]:-translate-y-[72.429%]" right /> */
}
