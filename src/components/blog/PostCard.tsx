"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/payload-types";

export default function PostCard({ id, title, image }: Post) {
  const [onHover, setOnHover] = useState(false);
  type PostImage = Exclude<typeof image, string>; // Removes string from the union type

  const mediaImage = image as PostImage; // Explicitly cast

  return (
    <Link
      href={`/blog/${id}/`}
      className="flex flex-col gap-4 p-4 w-full sm:max-w-sm"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div className="sm:w-80 sm:h-80 w-60  h-60  relative inset-0 rounded-3xl overflow-hidden">
        <Image
          src={mediaImage.url}
          alt={mediaImage.alt}
          width={400}
          height={400}
          className={`w-full h-full object-cover absolute inset-0 -z-10 ${
            onHover
              ? "scale-105 transition-all duration-300"
              : "transition-all duration-300"
          }`}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <span className="text-sm text-secondary">Apr 8, 2022</span>
        <h3
          className={`text-xl font-bold text-shade  ${
            onHover && "text-tint-tint-strong underline"
          }`}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}
