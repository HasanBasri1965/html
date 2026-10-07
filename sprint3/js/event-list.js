import { events } from "./data.js";

// Tarihi Türkçe okunur formatına çevirir (Örn: 12 Ekim 2026)
function formatTarih(tarihStr) {
  if (!tarihStr) return "";
  const parts = tarihStr.split("-");
  if (parts.length === 3) {
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  }
  return tarihStr;
}

// Kart şablonu
function createCard(event) {
  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p><strong>${event.category}</strong></p>
      <p>Tarih: ${formatTarih(event.date)}, ${event.time}</p>
      <p>Yer: ${event.location}</p>
      <p>Kontenjan: ${event.capacity} kişi</p>
      <p>${event.description}</p>
      <p><a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a></p>
    </article>
  `;
}

const listContainer = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucMetni = document.querySelector("#sonuc");
const filtreFormu = document.querySelector("#filtre-formu");

function render(dizi) {
  if (!listContainer) return;
  if (dizi.length === 0) {
    listContainer.innerHTML = "<p>Aramanıza uygun etkinlik bulunamadı.</p>";
  } else {
    listContainer.innerHTML = dizi.map(createCard).join("");
  }
}

// Ana Sayfa mı (data-limit="2"), yoksa Etkinlikler Listesi mi kontrolü
if (listContainer && listContainer.dataset.limit) {
  const limit = Number(listContainer.dataset.limit);
  const yaklasan = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
  render(yaklasan);
} else if (listContainer) {
  render(events);

  // Kategorileri data.js içinden otomatik çek
  if (kategoriSelect) {
    const kategoriler = [...new Set(events.map(e => e.category))];
    kategoriler.forEach(kat => {
      const opt = document.createElement("option");
      opt.value = kat;
      opt.textContent = kat;
      kategoriSelect.appendChild(opt);
    });
  }

  // Arama ve Filtreleme
  function filtrele() {
    const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
    const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

    const sonuc = events.filter(e => {
      const metinUyuyor = 
        e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
        e.description.toLocaleLowerCase("tr-TR").includes(aranan) ||
        e.location.toLocaleLowerCase("tr-TR").includes(aranan);
      const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonucMetni) {
      if (sonuc.length > 0) {
        sonucMetni.textContent = `${sonuc.length} etkinlik listeleniyor.`;
      } else {
        sonucMetni.textContent = "Aramanıza uygun etkinlik bulunamadı.";
      }
    }
  }

  if (aramaInput) aramaInput.addEventListener("input", filtrele);
  if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
  if (filtreFormu) {
    filtreFormu.addEventListener("submit", (e) => e.preventDefault());
  }
}