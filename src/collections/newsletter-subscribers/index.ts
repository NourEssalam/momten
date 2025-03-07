import type { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: {
    singular: {
      en: 'Newsletter Subscriber',
      ar: 'مشترك في النشرة البريدية',
      fr: 'Abonné à la newsletter',
    },
    plural: {
      en: 'Newsletter Subscribers',
      ar: 'مشتركون في النشرة البريدية',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'option', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'option',
      type: 'select',
      options: [
        {
          value: 'Friends and family',
          label: 'Friends and family',
        },
        {
          value: 'Youtube',
          label: 'Youtube',
        },
        {
          value: 'Social media',
          label: 'Social media',
        },
        {
          value: 'One of our programs or events',
          label: 'One of our programs or events',
        },
        {
          value: 'Other',
          label: 'Other',
        },
      ],
      required: true,
    },
  ],
}
