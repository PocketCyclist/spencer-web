import { Cymbal } from '../../../components/strapi/blocks/Cymbal/Cymbal'
import { Button } from '../../../components/ui/Button/Button'
import { Input } from '../../../components/ui/Input/Input'
import { ArrowRightSmallIcon, CapaIcon } from '../../../icons'
import { Metadata, ResolvingMetadata } from 'next'

const Contact = () => (
  <>
    <header>
      <div className="container py-16 lg:py-28">
        <h1 className="font-serif rem:text-[36px] rem:leading-[44.5px] text-center lg:rem:text-[64px] lg:rem:leading-[79.1px]">
          Lorem ipsum dolor sit amet
        </h1>
      </div>
    </header>
    <div
      className="hidden relative -z-[1] select-none 2xl:flex"
      role="presentation"
    >
      <div className="container relative">
        <div className="absolute right-full top-0">
          <CapaIcon
            className="rem:w-[209px] rem:h-[217px] absolute rem:right-[200px] rem:-top-[15px] text-red"
            viewBox="0 0 39 40"
          />
          <CapaIcon
            className="rem:w-[205px] rem:h-[212px] absolute rem:right-[113px] rem:top-[297px] text-gold"
            viewBox="0 0 39 40"
          />
          <CapaIcon
            className="rem:w-[153px] rem:h-[158px] absolute rem:right-[28px] rem:top-[550px] text-green"
            viewBox="0 0 39 40"
          />
        </div>
      </div>
    </div>
    <section>
      <div className="container py-16 lg:py-28">
        <form
          className="rem:max-w-[432px] mx-auto space-y-6 lg:space-y-8"
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
                className="rem:w-[25px] rem:h-[8px] ml-14"
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
