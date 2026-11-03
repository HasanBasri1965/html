// src/components/layout/Navigation.tsx
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" }
];

export default function Navigation() {
  return (
    <nav className="menu">
      <ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
