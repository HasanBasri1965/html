// src/pages/RegisterPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    password2?: string;
  }>({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: {
      name?: string;
      email?: string;
      password?: string;
      password2?: string;
    } = {};

    if (name.trim().length < 3) {
      errs.name = "Ad soyad en az 3 karakter olmalı.";
    }
    if (!email.includes("@")) {
      errs.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      errs.password = "Şifre en az 6 karakter olmalı.";
    }
    if (passwordAgain !== password) {
      errs.password2 = "Şifreler aynı değil.";
    }

    setErrors(errs);
    setSuccess(Object.keys(errs).length === 0);
  }

  return (
    <>
      {success && (
        <p className="mesaj mesaj-basari">
          Form geçerli. Gerçek kayıt Sprint 10'da eklenecek.
        </p>
      )}
      <form className="form" noValidate onSubmit={handleSubmit}>
        <p className="alan">
          <label htmlFor="name">Ad Soyad</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
          />
          <span className="hata-metni">{errors.name}</span>
        </p>

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

        <p className="alan">
          <label htmlFor="password2">Şifre (tekrar)</label>
          <input
            type="password"
            id="password2"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            aria-invalid={errors.password2 ? true : undefined}
          />
          <span className="hata-metni">{errors.password2}</span>
        </p>

        <p className="form-butonlar">
          <button type="submit" className="buton">
            Kayıt ol
          </button>
        </p>
      </form>

      <p className="form-baglantilar">
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </p>
    </>
  );
}
