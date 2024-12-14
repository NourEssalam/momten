import { socials } from "@/lib/menus";
import Image from "next/image";
import Link from "next/link";
export default function Member() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-1">
      <div className="w-28 h-28 rounded-full overflow-hidden">
        <Image
          src="/img/team/woman-1.jpg"
          alt="Bonnie Avatar"
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="mb-1 text-2xl font-semi-bold tracking-tight text-shade-strong">
        Fraj nour el-salam ben slimen
      </h3>
      <p className="text-secondary">CEO/Co-founder</p>
      <ul className="flex justify-center gap-4 mt-4">
        {socials.map((social) => (
          <li key={social.name}>
            <Link
              href={social.href}
              className="text-sm hover:text-accent transition-colors duration-300"
            >
              <social.Icon className="w-5 h-5 " />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
