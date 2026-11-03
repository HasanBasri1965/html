// src/pages/AddEventPage.tsx
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import type { EventFormData } from "../types/campus-event";

const initialData: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: ""
};

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleSubmit(data: EventFormData) {
    addEvent(data);
    navigate("/admin");
  }

  return (
    <EventForm
      initialData={initialData}
      submitText="Kaydet"
      onSubmit={handleSubmit}
    />
  );
}
