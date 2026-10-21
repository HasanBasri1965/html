// src/components/events/EventDetail.tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <h2>{event.title}</h2>
      <div className="detay-konteyner">
        {event.image && (
          <figure style={{ margin: 0 }}>
            <img src={event.image} alt={`${event.title} Afişi`} className="afis-resmi" />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}

        <div className="kunye-kutusu">
          <h3>Etkinlik Künyesi</h3>
          <dl>
            <dt><strong>Tarih:</strong></dt>
            <dd>{formatDate(event.date)}, {event.time}</dd>
            <dt><strong>Yer:</strong></dt>
            <dd>{event.location}</dd>
            <dt><strong>Kategori:</strong></dt>
            <dd>{event.category}</dd>
            <dt><strong>Kontenjan:</strong></dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </div>
      </div>

      <h3>Açıklama</h3>
      <p>{event.description}</p>

      <div style={{ marginTop: "1.5rem" }}>
        <button type="button" className="btn" onClick={onBack}>
          ← Listeye dön
        </button>
        <button
          type="button"
          className="btn"
          style={{ marginLeft: "0.5rem" }}
          onClick={() => onEdit(event.id)}
        >
          Bu etkinliği güncelle
        </button>
      </div>
    </article>
  );
}

export default EventDetail;