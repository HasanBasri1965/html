// src/components/events/EventList.tsx
import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

export default function EventList({
  events,
  emptyText = "Gösterilecek etkinlik yok."
}: {
  events: CampusEvent[];
  emptyText?: string;
}) {
  if (events.length === 0) {
    return <p className="sonuc">{emptyText}</p>;
  }

  return (
    <section className="etkinlik-listesi" aria-label="Etkinlikler">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
