import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => Promise<boolean>

export const adminAndSuperAdmin: isAuthenticated = async ({
  req: { user },
}) => {
  return user?.role === 'super-admin' || user?.role === 'admin'
}
