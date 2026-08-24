import { Link } from "react-router-dom";
import Header from "../components/Header";
import { ArrowRightIcon } from "../components/icons";
import sops from "../sopData";
import "./Home.css";

export default function Home() {
  return (
    <div className="page">
      <Header subtitle="Controlled Document Access" />
      <main className="home">
        <section className="home__intro">
          <span className="home__eyebrow">Standard Operating Procedures</span>
          <h1>Instrument Documentation Library</h1>
          <p>
            Semi Dist-86S — Crude Oil Distillation Testing. Select a document
            below. Access does not require sign-in or a company account.
          </p>
        </section>

        <div className="home__grid">
          {sops.map((sop) => (
            <Link to={`/sop/${sop.slug}`} className="sop-card" key={sop.slug}>
              <div className="sop-card__badge">{sop.docCode}</div>
              <h2>{sop.shortTitle}</h2>
              <p>{sop.description}</p>
              <span className="sop-card__cta">
                View document <ArrowRightIcon size={13} />
              </span>
            </Link>
          ))}
        </div>

        <div className="home__admin-link">
          <Link to="/admin/qr-codes">Generate printable QR codes</Link>
        </div>
      </main>

      <footer className="page-footer">
        Acute Instruments Pvt Ltd — Controlled Document. For laboratory use
        only.
      </footer>
    </div>
  );
}
