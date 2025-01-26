import AboutNutshell from '@/components/home/AboutNutshell'
import Hero from '@/components/home/Hero'
import PartnersWrapper from '@/components/home/partners/partnersWrapper'
import SignUp from '@/components/home/SignUp'
import { Language } from '@/i18n/routing'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Language }>
}) {
  const { locale } = await params
  return (
    <>
      <Hero locale={locale} />
      <PartnersWrapper />
      <AboutNutshell />
      <SignUp />
    </>
  )
}
