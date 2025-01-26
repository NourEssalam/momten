import type { FieldAccess } from 'payload'

export const superAdminField: FieldAccess = ({ req: { user } }) => {
  return user?.role === 'super-admin'
}
