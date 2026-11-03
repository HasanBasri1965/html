// src/pages/EditEventPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";
import type { EventFormData } from "../types/campus-event";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return <NotFoundPage />;
  }

  function handleSubmit(data: EventFormData) {
    if (id) {
      updateEvent(id, data);
      navigate("/admin");
    }
  }

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <EventForm
        initialData={{
          ...event,
          capacity: String(event.capacity)
        }}
        submitText="Güncelle"
        onSubmit={handleSubmit}
      />
    </>
  );
}
