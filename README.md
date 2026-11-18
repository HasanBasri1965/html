# Kampüs Etkinlikleri — Full-Stack (Sprint 5 & Sprint 8)

**Frontend Canlı Link (Vercel):** https://hasanbasrikaplan-frontend.vercel.app/

**GitHub Deposu:** https://github.com/HasanBasri1965/html

---

## Proje Yapısı

```
kampus-etkinlik/
├── frontend/                  # React + TypeScript + Vite (localhost:5173)
│   └── src/
│       ├── components/        # EventCard, EventDetail, EventFilter, EventList, EventForm, Layout
│       ├── context/           # EventsContext (Global State & CRUD)
│       ├── data/              # Başlangıç etkinlik verileri
│       └── pages/             # 10 React Router sayfası
├── backend/                   # Node.js + Express + MongoDB REST API (localhost:3000)
│   ├── src/
│   │   ├── app.js             # Express app, middleware ve route bağlantıları
│   │   ├── server.js          # DB bağlantısı ve port dinleme
│   │   ├── seed.js            # MongoDB seed çalıştırma script'i
│   │   ├── config/            # database.js (Mongoose bağlantı modülü)
│   │   ├── models/            # event-model.js (Mongoose Schema & Model)
│   │   ├── routes/            # event-routes.js
│   │   ├── controllers/       # event-controller.js (MongoDB CRUD metodları)
│   │   └── data/              # seed-events.js (Özgün başlangıç etkinlikleri)
│   ├── requests/              # kampus-api.json (Postman Collection v2.1)
│   ├── .env.example           # Örnek çevre değişkenleri (PORT & MONGODB_URI)
│   ├── .gitignore             # node_modules ve .env koruması
│   └── README.md              # Backend REST API sözleşmesi ve dokümantasyonu
```

---

## Backend — Sprint 8 (MongoDB ve Mongoose)

Backend, verileri MongoDB Atlas üzerinde kalıcı olarak saklayan Node.js + Express + Mongoose REST API servisidir.

### REST API Uç Noktaları

| Yöntem | Uç Nokta | Açıklama | Yanıt Kodu |
|:---|:---|:---|:---|
| **GET** | `/health` | Sağlık kontrolü ve öğrenci no (`2311012812`) | `200 OK` |
| **GET** | `/events` | Tüm etkinlik listesi (filtreleme: `?category=...`) | `200 OK` |
| **GET** | `/events/:id` | MongoDB `_id` ile tekil etkinlik detayı | `200 OK` / `404 Not Found` |
| **POST** | `/events` | Yeni etkinlik ekleme (Schema doğrulama) | `201 Created` / `400 Bad Request` |

### Backend Çalıştırma

```bash
cd backend
npm install
npm run seed  # Veritabanını 6 özgün etkinlikle doldurur
npm run dev   # Geliştirme sunucusunu başlatır
```

---

## Frontend — Sprint 5 (React + TypeScript + React Router)

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

Hasan Basri Kaplan · 2311012812 · 2026
