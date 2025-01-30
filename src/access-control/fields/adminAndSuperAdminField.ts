import type { FieldAccess } from 'payload'

export const adminAndSuperAdminField: FieldAccess = ({
  req: { user },
  doc,
  id,
}) => {
  // ensure only super-admin can change the role of super-admin
  if (user?.role !== 'super-admin' && doc?.role === 'super-admin') {
    return false
  }

  // Ensure the if the user is super-admin only him can change him role
  if (
    user?.role === 'super-admin' &&
    doc?.role === 'super-admin' &&
    user?.id !== id
  ) {
    return false
  }

  if (user?.role === 'admin' && user?.id === id) return false

  // ensure that
  return user?.role === 'super-admin' || user?.role === 'admin'
}
