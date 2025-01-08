import { Cymbal } from '@/components/strapi/blocks/Cymbal/Cymbal'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { ArrowRightSmallIcon, CapaIcon } from '@/icons'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'

const Contact = () => (
  <>
    <div className="text-h1-title container">
      <h1 className="font-serif text-[64px] leading-[270px]">Contact</h1>
    </div>
    {/* <div
      className="relative -z-[1] hidden select-none 2xl:flex"
      role="presentation"
    >
      <div className="container relative">
        <div className="absolute right-full top-0">
          <CapaIcon
            className="absolute text-red rem:-top-[15px] rem:right-[200px] rem:h-[217px] rem:w-[209px]"
            viewBox="0 0 39 40"
          />
          <CapaIcon
            className="absolute text-gold rem:right-[113px] rem:top-[297px] rem:h-[212px] rem:w-[205px]"
            viewBox="0 0 39 40"
          />
          <CapaIcon
            className="absolute text-green rem:right-[28px] rem:top-[550px] rem:h-[158px] rem:w-[153px]"
            viewBox="0 0 39 40"
          />
        </div>
      </div>
    </div> */}
    <section>
      <div className="container pb-10  rem:max-w-[960px]">
        <h3 className="form-header font-serif">Feel free to contact me</h3>
        <form className="mx-auto space-y-6 lg:space-y-8" action="?">
          <Input name="first-name" placeholder="Enter your name" size="lg" />
          {/* <Input name="last-name" placeholder="Last name" size="lg" /> */}
          <Input name="email" placeholder="Enter your email" size="lg" />
          {/* <Input as="textarea" name="message" placeholder="Message" size="lg" /> */}
          <Input name="message" placeholder="Enter your message" size="lg" />
          <div className="flex justify-center">
            <Button className="grow" variant="form">
              Send
            </Button>
          </div>
        </form>
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
    <Cymbal className="[&>*]:-translate-y-[72.429%]" right />
  </>
)

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
