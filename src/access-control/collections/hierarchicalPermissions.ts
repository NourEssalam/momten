import type { Access, Where } from 'payload'

export const hierarchicalPermissions: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if (user?.id === id) return true

  // super admin can update any user but not another super admin
  // the new create super admin take created data and he can update himself

  // query of the doc is not a superadmin
  const notSuperAdminDoc: Where = {
    and: [
      {
        id: { equals: id },
      },
      {
        role: {
          not_equals: 'super-admin',
        },
      },
    ],
  }

  if (user?.role === 'super-admin') {
    return notSuperAdminDoc
  }

  // Admin can update only editors

  const isEditorDoc: Where = {
    and: [
      {
        id: { equals: id },
      },
      {
        role: {
          equals: 'editor',
        },
      },
    ],
  }

  if (user?.role === 'admin') {
    return isEditorDoc
  }

  return false
}
