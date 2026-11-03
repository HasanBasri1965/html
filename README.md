# Kampüs Etkinlikleri — Sprint 5 (React + TypeScript + React Router)

**Canlı Link:** https://hasanbasrikaplan-frontend.vercel.app/

**GitHub Deposu:** https://github.com/HasanBasri1965/html

---

## React Router ile 10 Sayfa (Route)

Bu projede `react-router-dom` v7 kullanılarak **10 ayrı route** tanımlanmıştır:

| # | Yol (Path) | Sayfa Bileşeni | Açıklama |
|---|-----------|----------------|----------|
| 1 | `/` | `HomePage` | Ana sayfa — Yaklaşan 2 etkinliği listeler |
| 2 | `/events` | `EventsPage` | Tüm etkinlikler — Arama ve kategori filtreleme |
| 3 | `/events/:id` | `EventDetailPage` | Etkinlik detayı — Künyesi, afiş görseli ve açıklama |
| 4 | `/admin` | `AdminPage` | Yönetim paneli — Tablo ile listeleme, düzenle/sil butonları |
| 5 | `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu (doğrulamalı) |
| 6 | `/admin/:id/edit` | `EditEventPage` | Mevcut etkinliği güncelleme formu |
| 7 | `/login` | `LoginPage` | Giriş yap formu (e-posta & şifre doğrulama) |
| 8 | `/register` | `RegisterPage` | Kayıt ol formu (ad soyad, e-posta, şifre, şifre tekrar) |
| 9 | `/forgot-password` | `ForgotPasswordPage` | Şifremi unuttum — e-posta ile bağlantı gönderme |
| 10 | `*` | `NotFoundPage` | 404 Sayfa Bulunamadı |

---

## Teknolojiler

- **React 19** + **TypeScript 6**
- **Vite 8** (build aracı)
- **React Router DOM v7** (client-side routing)
- **Context API** (global state yönetimi)
- **CSS Custom Properties** (öğrenci numarasından türetilen renk teması)

## Proje Yapısı

```
frontend/src/
├── components/
│   ├── events/     → EventCard, EventDetail, EventFilter, EventList
│   ├── forms/      → EventForm (doğrulamalı)
│   └── layout/     → Header (dinamik başlık), Navigation, Footer
├── context/        → EventsContext (CRUD işlemleri)
├── data/           → events.ts (6 başlangıç etkinliği)
├── pages/          → 10 sayfa bileşeni
├── types/          → CampusEvent, EventFormData, EventFormErrors
└── utils/          → format-date, filter-events, validate-event
```

Hasan Basri Kaplan · 2311012812 · 2026
