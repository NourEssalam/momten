import { BarChart3, BookOpen, Heart, Target, User, Users } from 'lucide-react'

// Full class strings (not built dynamically) so Tailwind keeps them.
// `match` is checked against the page slug; if nothing matches, themes are used in order.
const THEMES = [
  { match: ['histor'], Icon: BookOpen, card: 'border-indigo-300 bg-indigo-50/60', icon: 'bg-indigo-100 text-indigo-600' },
  { match: ['impact'], Icon: BarChart3, card: 'border-orange-300 bg-orange-50/60', icon: 'bg-orange-100 text-orange-600' },
  { match: ['value'], Icon: Heart, card: 'border-green-300 bg-green-50/60', icon: 'bg-green-100 text-green-600' },
  { match: ['vision'], Icon: Target, card: 'border-blue-300 bg-blue-50/60', icon: 'bg-blue-100 text-blue-600' },
  { match: ['mission'], Icon: Users, card: 'border-purple-300 bg-purple-50/60', icon: 'bg-purple-100 text-purple-600' },
  { match: ['who', 'we-are'], Icon: User, card: 'border-pink-300 bg-pink-50/60', icon: 'bg-pink-100 text-pink-600' },
]

export const pickTheme = (slug: string, index: number) => {
  const s = (slug || '').toLowerCase()
  return THEMES.find((t) => t.match.some((m) => s.includes(m))) ?? THEMES[index % THEMES.length]
}
