# Kampüs Etkinlikleri — Sprint 8 (MongoDB ve Mongoose)

Bu proje, Kampüs Etkinlikleri uygulamasının Node.js, Express ve MongoDB / Mongoose ile geliştirilmiş REST API backend servisidir.

## Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleme
```bash
cd backend
npm install
```

### 2. Ortam Değişkenleri (.env)
Kök dizindeki `.env.example` dosyasını kopyalayarak `.env` oluşturun:
```bash
cp .env.example .env
```
`.env` dosyasında aşağıdaki değişkenler tanımlanmalıdır:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<kullanıcı>:<şifre>@<cluster-adresi>/kampus
```

### 3. Veritabanını Örnek Veriyle Doldurma (Seed)
Başlangıç verilerini (6 adet özgün etkinlik) veritabanına eklemek için:
```bash
npm run seed
```

### 4. Geliştirme Sunucusunu Başlatma
Node.js `--watch` modu ile otomatik yeniden başlatan dev komutu:
```bash
npm run dev
```

Canlı çalıştırma komutu:
```bash
npm start
```

Sunucu ayağa kalktığında:
- MongoDB bağlandı: `<cluster-adresi>/kampus`
- API: `http://localhost:3000`

---

## REST API Sözleşmesi

| Yöntem (Method) | Uç Nokta (Endpoint) | Amaç | Başarılı | Hata |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık kontrolü ve öğrenci no | `200 OK` | — |
| **GET** | `/events` | Tüm etkinlik listesini getir (isteğe bağlı `?category=...`) | `200 OK` | — |
| **GET** | `/events/:id` | MongoDB `_id`sine göre tek bir etkinliği getir | `200 OK` | `404 Not Found` |
| **POST** | `/events` | Yeni etkinlik oluştur (JSON body) | `201 Created` | `400 Bad Request` |

---

## Durum Kodları (HTTP Status Codes)

- **200 OK:** İstek başarıyla karşılandı.
- **201 Created:** Yeni kayıt başarıyla oluşturuldu (`_id`, `createdAt`, `updatedAt` ile döner).
- **400 Bad Request:** Şema doğrulama hatası (eksik zorunlu alanlar `title`, `category`, `date` veya kısıt ihlali).
- **404 Not Found:** Kaynak veya rota bulunamadı (geçersiz veya bulunamayan `_id` için 404 döner, 500 vermez).
- **500 Internal Server Error:** Sunucu içi beklenmeyen hata (hata yakalayıcı middleware ile yönetilir).

### Standart Hata Yanıtı Formatı
Tüm hata durumlarında API tutarlı JSON formatı döner:
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

---

## Test İstekleri (Postman)

API'yi otomatik test etmek ve tüm testlerden (passed) geçmek için 7 istek `backend/requests/kampus-api.json` dosyasında Postman Collection v2.1 formatında hazır bulunmaktadır:

1. `GET 1 Health` → `http://localhost:3000/health` (200 OK - `student: "2311012812"`)
2. `GET 2 Etkinlik listesi` → `http://localhost:3000/events` (200 OK - en az 6 kayıt)
3. `GET 3 Tek etkinlik` → `http://localhost:3000/events/{{firstEventId}}` (200 OK - dinamik ID)
4. `GET 4 Olmayan etkinlik (Rastgele ID 404)` → `http://localhost:3000/events/507f1f77bcf86cd799439011` (404 Not Found)
5. `GET 5 Geçersiz ID formatı (404)` → `http://localhost:3000/events/111111` (404 Not Found - 500 vermez)
6. `POST 6 Etkinlik oluştur (201)` → `http://localhost:3000/events` (201 Created - `_id` ve `createdAt`)
7. `POST 7 Eksik veri (400)` → `http://localhost:3000/events` (400 Bad Request - doğrulama hatası)

---

Hasan Basri Kaplan · 2311012812 · 2026
