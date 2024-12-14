import { infoIntroType } from "@/lib/types/global-types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Zpattern({
  title,
  description,
  image,
  links,
  zorder,
}: infoIntroType & {
  zorder: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 ">
      <div className={`${zorder % 2 !== 0 ? " md:order-last" : ""} max-w-sm`}>
        <Image
          src={image.src}
          alt={image.alt}
          width={1000}
          height={1000}
          className=" w-full h-full object-fit rounded-3xl "
        />
      </div>
      <div className="flex flex-col  justify-center items-start md:text-left">
        <h1 className="text-xl sm:text-2xl lg:text-3xl leading-6 mb-8">
          {title}
        </h1>
        <p
          className="text-sm text-gray-600 
                      sm:text-lg
                      lg:text-2xl
                      "
        >
          {description}
        </p>
        <div className="flex gap-4 lg:gap-8 mt-10">
          {links.map((link, index) => (
            <Button
              key={link.text}
              asChild
              variant={`${index % 2 !== 0 ? "secondary" : "default"}`}
            >
              <Link href={`/about${link.url}`}>{link.text}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
