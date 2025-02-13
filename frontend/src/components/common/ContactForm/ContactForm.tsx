'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

const sendFeedback = (name: string, email: string, message: string) =>
  fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  })

export const ContactForm = () => {
  const t = useTranslations('contact')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (!name || !email || !message) {
      return
    }

    sendFeedback(name, email, message)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error()
        }

        setName('')
        setEmail('')
        setMessage('')
        toast.success(t('form.success'))
      })
      .catch((err) => {
        console.log(err)
        toast.error(t('form.error'))
      })
  }

  return (
    <form className="mx-auto space-y-6 lg:space-y-8" onSubmit={handleSubmit}>
      <Input
        name="first-name"
        required
        placeholder="Enter your name"
        size="lg"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      {/* <Input name="last-name" placeholder="Last name" size="lg" /> */}
      <Input
        name="email"
        type="email"
        required
        placeholder="Enter your email"
        size="lg"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      {/* <Input as="textarea" name="message" placeholder="Message" size="lg" /> */}
      <Input
        name="message"
        required
        placeholder="Enter your message"
        size="lg"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <div className="flex justify-center">
        <Button className="grow" variant="form">
          Send
        </Button>
      </div>
    </form>
  )
}
