'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useActionState, useTransition } from 'react'
import { useRef } from 'react'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { contactSchema } from '@/lib/form-schema'

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { onSubmitAction } from '@/actions/contactAction'
import { X } from 'lucide-react'

export default function ContactForm() {
  const [state, formAction] = useActionState(onSubmitAction, {
    message: '',
  })

  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const tp = useTranslations('Newsletter')
  const t = useTranslations('ContactPage')
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  return (
    <div className="h-full">
      {isPending && <p>{tp('isPending')}</p>}
      {state?.message !== '' &&
        !state.issues &&
        (state.message.includes('success') ? (
          <p className="text-green-500 text-xl">{t('form.success')}</p>
        ) : (
          <p className="text-red-500">{t('form.error')}</p>
        ))}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                <X fill="red" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={form.handleSubmit(() => {
            // Use startTransition when manually dispatching the action
            startTransition(() => {
              formAction(new FormData(formRef.current!))
            })
            if (state.message.includes('success')) {
              form.reset()
            }
          })}
          className="flex flex-col justify-stretch gap-4 h-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.name')}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('form.namePlaceholder')}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.email')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.message')}</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-white"
                    placeholder={t('form.messagePlaceholder')}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-[#2d234b] hover:bg-[#2d234b]/90">
            {t('form.submit')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
