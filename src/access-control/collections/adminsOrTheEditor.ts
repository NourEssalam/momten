import type { Access, Where } from 'payload'

export const adminsOrTheEditor: Access = ({ req: { user }, id }) => {
  if (user?.role === 'super-admin' || user?.role === 'admin') return true

  const query: Where = {
    and: [
      {
        id: {
          equals: id,
        },
      },
      {
        'authors.id': {
          contains: user?.id,
        },
      },
    ],
  }
  return query
}
