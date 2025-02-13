'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

const addSubscriber = (email: string) =>
  fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

export const FooterSubscribe = () => {
  const t = useTranslations('footer')
  const [email, setEmail] = useState<string>('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (!email) {
      return
    }

    addSubscriber(email)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error()
        }

        setEmail('')
        toast.success(t('newsletter.success'))
      })
      .catch((err) => {
        console.log(err)
        toast.error(t('newsletter.error'))
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-4 font-serif text-footer-title font-bold">
        {t('subscribeTitle')}
      </h5>
      <Input
        placeholder={t('subscribePlaceholder')}
        required
        size="sm"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button
        variant={'form'}
        className="mt-4 w-full rem:h-[40px] lg:rem:h-[60px]"
      >
        Send
      </Button>
    </form>
  )
}
