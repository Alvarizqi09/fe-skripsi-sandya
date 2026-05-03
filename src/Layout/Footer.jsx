import { FaLeaf } from "react-icons/fa";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <FaLeaf className="footer-icon" />
          <span>CassavaGuard</span>
        </div>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Klasifikasi Penyakit Daun Singkong
          &mdash; EfficientNetB0 + CBAM + Oversampling
        </p>
        <p className="footer-subtitle">
          Skripsi &bull; Teknik Informatika
        </p>
      </div>
    </footer>
  );
}
