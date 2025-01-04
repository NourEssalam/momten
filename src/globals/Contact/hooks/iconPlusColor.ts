import type { GlobalAfterReadHook } from 'payload'
import type { Social } from '@/lib/types/contact'

const socialMediaColors: { [key: string]: string } = {
  FaFacebook: '#1877F2', // Facebook Blue
  FaInstagram: '#E4405F', // Instagram Gradient Pink
  FaTwitter: '#1DA1F2', // Twitter Blue
  FaYoutube: '#FF0000', // YouTube Red
}

export const iconPlusColor: GlobalAfterReadHook = async ({ doc }) => {
  // Read the socials array  and in each item find the iconPlusColor

  doc?.social.map((item: Social) => {
    if (!item.icon) {
      item.icon = `Fa${item.name}`
    }

    if (!item.color) {
      item.color = socialMediaColors[item.icon] //  as keyof typeof socialMediaColors
    }
  })
}
