/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CollectionAfterChangeHook } from 'payload'

export const dynamicExcerpt: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  if (operation === 'create' || operation === 'update') {
    if (!doc?.content?.root?.children) {
      return
    }

    const rootChildren = doc.content.root.children

    if (rootChildren) {
      // Find the first paragraph in rootChildren
      const Perfectchild = rootChildren.find(
        (child: any) =>
          child?.type === 'paragraph' && child?.children[0].text?.length > 150,
      )

      if (Perfectchild) {
        doc.excerpt = Perfectchild.children[0].text.slice(0, 120) + '...'
      } else {
        const text = rootChildren.find(
          (child: any) => child?.type === 'paragraph',
        )

        doc.excerpt = text.children[0].text + '...'
      }
    }
  }
}
