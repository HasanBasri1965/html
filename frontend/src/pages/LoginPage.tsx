// src/pages/LoginPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: { email?: string; password?: string } = {};

    if (!email.includes("@")) {
      errs.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      errs.password = "Şifre en az 6 karakter olmalı.";
    }

    setErrors(errs);
    setSuccess(Object.keys(errs).length === 0);
  }

  return (
    <>
      {success && (
        <p className="mesaj mesaj-basari">
          Form geçerli. Gerçek giriş Sprint 10'da eklenecek.
        </p>
      )}
      <form className="form" noValidate onSubmit={handleSubmit}>
        <p className="alan">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
          />
          <span className="hata-metni">{errors.email}</span>
        </p>

        <p className="alan">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          <span className="hata-metni">{errors.password}</span>
        </p>

        <p className="form-butonlar">
          <button type="submit" className="buton">
            Giriş yap
          </button>
        </p>
      </form>

      <p className="form-baglantilar">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabınız yok mu? Kayıt olun</Link>
      </p>
    </>
  );
}
