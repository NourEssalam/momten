import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import Container from '../shared-components/Container'
import { useTranslations } from 'next-intl'
export default function AboutNutshell() {
  const t = useTranslations('AboutNutshell')
  return (
    <Container
      variant="rounded-primary"
      innerClassName="flex flex-col justify-center items-center py-10"
    >
      <h1 className={`text-xl text-center font-medium uppercase tracking-widest mb-10 text-shade`}>
        {t('title')}
      </h1>
      <p
        className="text-center text-sm md:text-lg text-grey font-medium md:font-normal 
            lg:text-xl xl:text-3xl xl:px-10 leading-relaxed"
      >
        {t('desc')}
      </p>
      <div className="flex gap-4 lg:gap-8 mt-10">
        <Link
          href={'/about/mission'}
          className={`${buttonVariants({
            variant: 'default',
          })} md:text-xl md:h-12 md:px-6`}
        >
          {t('ourMission')}
        </Link>
        <Link
          href={'/about#team'}
          className={`${buttonVariants({
            variant: 'secondary',
          })} md:text-xl md:h-12 md:px-6`}
        >
          {t('ourteam')} &darr;
        </Link>
      </div>
    </Container>
  )
}
