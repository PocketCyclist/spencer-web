import { Cymbal } from '@/components/strapi/blocks/Cymbal/Cymbal'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { ArrowRightSmallIcon, CapaIcon } from '../../../icons'
import { Metadata, ResolvingMetadata } from 'next'

const Contact = () => (
  <>
    <header>
      <div className="container py-16 lg:py-28">
        <h1 className="text-center font-serif rem:text-[36px] rem:leading-[44.5px] lg:rem:text-[64px] lg:rem:leading-[79.1px]">
          Lorem ipsum dolor sit amet
        </h1>
      </div>
    </header>
    <div
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
    </div>
    <section>
      <div className="container py-16 lg:py-28">
        <form
          className="mx-auto space-y-6 rem:max-w-[432px] lg:space-y-8"
          action="?"
        >
          <Input name="first-name" placeholder="First name" size="lg" />
          <Input name="last-name" placeholder="Last name" size="lg" />
          <Input name="email" placeholder="E-mail" size="lg" />
          <Input as="textarea" name="message" placeholder="Message" size="lg" />
          <div className="flex justify-center">
            <Button variant="primary">
              Submit
              <ArrowRightSmallIcon
                className="ml-14 rem:h-[8px] rem:w-[25px]"
                viewBox="0 0 25 8"
              />
            </Button>
          </div>
        </form>
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
