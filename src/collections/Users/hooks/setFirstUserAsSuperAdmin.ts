import { User } from '@/payload-types'
import type { FieldHook } from 'payload'

export const setFirstUserAsSuperAdmin: FieldHook<
  { role: string } & User
> = async ({ operation, req, value }) => {
  if (operation === 'create') {
    const userCount = await req.payload.count({
      collection: 'users',
    })

    // If no users exist, make this user a Super Admin
    if (userCount.totalDocs === 0) {
      value = 'super-admin'
    }
    return value
  }
  // This is in case there is only one user it enusres that the user is a super admin
  if (operation === 'update') {
    const userCount = await req.payload.count({
      collection: 'users',
    })

    if (userCount.totalDocs === 1) {
      value = 'super-admin'
    }
    return value
  }
}
