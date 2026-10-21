// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";

import type { PageName } from "./types/page";
import type { Category } from "./types/campus-event";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = selected.title;
    } else if (page === "events") {
      document.title = "Tüm Etkinlikler";
    } else if (page === "add") {
      document.title = "Etkinlik Ekle";
    } else if (page === "update") {
      document.title = "Etkinlik Güncelle";
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selected]);

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const categories: Category[] = Array.from(new Set(events.map((e) => e.category)));

  // Başlık Metinleri
  const getHeaderData = () => {
    if (page === "detail" && selected) return { title: selected.title };
    if (page === "events") return { title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." };
    if (page === "add") return { title: "Etkinlik Ekle" };
    if (page === "update") return { title: "Etkinlik Güncelle" };
    return { title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." };
  };

  const headerData = getHeaderData();

  return (
    <>
      <Header title={headerData.title} text={headerData.text} />
      <Navigation current={page} onNavigate={(p) => go(p)} />

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p style={{ marginTop: "1rem" }}>
              <button type="button" className="btn" onClick={() => go("events")}>
                Tüm etkinlikleri gör →
              </button>
            </p>
          </section>
        )}

        {page === "events" && (
          <section>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <p className="sonuc-metni">
              {filtered.length > 0
                ? `${filtered.length} etkinlik listeleniyor.`
                : "Aramanıza uygun etkinlik bulunamadı."}
            </p>
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </section>
        )}

        {page === "detail" && (
          <section>
            {!selected ? (
              <div className="hata-kutusu">
                <h2>Etkinlik bulunamadı</h2>
                <button type="button" className="btn" onClick={() => go("events")}>
                  Listeye dön
                </button>
              </div>
            ) : (
              <EventDetail
                event={selected}
                onBack={() => go("events")}
                onEdit={(id) => go("update", id)}
              />
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <EventForm
              onSubmit={() => window.scrollTo(0, 0)}
              initialData={selected}
              isUpdate={page === "update"}
            />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;