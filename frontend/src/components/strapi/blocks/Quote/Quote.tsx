import { CapaIcon } from '@/icons'

type QuoteProps = {
  author?: string
  text: string
}

export const Quote = ({ text, author }: QuoteProps) => (
  <section className="bg-yellow">
    <div className="container py-[5.375rem] xl:py-[11.5rem]">
      <div className="rem:max-w-[987px]">
        <p className="font-serif rem:text-[36px] rem:leading-[44.5px] sm:whitespace-break-spaces lg:rem:text-[64px] lg:rem:leading-[79.1px]">
          {text}
        </p>
        {author && (
          <p className="mt-6 flex justify-end font-serif rem:text-[24px] rem:leading-[29.66px] lg:mt-8">
            <span className="relative py-7 pl-[1.625rem]">
              <CapaIcon
                className="absolute left-0 top-1/2 -translate-y-1/2 text-background rem:h-[85px] rem:w-[82.07px]"
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
