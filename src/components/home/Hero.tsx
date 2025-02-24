import Image from 'next/image'
import { buttonVariants } from '../ui/button'
import { Language, Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
export default function Hero({ locale }: { locale: Language }) {
  const t = useTranslations('Hero')
  return (
    <section className="  bg-white w-full lg:h-[40rem] ">
      {/* content */}
      <div className="container flex flex-col  lg:flex-row  lg:gap-20  gap-10 items-center  justify-center ">
        <div
          className={`flex flex-col items-center justify-center  
                   text-secondary   -tracking-tight
                   md:px-10
                   lg:items-start text-center lg:mb-28 
                   ${locale === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}
        >
          <h1
            className={`${
              locale === 'ar'
                ? 'text-3xl  2xs:text-4xl sm:text-5xl md:text-6xl  leading-normal '
                : 'text-2xl md:text-3xl sm:text-3xl lg:text-4xl leading-7  '
            } mb-8 font-bold `}
          >
            {t('title')}
          </h1>
          <p
            className="text-lg text-gray-900 
                      sm:text-xl
                      lg:text-base"
          >
            {t('desc')}
          </p>

          <div className="flex gap-4 lg:gap-8 mt-10">
            <Link
              href={'#sign-up'}
              className={`${buttonVariants({
                variant: 'default',
              })} md:text-xl md:h-12 md:px-4`}
            >
              {t('subscribeButton')} &darr;
            </Link>
            <Link
              href={'/about'}
              className={`${buttonVariants({
                variant: 'secondary',
              })} md:text-xl md:h-12 md:px-4`}
            >
              {t('learnMoreButton')} &darr;
            </Link>
          </div>
        </div>

        <Image
          src="/img/Hero.webp"
          alt="hero image"
          width="250"
          height="250"
          // fill={true}
          sizes="(max-width : 768px) 50vw, 50vw"
          className="w-full h-auto md:w-[50%] md:h-[50%]  lg:w-full  xl:w-[50%]  object-cover "
        />
      </div>
    </section>
  )
}
