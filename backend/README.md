# Kampüs Etkinlikleri — Sprint 7 (Express REST API)

Bu proje, Kampüs Etkinlikleri uygulamasının Node.js ve Express ile geliştirilmiş REST API backend servisidir.

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
Varsayılan olarak `PORT=3000` kullanılır.

### 3. Geliştirme Sunucusunu Başlatma
Node.js `--watch` modu ile otomatik yeniden başlatan dev komutu:
```bash
npm run dev
```

Canlı çalıştırma komutu:
```bash
npm start
```

Sunucu ayağa kalktığında:
`API: http://localhost:3000`

---

## REST API Sözleşmesi

| Yöntem (Method) | Uç Nokta (Endpoint) | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık kontrolü ve öğrenci no | `200 OK` | — | Bu sprint |
| **GET** | `/events` | Tüm etkinlik listesini getir (isteğe bağlı `?category=...`) | `200 OK` | — | Bu sprint |
| **GET** | `/events/:id` | ID'ye göre tek bir etkinliği getir | `200 OK` | `404 Not Found` | Bu sprint |
| **POST** | `/events` | Yeni etkinlik oluştur (JSON body) | `201 Created` | `400 Bad Request` | Bu sprint |
| **PATCH** | `/events/:id` | Etkinlik güncelle | `200 OK` | `400 / 404` | Sprint 9 |
| **DELETE** | `/events/:id` | Etkinlik sil | `204 No Content`| `404 Not Found` | Sprint 9 |

---

## Durum Kodları (HTTP Status Codes)

- **200 OK:** İstek başarıyla karşılandı.
- **201 Created:** Yeni kayıt başarıyla oluşturuldu.
- **204 No Content:** İçerik yok (silme işlemi).
- **400 Bad Request:** Eksik veya geçersiz veri (ör. zorunlu alanlar `title`, `category`, `date`).
- **404 Not Found:** Kaynak veya rota bulunamadı.

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

API'yi test etmek için 6 temel istek `backend/requests/kampus-api.json` dosyasında Postman Collection v2.1 formatında hazır bulunmaktadır:

1. `GET 1 Health` → `http://localhost:3000/health` (200 OK)
2. `GET 2 Etkinlik listesi` → `http://localhost:3000/events` (200 OK)
3. `GET 3 Tek etkinlik` → `http://localhost:3000/events/event-2` (200 OK)
4. `GET 4 Olmayan etkinlik (404)` → `http://localhost:3000/events/yok` (404 Not Found)
5. `POST 5 Etkinlik oluştur (201)` → `http://localhost:3000/events` (201 Created)
6. `POST 6 Eksik veri (400)` → `http://localhost:3000/events` (400 Bad Request)

---

Hasan Basri Kaplan · 2311012812 · 2026
