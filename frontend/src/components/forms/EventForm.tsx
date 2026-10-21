// src/components/forms/EventForm.tsx
import type { CampusEvent } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
  initialData?: CampusEvent;
  isUpdate?: boolean;
}

function EventForm({ onSubmit, initialData, isUpdate = false }: EventFormProps) {
  return (
    <>
      <p>
        <small>Bu sprintte form sadece görünüm; kayıt yapılmaz.</small>
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p>
          <label htmlFor="title">Etkinlik Adı</label>
          <input
            id="title"
            maxLength={80}
            placeholder="Örn: Kariyer Günleri 2026"
            defaultValue={isUpdate && initialData ? initialData.title : ""}
          />
        </p>

        <p>
          <label htmlFor="kategori">Kategori</label>
          <select id="kategori" defaultValue={isUpdate && initialData ? initialData.category : ""}>
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </p>

        <p>
          <label htmlFor="tarih">Tarih</label>
          <input type="date" id="tarih" defaultValue={isUpdate && initialData ? initialData.date : ""} />
        </p>

        <p>
          <label htmlFor="saat">Saat</label>
          <input type="time" id="saat" defaultValue={isUpdate && initialData ? initialData.time : ""} />
        </p>

        <p>
          <label htmlFor="yer">Yer</label>
          <input
            type="text"
            id="yer"
            placeholder="Örn: A Blok Konferans Salonu"
            defaultValue={isUpdate && initialData ? initialData.location : ""}
          />
        </p>

        <p>
          <label htmlFor="kontenjan">Kontenjan</label>
          <input
            type="number"
            id="kontenjan"
            defaultValue={isUpdate && initialData ? initialData.capacity : ""}
          />
        </p>

        <p>
          <label htmlFor="aciklama">Açıklama</label>
          <textarea
            id="aciklama"
            rows={5}
            defaultValue={isUpdate && initialData ? initialData.description : ""}
          ></textarea>
        </p>

        <button type="submit" className="btn">
          {isUpdate ? "Güncelle" : "Kaydet"}
        </button>
      </form>
    </>
  );
}

export default EventForm;