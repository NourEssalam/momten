import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const onlySuperAdmin: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user?.role === 'super-admin')
}
