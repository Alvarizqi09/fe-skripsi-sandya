import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import "./Header.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Beranda" },
    { to: "/about", label: "Penyakit" },
    { to: "/machinelearning", label: "Machine Learning" },
    { to: "/predict", label: "Prediksi" },
  ];

  return (
    <nav className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        <Link to="/" className="header-logo" id="logo-link">
          <div className="header-logo-icon">
            <FaLeaf />
          </div>
          <span className="header-logo-text">CassavaGuard</span>
        </Link>

        <div className={`header-nav ${menuOpen ? "header-nav-open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`header-link ${
                location.pathname === link.to ? "header-link-active" : ""
              }`}
              id={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/predict" className="btn btn-primary header-cta" id="nav-cta">
            Coba Sekarang
          </Link>
        </div>

        <button
          className="header-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="menu-toggle"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
}
