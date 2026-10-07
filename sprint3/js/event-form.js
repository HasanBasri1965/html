import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (form) {
  // Güncelleme modu kontrolü
  if (form.dataset.mode === "guncelle") {
    const etkinlik = events.find(e => e.id === id);
    if (!etkinlik) {
      form.outerHTML = `
        <div class="hata-kutusu">
          <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
          <p><a href="etkinlikler.html" class="btn">Etkinliklere git</a></p>
        </div>
      `;
    } else {
      if (form.elements["ad"]) form.elements["ad"].value = etkinlik.title;
      if (form.elements["kategori"]) form.elements["kategori"].value = etkinlik.category;
      if (form.elements["tarih"]) form.elements["tarih"].value = etkinlik.date;
      if (form.elements["saat"]) form.elements["saat"].value = etkinlik.time;
      if (form.elements["yer"]) form.elements["yer"].value = etkinlik.location;
      if (form.elements["kontenjan"]) form.elements["kontenjan"].value = etkinlik.capacity;
      if (form.elements["aciklama"]) form.elements["aciklama"].value = etkinlik.description;
    }
  }

  // Form Gönderimi ve Doğrulama
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      id: id || "event-7",
      title: (fd.get("ad") || "").trim(),
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: (fd.get("yer") || "").trim(),
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: (fd.get("aciklama") || "").trim()
    };

    // Eski hata mesajlarını temizle
    const hataSpanler = form.querySelectorAll(".hata-yazisi");
    hataSpanler.forEach(s => s.textContent = "");
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(i => i.removeAttribute("aria-invalid"));

    const errors = {};

    if (data.title.length < 3) {
      errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    }
    if (!data.category) {
      errors.kategori = "Bir kategori seçin.";
    }
    if (!data.date) {
      errors.tarih = "Tarih seçin.";
    }
    if (!data.time) {
      errors.saat = "Saat seçin.";
    }
    if (!data.location) {
      errors.yer = "Yer bilgisini yazın.";
    }
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
    }

    // Hata varsa alanların altına yaz
    if (Object.keys(errors).length > 0) {
      for (const [alanAdi, mesaj] of Object.entries(errors)) {
        const inputElem = form.elements[alanAdi];
        const hataElem = document.querySelector(`#${alanAdi}-hata`);
        if (inputElem) inputElem.setAttribute("aria-invalid", "true");
        if (hataElem) hataElem.textContent = mesaj;
      }
      return;
    }

    // Hata yoksa JSON nesnesini ekrana bas
    const mesajKutusu = document.querySelector("#form-mesaj");
    if (mesajKutusu) {
      mesajKutusu.innerHTML = `
        <div class="basari-kutusu">
          <p><strong>${form.dataset.mode === "guncelle" ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu"} (bu sprintte kaydedilmez):</strong></p>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  });
}