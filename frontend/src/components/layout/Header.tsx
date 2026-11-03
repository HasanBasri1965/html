// src/components/layout/Header.tsx
import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";

const routeMeta = [
  { path: "/", title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  { path: "/events", title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
  { path: "/admin", title: "Etkinlik Yönetimi" },
  { path: "/admin/new", title: "Etkinlik Ekle" },
  { path: "/login", title: "Giriş Yap" },
  { path: "/register", title: "Kayıt Ol" },
  { path: "/forgot-password", title: "Şifremi Unuttum" }
];

export default function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const match = matchPath("/events/:id", pathname) ?? matchPath("/admin/:id/edit", pathname);
  const matchedEvent = match ? events.find((e) => e.id === (match.params.id ?? "")) : undefined;
  const currentRoute = routeMeta.find((r) => matchPath(r.path, pathname));

  const title = matchedEvent ? matchedEvent.title : currentRoute ? currentRoute.title : "Sayfa Bulunamadı";
  const subtitle = matchedEvent ? `${matchedEvent.category} · ${matchedEvent.location}` : currentRoute?.text;

  useEffect(() => {
    const baseTitle = "Kampüs Etkinlikleri";
    document.title = title === baseTitle ? baseTitle : `${title} — ${baseTitle}`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
