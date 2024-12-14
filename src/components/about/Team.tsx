import Container from "../shared-components/Container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Member from "./Member";

export default function Team() {
  return (
    <Container>
      <div className="flex flex-col text-center w-full mb-6 sm:mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-shade-strong">
          Our Team
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-secondary">
          Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
          gentrify, subway tile poke farm-to-table. Franzen you probably haven't
          heard of them.
        </p>
      </div>
      {/* TODO : ADD REAL DATA AND */}
      <div className="w-[75%] sm:w-[80%] lg:w-full mx-auto  rounded-full p-6 sm:p-12">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <Member />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <Member />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <Member />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <Member />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <Member />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <Member />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Container>
  );
}
