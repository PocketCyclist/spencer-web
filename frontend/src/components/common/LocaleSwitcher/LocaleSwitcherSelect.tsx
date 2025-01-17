'use client'

import { useParams } from 'next/navigation'
import { ChangeEvent, ReactNode, useTransition } from 'react'
import { useRouter, usePathname } from '@/navigation'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value
    const validLocales = ['fr', 'en']
    const locale = validLocales.includes(nextLocale) ? nextLocale : undefined
    startTransition(() => {
      return router.replace(pathname, {
        ...params,
        locale: locale as 'fr' | 'en' | undefined,
        scroll: false,
      })
    })
  }

  return (
    <label
      className={cn(
        'relative',
        isPending && 'transition-opacity [&:disabled]:opacity-30',
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pr-6 font-sans tracking-[-0.07em]"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-0">⌄</span>
    </label>
  )
}
