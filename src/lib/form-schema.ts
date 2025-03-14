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
  name: z.string().trim().min(3, { message: 'Please enter your name.' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .min(1, { message: 'Please enter your email address.' }),
  message: z.string().min(50, {
    message: 'Please enter a message with at least 50 characters.',
  }),
})
