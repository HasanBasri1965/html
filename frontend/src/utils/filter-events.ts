// src/utils/filter-events.ts
import type { CampusEvent, Category } from "../types/campus-event";

export function filterBySearch(events: CampusEvent[], text: string): CampusEvent[] {
  const query = text.toLowerCase().trim();
  if (!query) return events;
  return events.filter(
    (e) =>
      e.title.toLowerCase().includes(query) ||
      e.description.toLowerCase().includes(query)
  );
}

export function filterByCategory(events: CampusEvent[], category: Category | string): CampusEvent[] {
  if (!category) return events;
  return events.filter((e) => e.category === category);
}

export function searchEvents(events: CampusEvent[], text: string): CampusEvent[] {
  return filterBySearch(events, text);
}

export function filterEvents(events: CampusEvent[], category: Category | ""): CampusEvent[] {
  return filterByCategory(events, category);
}