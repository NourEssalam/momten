// import { CollectionBeforeOperationHook } from 'payload'

// export const checkLastSuperUser: CollectionBeforeOperationHook = async ({
//   req,
// }) => {
//   // ensure there is atleast one super-admin

//   const userCount = await req.payload.count({
//     collection: 'users',
//   })

//   if (userCount.totalDocs === 1) {
//     Error('You cannot delete the last super-admin')
//     return false
//   }
// }
