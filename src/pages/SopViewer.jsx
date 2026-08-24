import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import ProtectedImageViewer from "../components/ProtectedImageViewer";
import { ArrowLeftIcon, LockIcon } from "../components/icons";
import { getSopBySlug } from "../sopData";
import "./SopViewer.css";

export default function SopViewer() {
  const { slug } = useParams();
  const sop = getSopBySlug(slug);

  if (!sop) {
    return (
      <div className="page">
        <Header subtitle="Document Viewer" />
        <main className="viewer-page">
          <p>Document not found.</p>
          <Link to="/">Back to library</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header subtitle="Controlled Document — View Only" />
      <main className="viewer-page">
        <div className="viewer-page__top">
          <Link to="/" className="viewer-page__back">
            <ArrowLeftIcon size={13} />
            All documents
          </Link>
          <span className="viewer-page__code">{sop.docCode}</span>
        </div>

        <h1 className="viewer-page__title">{sop.fullTitle}</h1>
        <p className="viewer-page__meta">Instrument: {sop.instrument}</p>

        <div className="viewer-page__notice">
          <LockIcon size={15} />
          <span>
            This is a controlled, view-only document. Downloading, printing
            and right-click saving are disabled where technically possible.
            Browser and operating-system level screenshots cannot be fully
            prevented by any web application.
          </span>
        </div>

        <ProtectedImageViewer
          images={sop.images}
          watermarkText="CONTROLLED DOCUMENT — VIEW ONLY"
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
