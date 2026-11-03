// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <p>
        <Link className="buton" to="/">
          Ana sayfaya dön
        </Link>
      </p>
    </>
  );
}
