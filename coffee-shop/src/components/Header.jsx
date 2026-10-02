import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/menu", label: "Menu" },
  { to: "/roast", label: "Roast" },
  { to: "/visit", label: "Visit" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={[
        "site-header",
        scrolled ? "is-scrolled" : "",
        menuOpen ? "is-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="header-inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <img
            className="brand-mark-img"
            src="/brand/alder-mark.svg"
            alt=""
            width="28"
            height="28"
          />
          <span>Alder</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav-link is-active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-cta" to="/cart" onClick={closeMenu}>
            Order
          </Link>
          <button
            type="button"
            className="cart-trigger"
            onClick={openDrawer}
            aria-label={`Open cart, ${count} items`}
          >
            Cart
            {count > 0 ? <span className="cart-count">{count}</span> : null}
          </button>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={menuOpen ? "mobile-nav is-open" : "mobile-nav"}
      >
        <nav aria-label="Mobile">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-link is-active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link className="nav-link" to="/cart" onClick={closeMenu}>
            Order
          </Link>
        </nav>
      </div>
    </header>
  );
}
