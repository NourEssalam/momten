'use client'

import { useState, useTransition, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema } from '@/lib/form-schema'
import {
  onSubmitAction,
  type ContactField,
  type ContactState,
} from '@/actions/contactAction'

type ContactValues = z.infer<typeof contactSchema>

const ERROR_KEYS = {
  nameRequired: 'form.errors.nameRequired',
  nameTooLong: 'form.errors.nameTooLong',
  emailRequired: 'form.errors.emailRequired',
  emailInvalid: 'form.errors.emailInvalid',
  messageTooShort: 'form.errors.messageTooShort',
  messageTooLong: 'form.errors.messageTooLong',
} as const
type ErrorCode = keyof typeof ERROR_KEYS
const isErrorCode = (value: string): value is ErrorCode => value in ERROR_KEYS

const BANNER_KEYS = {
  invalid: 'form.invalid',
  unavailable: 'form.unavailable',
  failed: 'form.error',
} as const

const fieldClass =
  'rounded-xl border border-tint-tint-strong bg-white px-4 text-base placeholder:text-grey-light focus-visible:border-primary focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 aria-[invalid=true]:border-destructive'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-shade-strong"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const t = useTranslations('ContactPage')
  const [state, setState] = useState<ContactState>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '', website: '' },
  })

  const errorText = (message?: string) =>
    message
      ? isErrorCode(message)
        ? t(ERROR_KEYS[message])
        : message
      : undefined

  const onSubmit = handleSubmit((values) => {
    setState({ status: 'idle' })
    startTransition(async () => {
      const body = new FormData()
      body.set('name', values.name)
      body.set('email', values.email)
      body.set('message', values.message)
      body.set('website', values.website ?? '')

      const result = await onSubmitAction(body)
      setState(result)

      if (result.status === 'success') {
        reset()
      } else if (result.status === 'error' && result.fields) {
        for (const [field, message] of Object.entries(result.fields)) {
          setError(field as ContactField, { message })
        }
      }
    })
  })

  return (
    <div className="rounded-3xl border border-tint bg-white p-6 shadow-xl shadow-primary/10 sm:p-8">
      <h2 className="mb-6 text-xl font-bold text-shade-strong">
        {t('form.title')}
      </h2>

      <form onSubmit={onSubmit} noValidate className="relative space-y-5">
        <Field
          id="contact-name"
          label={t('form.name')}
          error={errorText(errors.name?.message)}
        >
          <Input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder={t('form.namePlaceholder')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={`h-12 ${fieldClass}`}
            {...register('name')}
          />
        </Field>

        <Field
          id="contact-email"
          label={t('form.email')}
          error={errorText(errors.email?.message)}
        >
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder={t('form.emailPlaceholder')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={`h-12 ${fieldClass}`}
            {...register('email')}
          />
        </Field>

        <Field
          id="contact-message"
          label={t('form.message')}
          error={errorText(errors.message?.message)}
        >
          <Textarea
            id="contact-message"
            rows={6}
            placeholder={t('form.messagePlaceholder')}
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? 'contact-message-error' : undefined
            }
            className={`min-h-40 resize-y py-3 ${fieldClass}`}
            {...register('message')}
          />
        </Field>

        {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
        <div
          aria-hidden="true"
          className="absolute -start-[9999px] h-0 w-0 overflow-hidden"
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
          />
        </div>

        {state.status === 'success' && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-2xl border border-tint bg-section p-4 text-shade-strong"
          >
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <p className="text-sm font-medium">{t('form.success')}</p>
          </div>
        )}

        {state.status === 'error' && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800"
          >
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm font-medium">
              {t(BANNER_KEYS[state.reason])}
            </p>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          aria-busy={isPending}
          className="h-auto w-full gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary/90 sm:w-auto"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t('form.sending')}
            </>
          ) : (
            <>
              {t('form.submit')}
              <ArrowRight
                className="h-4 w-4 rtl:rotate-180"
                aria-hidden="true"
              />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
