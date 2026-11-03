// src/pages/EventsPage.tsx
import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const categories = [...new Set(events.map((e) => e.category))];

  const filteredEvents = events.filter((e) => {
    const s = searchText.trim().toLowerCase();
    const matchesSearch =
      s === "" ||
      e.title.toLowerCase().includes(s) ||
      e.description.toLowerCase().includes(s);
    const matchesCategory = category === "" || e.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <EventFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        categories={categories}
        onCategoryChange={setCategory}
      />
      {filteredEvents.length > 0 && (
        <p className="sonuc">{filteredEvents.length} etkinlik listeleniyor.</p>
      )}
      <EventList
        events={filteredEvents}
        emptyText="Aramanıza uygun etkinlik bulunamadı."
      />
    </>
  );
}
