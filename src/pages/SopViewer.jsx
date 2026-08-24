import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import ProtectedImageViewer from "../components/ProtectedImageViewer";
import { getSopBySlug } from "../sopData";
import "./SopViewer.css";

export default function SopViewer() {
  const { slug } = useParams();
  const sop = getSopBySlug(slug);

  if (!sop) {
    return (
      <div className="page">
        <Header subtitle="SOP Viewer" />
        <main className="viewer-page">
          <p>SOP not found.</p>
          <Link to="/">← Back to SOP Library</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header subtitle="Controlled SOP — View Only" />
      <main className="viewer-page">
        <div className="viewer-page__top">
          <Link to="/" className="viewer-page__back">
            ← All SOPs
          </Link>
          <span className="viewer-page__code">{sop.docCode}</span>
        </div>

        <h1 className="viewer-page__title">{sop.fullTitle}</h1>
        <p className="viewer-page__meta">Instrument: {sop.instrument}</p>

        <div className="viewer-page__notice">
          🔒 This is a controlled, view-only document. Downloading, printing
          and right-click saving are disabled where technically possible.
          Browser/OS-level screenshots cannot be fully prevented by any web
          application.
        </div>

        <ProtectedImageViewer
          images={sop.images}
          watermarkText="CONTROLLED SOP · VIEW ONLY"
        />

        <p className="viewer-page__disclaimer">
          Document reproduced exactly as issued by Acute Instruments Pvt Ltd.
          Do not distribute outside authorized personnel.
        </p>
      </main>
      <footer className="page-footer">
        Acute Instruments Pvt Ltd — Controlled Document. For laboratory use
        only.
      </footer>
    </div>
  );
}
