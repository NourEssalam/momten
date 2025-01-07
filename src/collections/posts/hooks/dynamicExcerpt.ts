import type { CollectionAfterReadHook } from 'payload'

export const dynamicExcerpt: CollectionAfterReadHook = async ({ doc }) => {
  if (!doc?.content) {
    return
  }

  if (doc?.content) {
    const rootChildren = doc.content.root.children

    if (rootChildren) {
      // Find the first paragraph in rootChildren
      const Perfectchild = rootChildren.find(
        (child: any) => child?.type === 'paragraph' && child?.children[0].text?.length > 150,
      )

      if (Perfectchild) {
        doc.excerpt = Perfectchild.children[0].text.slice(0, 150) + '...'
      } else {
        doc.excerpt = rootChildren[0].children[0].text
      }
    }
  }
}
