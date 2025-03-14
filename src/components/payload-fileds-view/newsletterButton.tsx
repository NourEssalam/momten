'use client'
import { useState } from 'react'
import { sendToSubscribers } from '@/actions/sendToSubscribers'
import { useLocale, Button, useDocumentInfo } from '@payloadcms/ui'
import { Language } from '@/i18n/routing'

export function NewsletterButton() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const locale = useLocale()
  const { id } = useDocumentInfo()

  const buttonTitle: { [key: string]: string } = {
    en: 'Send as Newsletter',
    ar: 'ارسل كنشرة إخبارية',
    fr: 'Envoyer comme lettre de presse',
  }

  const fieldDescription: { [key: string]: string } = {
    en: 'Please use this feature with caution, it will send a newsletter to all subscribers',
    ar: 'يرجى استخدام هذه الميزة بحذر، سيتم ارسال نشرة اخبارية لجميع المشتركين',
    fr: 'Veuillez utiliser cette fonctionnalité avec prudence, elle enverra une lettre de presse aux abonnés',
  }

  const caution: { [key: string]: string } = {
    en: 'Please save your changes before using this feature',
    ar: 'يرجى حفظ التغييرات قبل استخدام هذه الميزة',
    fr: "Veuillez enregistrer vos modifications avant d'utiliser cette fonctionnalité",
  }

  const statusMessages: { [key: string]: { success: string; error: string } } =
    {
      en: {
        success: 'Newsletter sent successfully!',
        error: 'Failed to send newsletter. Please try again.',
      },
      ar: {
        success: 'تم إرسال النشرة الإخبارية بنجاح!',
        error: 'فشل في إرسال النشرة الإخبارية. حاول مرة اخرى.',
      },
      fr: {
        success: 'Lettre de presse envoyée avec succès!',
        error: "Échec de l'envoi de la lettre de presse. Veuillez réessayer.",
      },
    }

  const handleSendNewsletter = async () => {
    if (!id) return

    setLoading(true)
    setStatus('idle')
    setMessage('')

    try {
      // Artificial delay to give feedback to the user
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const result = await sendToSubscribers(
        id as string,
        locale.code as Language,
      )

      if (!result.success) {
        setStatus('error')
        setMessage(statusMessages[locale.code].error)
        return
      }

      setStatus('success')
      setMessage(statusMessages[locale.code].success)
    } catch (error) {
      console.error('Error sending newsletter:', error)
      setStatus('error')
      setMessage(statusMessages[locale.code].error)
    } finally {
      setLoading(false)
    }
  }

  if (!id) return null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid red',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <p style={{ color: 'yellow' }}>{caution[locale.code]}</p>
      <p>{fieldDescription[locale.code]}</p>

      {status !== 'idle' && (
        <div
          style={{
            padding: '0.5rem',
            marginBottom: '0.5rem',
            backgroundColor:
              status === 'success'
                ? 'rgba(0, 128, 0, 0.1)'
                : 'rgba(255, 0, 0, 0.1)',
            color: status === 'success' ? 'green' : 'red',
            borderRadius: '4px',
          }}
        >
          {message}
        </div>
      )}

      <Button
        onClick={handleSendNewsletter}
        buttonStyle="primary"
        disabled={loading}
      >
        {loading ? (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LoadingSpinner />
            <span style={{ marginLeft: '0.5rem' }}>
              {locale.code === 'en'
                ? 'Sending...'
                : locale.code === 'ar'
                  ? 'جاري الإرسال...'
                  : 'Envoi en cours...'}
            </span>
          </span>
        ) : (
          buttonTitle[locale.code]
        )}
      </Button>
    </div>
  )
}

// Simple loading spinner component
function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeDasharray="60 30"
      />
    </svg>
  )
}
