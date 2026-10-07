import { events } from "./data.js";

function formatTarih(tarihStr) {
  if (!tarihStr) return "";
  const parts = tarihStr.split("-");
  if (parts.length === 3) {
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  }
  return tarihStr;
}

const container = document.querySelector("#detay");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const event = events.find(e => e.id === id);

if (!container) {
  // Alan yoksa işlem yapma
} else if (!event) {
  document.title = "Etkinlik Bulunamadı";
  container.innerHTML = `
    <div class="hata-kutusu">
      <h2>Etkinlik bulunamadı</h2>
      <p>"${id ? id : 'Belirtilmemiş'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
      <p><a href="etkinlikler.html" class="btn">Listeye dön</a></p>
    </div>
  `;
} else {
  document.title = event.title;
  container.innerHTML = `
    <h2>${event.title}</h2>
    <div class="detay-konteyner">
      <figure style="margin:0;">
        <img src="afis.jpg" alt="${event.title} Afişi" class="afis-resmi">
        <figcaption>${event.title} afişi</figcaption>
      </figure>

      <div class="kunye-kutusu">
        <h3>Etkinlik Künyesi</h3>
        <dl>
          <dt><strong>Tarih:</strong></dt>
          <dd>${formatTarih(event.date)}, ${event.time}</dd>
          <dt><strong>Yer:</strong></dt>
          <dd>${event.location}</dd>
          <dt><strong>Kategori:</strong></dt>
          <dd>${event.category}</dd>
          <dt><strong>Kontenjan:</strong></dt>
          <dd>${event.capacity} kişi</dd>
        </dl>
      </div>
    </div>

    <h3>Açıklama</h3>
    <p>${event.description}</p>

    <div style="margin-top: 1.5rem;">
      <a href="etkinlikler.html" class="btn">← Listeye dön</a>
      <a href="etkinlik-guncelle.html?id=${event.id}" class="btn">Bu etkinliği güncelle</a>
    </div>
  `;
}