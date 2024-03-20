import { useTranslations } from 'next-intl'

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.
export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage')

  return (
    <div className="flex min-h-screen-minus-mobile-header items-center justify-center lg:min-h-screen-minus-header">
      <h1 className="flex h-full flex-col items-center text-center">
        <span className="leading-normal rem:text-[64px]">404</span>
        <span className="leading-normal">{t('title')}</span>
      </h1>
    </div>
  )
}
