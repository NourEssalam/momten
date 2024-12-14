import Container from "@/components/shared-components/Container";
import { BlogPostType } from "@/lib/types/global-types";
import config from "@payload-config";
import type { Metadata } from "next";
import Image from "next/image";
import BackLink from "@/components/shared-components/BackLink";
import { getPayload } from "payload";
import ShareMenu from "@/components/blog/ShareMenu";
import { RichText } from "@payloadcms/richtext-lexical/react";

// export async function generateMetadata(props: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const params = await props.params;
//   const post = blogPosts.find((item) => item.slug === params.slug);

//   if (post === undefined) {
//     return {
//       title: "Post not found",
//     };
//   }

//   return {
//     title: post?.title,
//   };
// }

// export async function generateStaticParams() {
//   return blogPosts.map((item: BlogPostType) => ({
//     slug: item.slug,
//   }));
// }

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const payload = await getPayload({ config });
  const post = await payload.findByID({
    collection: "posts", // required
    id: params.slug, // required
    depth: 2,
    // locale: "en",
    fallbackLocale: false,
    // showHiddenFields: true,
  });

  if (!post) {
    return <p>Post not found</p>;
  }

  type PostImage = Exclude<typeof post.image, string>; // Removes string from the union type

  const mediaImage = post.image as PostImage; // Explicitly cast

  return (
    <section className="flex flex-col gap-2 xl:gap-10 justify-center items-center">
      <Container className="flex flex-col gap-10 mb-0 pb-0 ">
        <BackLink />
        <h1 className="text-4xl text-secondary  font-medium sm:text-5xl lg:text-7xl   ">
          {post.title}
        </h1>
        {/* meta data */}
        <div className="flex gap-4 items-center px-5">
          {/* <span className=" text-grey-light underline">{post.publishDate}</span>
          <span className=" text-grey-light">By {post.author}</span> */}
          <ShareMenu />
        </div>
        <div className="relative w-full h-96  overflow-hidden  rounded-3xl">
          <Image
            src={mediaImage.url}
            alt={mediaImage.alt}
            fill
            sizes="100vw"
            className="w-full h-full object-fill absolute inset-0 -z-10"
          />
        </div>
      </Container>

      <Container className="mt-0 pt-0">
        <RichText
          className="text-xl md:text-2xl p-5 text-grey !leading-relaxed tracking-normal"
          data={post.content}
        />
      </Container>
    </section>
  );
}
