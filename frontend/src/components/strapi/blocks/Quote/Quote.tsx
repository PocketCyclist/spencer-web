import { CapaIcon } from '@/icons'

type QuoteProps = {
  author?: string
  text: string
}

export const Quote = ({ text, author }: QuoteProps) => (
  <section className="bg-yellow font-serif">
    <div className="container py-[5.375rem] xl:py-[11.5rem]">
      <div className="max-w-[987px]">
        <p className="mb-6 text-[36px] leading-[44.5px] lg:mb-8 lg:text-[64px] lg:leading-[79.1px]">
          {text}
        </p>
        {author && (
          <p className="flex justify-end text-[24px] leading-[29.66px]">
            <span className="relative py-7 pl-[1.625rem]">
              <CapaIcon
                className="w-[82.07px] h-[85px] absolute top-1/2 left-0 -translate-y-1/2 text-background"
                viewBox="0 0 39 40"
              />
              <span className="relative">— {author}</span>
            </span>
          </p>
        )}
      </div>
    </div>
  </section>
)
