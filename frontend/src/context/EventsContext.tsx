// src/context/EventsContext.tsx
/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CampusEvent, EventFormData, Category } from "../types/campus-event";
import { initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function createEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim()
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    const newEvent = createEvent(`event-${Date.now()}`, data);
    setEvents((prev) => [...prev, newEvent]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...createEvent(id, data), image: e.image } : e
      )
    );
  }

  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents, EventsProvider içinde kullanılmalı.");
  }
  return context;
}
