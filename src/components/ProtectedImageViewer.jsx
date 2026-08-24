import { useEffect, useRef, useState } from "react";
import "./ProtectedImageViewer.css";

/**
 * Renders SOP page images as a "view only" document.
 *
 * IMPORTANT (and this is stated to the end user in the UI too):
 * These are best-effort deterrents against *casual* copying/downloading.
 * They cannot stop a determined user from taking a photo of the screen or
 * using OS-level screenshot tools — no web technology can guarantee that.
 */
export default function ProtectedImageViewer({ images, watermarkText }) {
  const containerRef = useRef(null);
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    const node = containerRef.current;

    const blockContextMenu = (e) => e.preventDefault();
    const blockDragStart = (e) => e.preventDefault();

    const blockKeys = (e) => {
      const key = e.key?.toLowerCase();
      const blockedCombos =
        (e.ctrlKey || e.metaKey) &&
        ["s", "p", "u", "c"].includes(key); // save, print, view-source, copy
      const isPrintScreen = key === "printscreen";
      if (blockedCombos) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (isPrintScreen) {
        // Can't actually block PrintScreen or OS capture — best effort only.
        setBlurred(true);
        setTimeout(() => setBlurred(false), 1500);
      }
    };

    // Best-effort: blur content when the tab loses focus/visibility,
    // which also softens (not prevents) some external capture tools.
    const handleVisibility = () => {
      setBlurred(document.hidden);
    };
    const handleBlur = () => setBlurred(true);
    const handleFocus = () => setBlurred(false);

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDragStart);
    document.addEventListener("keydown", blockKeys);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDragStart);
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const watermarkRows = Array.from({ length: 8 });
  const watermarkCols = Array.from({ length: 4 });

  return (
    <div
      ref={containerRef}
      className={`protected-viewer ${blurred ? "protected-viewer--blurred" : ""}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="protected-viewer__pages">
        {images.map((src, idx) => (
          <div className="protected-viewer__page" key={src}>
            <img
              src={src}
              alt={`SOP page ${idx + 1}`}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ))}

        {/* Watermark overlay grid — sits above the image, ignores pointer events */}
        <div className="protected-viewer__watermark" aria-hidden="true">
          {watermarkRows.map((_, r) => (
            <div className="protected-viewer__watermark-row" key={r}>
              {watermarkCols.map((_, c) => (
                <span key={c}>{watermarkText}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {blurred && (
        <div className="protected-viewer__blur-notice">
          Content hidden — window not in focus
        </div>
      )}
    </div>
  );
}
