import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { TLocale } from '@/navigation'
import { getTranslations } from 'next-intl/server'

export const FooterSubscribe = async () => {
  const t = await getTranslations('footer')
  return (
    <form>
      <h5 className="mb-4 font-serif text-footer-title font-bold">
        {t('subscribeTitle')}
      </h5>
      <Input placeholder={t('subscribePlaceholder')} size="sm" type="email" />
      <Button
        variant={'form'}
        className="mt-4 w-full rem:h-[40px] lg:rem:h-[60px]"
      >
        Send
      </Button>
    </form>
  )
}
