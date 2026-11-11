# Kampüs Etkinlikleri — Sprint 5 & 7

**Frontend Canlı Link (Vercel):** https://hasanbasrikaplan-frontend.vercel.app/

**GitHub Deposu:** https://github.com/HasanBasri1965/html

---

## Proje Yapısı

Bu repoda iki ana uygulama bulunmaktadır:

```
kampus-etkinlik/
├── frontend/                  # React + TypeScript + Vite (localhost:5173)
│   └── src/
│       ├── components/        # EventCard, EventDetail, EventFilter, EventList, EventForm, Layout
│       ├── context/           # EventsContext (Global State & CRUD)
│       ├── data/              # Başlangıç etkinlik verileri
│       └── pages/             # 10 React Router sayfası
├── backend/                   # Node.js + Express REST API (localhost:3000)
│   ├── src/
│   │   ├── app.js             # Express app, middleware ve route bağlantıları
│   │   ├── server.js          # Port dinleme ve .env yapılandırması
│   │   ├── routes/            # event-routes.js
│   │   ├── controllers/       # event-controller.js
│   │   └── data/              # events.js (Bellek içi özgün etkinlikler)
│   ├── requests/              # kampus-api.json (Postman Collection v2.1)
│   ├── .env.example           # Örnek çevre değişkenleri
│   ├── .gitignore             # node_modules ve .env koruması
│   └── README.md              # Backend REST API sözleşmesi ve dokümantasyonu
```

---

## Backend — Sprint 7 (Express REST API)

Backend, etkinlik verilerini JSON formatında sunan Node.js + Express REST API servisidir.

### REST API Uç Noktaları

| Yöntem | Uç Nokta | Açıklama | Yanıt Kodu |
|:---|:---|:---|:---|
| **GET** | `/health` | Sağlık kontrolü ve öğrenci no (`2311012812`) | `200 OK` |
| **GET** | `/events` | Tüm etkinlik listesi (filtreleme: `?category=...`) | `200 OK` |
| **GET** | `/events/:id` | Tekil etkinlik detayı | `200 OK` / `404 Not Found` |
| **POST** | `/events` | Yeni etkinlik ekleme | `201 Created` / `400 Bad Request` |

### Backend Çalıştırma
```bash
cd backend
npm install
npm run dev     # http://localhost:3000
```

Postman test koleksiyonu: `backend/requests/kampus-api.json`

---

## Frontend — Sprint 5 (React Router ile 10 Sayfa)

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

Hasan Basri Kaplan · 2311012812 · 2026
