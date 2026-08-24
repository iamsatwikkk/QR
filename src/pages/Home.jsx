import { Link } from "react-router-dom";
import Header from "../components/Header";
import sops from "../sopData";
import "./Home.css";

export default function Home() {
  return (
    <div className="page">
      <Header subtitle="Controlled SOP Access System" />
      <main className="home">
        <section className="home__intro">
          <h1>Instrument SOP Library</h1>
          <p>
            Semi Dist-86S — Crude Oil Distillation Testing. Select a document
            below. Each SOP is view-only and does not require any login.
          </p>
        </section>

        <div className="home__grid">
          {sops.map((sop) => (
            <Link to={`/sop/${sop.slug}`} className="sop-card" key={sop.slug}>
              <div className="sop-card__badge">{sop.docCode}</div>
              <h2>{sop.shortTitle}</h2>
              <p>{sop.description}</p>
              <span className="sop-card__cta">View SOP →</span>
            </Link>
          ))}
        </div>

        <div className="home__admin-link">
          <Link to="/admin/qr-codes">Generate printable QR codes →</Link>
        </div>
      </main>

      <footer className="page-footer">
        Acute Instruments Pvt Ltd — Controlled Document. For laboratory use
        only.
      </footer>
    </div>
  );
}
