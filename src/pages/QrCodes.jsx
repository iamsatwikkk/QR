import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import Header from "../components/Header";
import sops from "../sopData";
import "./QrCodes.css";

export default function QrCodes() {
  const wrapRefs = useRef({});

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";

  const handleDownload = (slug, title) => {
    const canvas = wrapRefs.current[slug]?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}-QR.png`;
    a.click();
  };

  return (
    <div className="page">
      <Header subtitle="Printable QR Codes" />
      <main className="qr-page">
        <div className="qr-page__intro no-print">
          <h1>Printable QR Codes</h1>
          <p>
            Each code below links directly to that SOP's live URL. Print and
            affix to the corresponding instrument. Use your browser's Print
            (Ctrl/Cmd + P) to print this page directly onto label stock.
          </p>
          <button className="qr-page__print-btn" onClick={() => window.print()}>
            🖨 Print this page
          </button>
        </div>

        <div className="qr-page__grid">
          {sops.map((sop) => {
            const url = `${origin}/sop/${sop.slug}`;
            return (
              <div className="qr-card" key={sop.slug}>
                <div
                  className="qr-card__code"
                  ref={(el) => (wrapRefs.current[sop.slug] = el)}
                >
                  <QRCodeCanvas
                    value={url}
                    size={220}
                    level="M"
                    includeMargin
                  />
                </div>
                <h2>{sop.shortTitle}</h2>
                <p className="qr-card__instrument">{sop.instrument}</p>
                <p className="qr-card__code-label">{sop.docCode}</p>
                <p className="qr-card__url">{url}</p>
                <button
                  className="qr-card__download no-print"
                  onClick={() => handleDownload(sop.slug, sop.docCode)}
                >
                  Download PNG
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
