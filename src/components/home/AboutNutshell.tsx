import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Container from "../shared-components/Container";

export default function AboutNutshell() {
  return (
    <Container
      variant="rounded-primary"
      innerClassName="flex flex-col justify-center items-center py-10"
    >
      <h1 className="text-sm text-center font-medium uppercase tracking-widest mb-10 text-shade">
        About Us
      </h1>
      <p
        className="text-center text-sm md:text-lg text-grey font-medium md:font-normal 
            lg:text-xl xl:text-3xl xl:px-10 leading-relaxed"
      >
        Momtan organization has developed a strategic and forward-looking plan,
        to simulate the sustainable development goals of economic, social and
        environmental dimensions. It extends from 2021 to 2030.
      </p>
      <div className="flex gap-4 lg:gap-8 mt-10">
        <Link
          href={"/about/mission"}
          className={`${buttonVariants({
            variant: "default",
          })} md:text-xl md:h-12 md:px-6`}
        >
          Our mission
        </Link>
        <Link
          href={"/about#team"}
          className={`${buttonVariants({
            variant: "secondary",
          })} md:text-xl md:h-12 md:px-6`}
        >
          Our team &darr;
        </Link>
      </div>
    </Container>
  );
}
