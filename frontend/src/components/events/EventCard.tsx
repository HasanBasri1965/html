// src/components/events/EventCard.tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p><strong>{event.category}</strong></p>
      <p>Tarih: {formatDate(event.date)}, {event.time}</p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <p>
        <a
          href={`#${event.id}`}
          onClick={(e) => {
            e.preventDefault();
            onShowDetail(event.id);
          }}
        >
          Detayları gör →
        </a>
      </p>
    </article>
  );
}

export default EventCard;