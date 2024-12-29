'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { contactSchema } from '@/lib/form-schema'
import Container from '@/components/shared-components/Container'
import { Textarea } from '@/components/ui/textarea'
import { contactInfo, socials } from '@/lib/menus'
import Link from 'next/link'
import { contactInfoType } from '@/lib/types/menu-types'
import { useTranslations } from 'next-intl'
export default function Contact() {
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
    <Container>
      <div className="flex flex-col mb-4">
        <h1 className="text-4xl font-medium text-shade-strong leading-6 mb-8">{t('title')}</h1>
        <p className="text-base max-w-xl  font-light text-secondary">{t('subTitle')}</p>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-5 lg:gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              console.log(values)
            })}
            className="grid grid-cols-1 gap-4 "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.name')}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={t('form.namePlaceholder')} {...field} />
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
                    <Input type="email" placeholder={t('form.emailPlaceholder')} {...field} />
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

        <div className="flex flex-col gap-10 justify-between md:p-5">
          <address className="contacts flex flex-col gap-4 ">
            {contactInfo.map((info: contactInfoType) => (
              <Link
                className={`${
                  info.type === 'address' ? 'font-medium' : 'font-normal hover:text-accent'
                } text-lg inline-block text-grey  transition-colors duration-300`}
                href={!info.link ? '#' : info.link}
                key={info.value}
              >
                {info.value}
              </Link>
            ))}
          </address>
          <ul className="flex gap-8">
            {socials.map((social) => (
              <li key={social.name}>
                <Link
                  href={social.href}
                  className=" text-grey hover:text-accent transition-colors duration-300"
                >
                  <social.Icon className="w-10 h-10 " />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
