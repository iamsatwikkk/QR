import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ subtitle }) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/" className="app-header__brand">
          <span className="app-header__logo">AI</span>
          <div className="app-header__brand-text">
            <span className="app-header__company">Acute Instruments Pvt Ltd</span>
            {subtitle && <span className="app-header__subtitle">{subtitle}</span>}
          </div>
        </Link>
      </div>
    </header>
  );
}
