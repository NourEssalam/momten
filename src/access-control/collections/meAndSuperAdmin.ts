import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const meAndSuperAdmin: isAuthenticated = ({ req: { user }, id }) => {
  return Boolean(user?.role === 'super-admin' || user?.id === id)
}
