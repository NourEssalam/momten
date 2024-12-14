import EventCard from "../shared-components/EventCard";
import { eventPlaceholder } from "@/lib/data-placeholders";
import { eventMetaDataType } from "@/lib/types/global-types";
import Container from "../shared-components/Container";

export default function EventUpcoming() {
  return (
    <Container variant="default">
      <h1 className="text-sm text-center font-medium uppercase tracking-widest mb-10 text-gray-500 ">
        upcoming events
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2  ">
        {eventPlaceholder.map((event: eventMetaDataType) => (
          <EventCard
            key={event.title}
            title={event.title}
            start={event.start}
            end={event.end}
            thumbnail={event.thumbnail}
            thumbnailAlt={event.thumbnailAlt}
            location={event.location}
          />
        ))}
      </div>
    </Container>
  );
}
