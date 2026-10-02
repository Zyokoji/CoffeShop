import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-brand">Alder Coffee</p>
          <p>Roasted upstairs. Poured with care.</p>
        </div>
        <div className="footer-links">
          <Link to="/menu">Menu</Link>
          <Link to="/visit">Visit</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <p className="footer-note">Copyright {new Date().getFullYear()} Alder Coffee</p>
    </footer>
  );
}
