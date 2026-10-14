// frontend/src/utils/filter-events.ts
import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  if (!q) return list;
  return list.filter(
    (e) =>
      e.title.toLocaleLowerCase("tr-TR").includes(q) ||
      e.description.toLocaleLowerCase("tr-TR").includes(q) ||
      e.location.toLocaleLowerCase("tr-TR").includes(q)
  );
}

export function filterByCategory(list: CampusEvent[], category: Category | ""): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

export function findEventById(list: CampusEvent[], id: string): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}

export function formatDate(tarihStr: string): string {
  if (!tarihStr) return "";
  const parts = tarihStr.split("-");
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  }
  return tarihStr;
}