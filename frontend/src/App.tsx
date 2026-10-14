// src/App.tsx
import React, { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById, formatDate } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

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

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p><strong>{event.category}</strong></p>
        <p>Tarih: {formatDate(event.date)}, {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <p>
          <a
            href={`#${event.id}`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              go("detail", event.id);
            }}
          >
            Detayları gör →
          </a>
        </p>
      </article>
    );
  }

  const categories: Category[] = Array.from(new Set(events.map((e: any) => e.category)));

  return (
    <>
      <header className="site-baslik">
        <h1>
          {page === "detail" && selected
            ? selected.title
            : page === "events"
            ? "Tüm Etkinlikler"
            : page === "add"
            ? "Etkinlik Ekle"
            : page === "update"
            ? "Etkinlik Güncelle"
            : "Kampüs Etkinlikleri"}
        </h1>
        {page === "home" && <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>}
        {page === "events" && <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>}
        <nav className="menu">
          <a
            href="#home"
            aria-current={page === "home" ? "page" : undefined}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              go("home");
            }}
          >
            Ana Sayfa
          </a>
          <a
            href="#events"
            aria-current={page === "events" ? "page" : undefined}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              go("events");
            }}
          >
            Etkinlikler
          </a>
          <a
            href="#add"
            aria-current={page === "add" ? "page" : undefined}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              go("add");
            }}
          >
            Ekle
          </a>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-grid iki-kolon">{upcoming.map(renderCard)}</div>
            <p style={{ marginTop: "1rem" }}>
              <a
                href="#events"
                className="btn"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör →
              </a>
            </p>
          </section>
        )}

        {page === "events" && (
          <section>
            <form className="filtre" onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn: atölye, kariyer..."
                  value={searchText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat: Category) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p className="sonuc-metni">
              {filtered.length > 0
                ? `${filtered.length} etkinlik listeleniyor.`
                : "Aramanıza uygun etkinlik bulunamadı."}
            </p>

            <div className="etkinlik-grid uc-kolon">{filtered.map(renderCard)}</div>
          </section>
        )}

        {page === "detail" && (
          <section>
            {!selected ? (
              <div className="hata-kutusu">
                <h2>Etkinlik bulunamadı</h2>
                <p>Belirtilen numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
                <p>
                  <a
                    href="#events"
                    className="btn"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      go("events");
                    }}
                  >
                    Listeye dön
                  </a>
                </p>
              </div>
            ) : (
              <div>
                <h2>{selected.title}</h2>
                <div className="detay-konteyner">
                  {selected.image && (
                    <figure style={{ margin: 0 }}>
                      <img src={selected.image} alt={`${selected.title} Afişi`} className="afis-resmi" />
                      <figcaption>{selected.title} afişi</figcaption>
                    </figure>
                  )}

                  <div className="kunye-kutusu">
                    <h3>Etkinlik Künyesi</h3>
                    <dl>
                      <dt>
                        <strong>Tarih:</strong>
                      </dt>
                      <dd>
                        {formatDate(selected.date)}, {selected.time}
                      </dd>
                      <dt>
                        <strong>Yer:</strong>
                      </dt>
                      <dd>{selected.location}</dd>
                      <dt>
                        <strong>Kategori:</strong>
                      </dt>
                      <dd>{selected.category}</dd>
                      <dt>
                        <strong>Kontenjan:</strong>
                      </dt>
                      <dd>{selected.capacity} kişi</dd>
                    </dl>
                  </div>
                </div>

                <h3>Açıklama</h3>
                <p>{selected.description}</p>

                <div style={{ marginTop: "1.5rem" }}>
                  <a
                    href="#events"
                    className="btn"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      go("events");
                    }}
                  >
                    ← Listeye dön
                  </a>
                  <a
                    href="#update"
                    className="btn"
                    style={{ marginLeft: "0.5rem" }}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      go("update", selected.id);
                    }}
                  >
                    Bu etkinliği güncelle
                  </a>
                </div>
              </div>
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <p>
              <small>Bu sprintte form sadece görünüm; kayıt yapılmaz.</small>
            </p>
            <form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
              <p>
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  maxLength={80}
                  placeholder="Örn: Kariyer Günleri 2026"
                  defaultValue={page === "update" && selected ? selected.title : ""}
                />
              </p>

              <p>
                <label htmlFor="kategori">Kategori</label>
                <select id="kategori" defaultValue={page === "update" && selected ? selected.category : ""}>
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </p>

              <p>
                <label htmlFor="tarih">Tarih</label>
                <input type="date" id="tarih" defaultValue={page === "update" && selected ? selected.date : ""} />
              </p>

              <p>
                <label htmlFor="saat">Saat</label>
                <input type="time" id="saat" defaultValue={page === "update" && selected ? selected.time : ""} />
              </p>

              <p>
                <label htmlFor="yer">Yer</label>
                <input
                  type="text"
                  id="yer"
                  placeholder="Örn: A Blok Konferans Salonu"
                  defaultValue={page === "update" && selected ? selected.location : ""}
                />
              </p>

              <p>
                <label htmlFor="kontenjan">Kontenjan</label>
                <input
                  type="number"
                  id="kontenjan"
                  defaultValue={page === "update" && selected ? selected.capacity : ""}
                />
              </p>

              <p>
                <label htmlFor="aciklama">Açıklama</label>
                <textarea
                  id="aciklama"
                  rows={5}
                  defaultValue={page === "update" && selected ? selected.description : ""}
                ></textarea>
              </p>

              <button type="submit" className="btn">
                {page === "update" ? "Güncelle" : "Kaydet"}
              </button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Hasan Basri Kaplan · 2311012812 · 2026</p>
      </footer>
    </>
  );
}

export default App;