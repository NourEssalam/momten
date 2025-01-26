import { Language } from '@/i18n/routing'
import { format } from 'date-fns'
import { arTN } from 'date-fns/locale'

export const formatDate = (isoDate: string, locale: Language): string => {
  try {
    const date = new Date(isoDate)

    // Validate locale
    const selectedLocale = locale === 'ar' ? arTN : undefined

    // Use date-fns formatting
    return format(date, 'dd MMMM yyyy', { locale: selectedLocale })
  } catch (error) {
    console.error('Error formatting date:', error)
    return isoDate // Fallback to raw date if formatting fails
  }
}
