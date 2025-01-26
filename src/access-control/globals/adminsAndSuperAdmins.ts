import type { Access } from 'payload'

export const adminsAndSuperAdmins: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin' || user?.role === 'admin'
}
