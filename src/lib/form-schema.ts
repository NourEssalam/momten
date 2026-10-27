import { z } from 'zod'

export const newsLetterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Please enter your name.' })
    .regex(/^[A-Za-z ]+$/, {
      message: 'Name must contain only alphabets and spaces.',
    }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .min(1, { message: 'Please enter your email address.' }),
  option: z.enum(
    [
      'Friends and family',
      'Youtube',
      'Social media',
      'One of our programs or events',
      'Other',
    ],
    {
      message: 'Please select an option.',
    },
  ),
})

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'nameRequired' })
    .max(100, { message: 'nameTooLong' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'emailRequired' })
    .email({ message: 'emailInvalid' })
    .max(254, { message: 'emailInvalid' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'messageTooShort' })
    .max(3000, { message: 'messageTooLong' }),
  // Honeypot: real users never see or fill this.
  website: z.string().optional(),
})
