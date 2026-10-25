import AboutNutshell from '@/components/home/AboutNutshell'
import Hero from '@/components/home/Hero'
import { queryHeroPhotos } from '@/components/home/queryHeroPhotos'
import PartnersWrapper from '@/components/home/partners/partnersWrapper'
import SignUp from '@/components/home/SignUp'
import { Language } from '@/i18n/routing'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Language }>
}) {
  const { locale } = await params
  const photos = await queryHeroPhotos()
  return (
    <>
      <Hero locale={locale} photos={photos} />
      <PartnersWrapper />
      <AboutNutshell />
      <SignUp />
    </>
  )
}
