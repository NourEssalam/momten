'use client'

import Image from 'next/image'
import { useActionState, useRef, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLocale, useTranslations } from 'next-intl'
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  User,
  Users,
} from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { newsLetterSchema } from '@/lib/form-schema'
import { onSubmitAction } from '@/actions/addSubscriber'
import { cn } from '@/lib/cn'

const OPTIONS = [
  'Friends and family',
  'Youtube',
  'Social media',
  'One of our programs or events',
  'Other',
]

// shared look for the three fields (icon sits at the start edge)
const fieldBox =
  'h-11 rounded-lg border border-tint-tint-strong bg-white ps-10 text-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30'
const fieldIcon =
  'pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-shade'

export default function SignUp() {
  const t = useTranslations('Newsletter')
  const isAr = useLocale() === 'ar'

  const [state, formAction] = useActionState(onSubmitAction, { message: '' })
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof newsLetterSchema>>({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: { name: '', email: '' },
  })
  const formRef = useRef<HTMLFormElement>(null)

  const succeeded = state.message.includes('success')

  return (
    <section id="sign-up" className="container scroll-mt-24">
      <div className="grid overflow-hidden rounded-3xl border border-tint bg-white lg:grid-cols-[1.2fr_1fr]">
        {/* Text + form */}
        <div className="flex flex-col justify-center p-6 text-center md:p-10 lg:text-start">
          {succeeded ? (
            <div className="flex flex-col items-center gap-3 py-8 lg:items-start">
              <CheckCircle2 className="h-12 w-12 text-green-500" aria-hidden />
              <h2 className="text-2xl font-bold text-shade-strong first-letter:uppercase sm:text-3xl">
                {t('congratsMessage')}
              </h2>
              <p className="text-grey-medium">{t('congratsSubText')}</p>
            </div>
          ) : (
            <>
              <span
                className={cn(
                  'mb-3 text-xs font-semibold uppercase text-primary',
                  // letter-spacing breaks Arabic letter joining
                  !isAr && 'tracking-[0.2em]',
                )}
              >
                {t('eyebrow')}
              </span>
              <h2 className="mb-3 text-2xl font-bold text-shade-strong sm:text-3xl">
                {t('heading')}
              </h2>
              <p className="mb-6 text-grey-medium">{t('lead')}</p>

              {state?.message && !state.issues && (
                <p
                  role="alert"
                  className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                >
                  {state.message.includes('already')
                    ? t('error.alreadySubscribed')
                    : state.message}
                </p>
              )}
              {state?.issues && (
                <ul
                  role="alert"
                  className="mb-4 list-inside list-disc rounded-lg bg-red-50 px-4 py-3 text-start text-sm text-red-600"
                >
                  {state.issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              )}

              <Form {...form}>
                <form
                  ref={formRef}
                  action={formAction}
                  className="grid grid-cols-1 gap-4 text-start sm:grid-cols-2"
                  onSubmit={form.handleSubmit(() => {
                    startTransition(() => {
                      formAction(new FormData(formRef.current!))
                    })
                  })}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">{t('name')}</FormLabel>
                        <div className="relative">
                          <User className={fieldIcon} aria-hidden />
                          <FormControl>
                            <Input
                              type="text"
                              placeholder={t('namePlaceholder')}
                              className={fieldBox}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">{t('email')}</FormLabel>
                        <div className="relative">
                          <Mail className={fieldIcon} aria-hidden />
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t('emailPlaceholder')}
                              className={fieldBox}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="option"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">{t('option')}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <div className="relative">
                            <Users className={fieldIcon} aria-hidden />
                            <FormControl>
                              <SelectTrigger
                                className={cn(
                                  fieldBox,
                                  'font-medium text-secondary',
                                )}
                              >
                                <SelectValue
                                  placeholder={t('optionPlaceholder')}
                                />
                              </SelectTrigger>
                            </FormControl>
                          </div>
                          <SelectContent>
                            {OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {t(`options.${option}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="h-11 gap-2 self-start text-base font-semibold"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        {t('isPending')}
                      </>
                    ) : (
                      <>
                        {t('submit')}
                        <ArrowRight
                          className="h-4 w-4 rtl:rotate-180"
                          aria-hidden
                        />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>

        {/* Photo */}
        <div className="relative m-4 min-h-[16rem] overflow-hidden rounded-2xl lg:m-5 lg:ms-0 lg:min-h-full">
          <Image
            src="/img/gallery/activities.jpg"
            alt="activities"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
