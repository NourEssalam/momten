import type { CollectionAfterReadHook } from 'payload'
import type { Social } from '@/lib/types/contact'

const socialMediaColors: { [key: string]: string } = {
  FaFacebook: '#1877F2', // Facebook Blue
  FaInstagram: '#E4405F', // Instagram Gradient Pink
  FaTwitter: '#1DA1F2', // Twitter Blue
  FaYoutube: '#FF0000', // YouTube Red
  FaLinkedin: '#0077B5', // LinkedIn Blue
}

export const iconPlusColor: CollectionAfterReadHook = async ({ doc }) => {
  // Read the socials array  and in each item find the iconPlusColor

  doc?.socials.map((item: Social) => {
    if (!item.icon) {
      item.icon = `Fa${item.name}`
    }

    if (!item.color) {
      item.color = socialMediaColors[item.icon] //  as keyof typeof socialMediaColors
    }
  })
}
