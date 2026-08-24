# Acute Instruments — QR-Based SOP Access System

A view-only web viewer for the two Semi Dist-86S SOP documents, with
auto-generated printable QR codes for sticking on the instrument.

```
PDF  →  Page images  →  React viewer (unique URL per SOP)  →  QR code  →
Sticker on instrument  →  User scans with phone  →  View-only SOP (no login)
```

## What's inside

```
sop-app/
├─ public/
│  ├─ sop-images/
│  │  ├─ dos-donts/page-1.png          ← "Do's & Don'ts" PDF, rendered as an image
│  │  └─ full-procedure/page-1.png     ← Full SOP PDF, rendered as an image
│  └─ _redirects                        ← Netlify SPA routing
├─ src/
│  ├─ sopData.js                        ← single source of truth: titles, slugs, images
│  ├─ components/
│  │  ├─ Header.jsx
│  │  └─ ProtectedImageViewer.jsx       ← the view-only, watermarked viewer
│  └─ pages/
│     ├─ Home.jsx                       ← landing page, links to both SOPs
│     ├─ SopViewer.jsx                  ← /sop/:slug — renders one SOP
│     └─ QrCodes.jsx                    ← /admin/qr-codes — printable QR codes
├─ vercel.json                          ← Vercel SPA routing
└─ index.html
```

### Typography

The interface uses **Inter**, a professional grade UI typeface, self-hosted
via `@fontsource/inter` so it loads reliably on any free host with no
external font-CDN dependency. All icons (lock, printer, arrows, download)
are inline SVG — no emoji are used anywhere in the interface.

### Why images instead of embedding the raw PDF?

The two PDFs you supplied were each converted **losslessly, page-for-page,
with no text, layout, or wording changed** into high-resolution PNG images
(`pdftoppm -r 200`). This is the same visual content as the original PDF —
nothing was rewritten or summarized — but it lets the viewer:

- disable native browser "Save as PDF / Print" controls that a raw embedded
  PDF would otherwise expose,
- disable right-click "Save image as…" and drag-out saving,
- overlay a watermark directly on top of the page,
- render reliably and fast on any phone browser without a PDF plugin.

If you'd rather keep the actual `.pdf` files instead of images, drop them
into `public/sop-pdfs/` and swap the `<img>` tags in
`ProtectedImageViewer.jsx` for an `<iframe>` — routing, QR codes, and the
watermark overlay all keep working the same way. The trade-off is that
native PDF viewers expose their own built-in download/print buttons that
are harder to fully suppress, which is why images are used by default.

## Two separate SOPs, two separate URLs

| SOP | Route |
|---|---|
| Do's & Don'ts | `/sop/dos-donts` |
| Full Operating Procedure | `/sop/full-procedure` |

Both are listed as separate cards/buttons on the home page (`/`), and each
has its own permanent, shareable, login-free URL.

## Run it locally

Requirements: Node.js 18+ and npm.

```bash
cd sop-app
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`). Visit:

- `http://localhost:5173/` — home / SOP library
- `http://localhost:5173/sop/dos-donts`
- `http://localhost:5173/sop/full-procedure`
- `http://localhost:5173/admin/qr-codes` — QR codes for whatever URL you're
  currently running on (localhost while developing; your real domain once
  deployed — see below)

To test a production build locally:

```bash
npm run build
npx serve -s dist
```

## Deploy for free (recommended: Vercel)

You do **not** need a custom domain — Vercel/Netlify both give you a free
`*.vercel.app` / `*.netlify.app` HTTPS URL, which is all the QR codes need.

### Option A — Vercel (recommended)

1. Create a free account at vercel.com (GitHub login is fine).
2. Push this `sop-app` folder to a new GitHub repository:
   ```bash
   cd sop-app
   git init
   git add .
   git commit -m "Initial SOP viewer"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the Vercel dashboard: **Add New… → Project → Import** your repo.
4. Framework preset: Vercel auto-detects **Vite** — leave build command as
   `npm run build` and output directory as `dist`.
5. Click **Deploy**. In ~30–60 seconds you'll get a live URL such as:
   ```
   https://acute-sop-viewer.vercel.app
   ```
   (`vercel.json` in this repo already configures SPA routing so
   `/sop/dos-donts` etc. work on refresh/direct visit.)

### Option B — Netlify

1. Free account at netlify.com.
2. **Add new site → Import an existing project**, connect the same GitHub
   repo.
3. Build command: `npm run build`, publish directory: `dist`.
4. Deploy → you'll get `https://<something>.netlify.app`.
   (`public/_redirects` already handles SPA routing.)

### Option C — GitHub Pages

Works too, but GitHub Pages doesn't support server-side rewrites for a
single-page app the way Vercel/Netlify do, so it needs an extra "404→index"
trick. Vercel or Netlify are simpler and just as free — use one of those
unless you have a reason to prefer Pages.

## Generating the final QR codes (after deployment)

1. Visit your **deployed** site at `/admin/qr-codes`, e.g.:
   ```
   https://acute-sop-viewer.vercel.app/admin/qr-codes
   ```
2. This page reads `window.location.origin` automatically, so the two QR
   codes shown will already point at your real live URLs:
   ```
   https://acute-sop-viewer.vercel.app/sop/dos-donts
   https://acute-sop-viewer.vercel.app/sop/full-procedure
   ```
3. Click **Download PNG** under each code to save it, or click **Print this
   page** to print both directly onto adhesive label stock — the print
   stylesheet hides all UI chrome and lays the two codes out cleanly.
4. Stick the "Do's & Don'ts" QR and the "Full Procedure" QR onto the
   instrument body (e.g., next to the control panel and near the flask
   assembly, or both together on one label).

No login, signup, or company email is required for anyone scanning the code
— it opens straight into the view-only page.

## View-only protections implemented (and their limits)

Implemented:
- Right-click / context menu disabled on the document and images.
- Image dragging and native "Save image as…" via drag disabled.
- Text selection disabled over the viewer.
- `Ctrl/Cmd+S`, `Ctrl/Cmd+P`, `Ctrl/Cmd+U`, `Ctrl/Cmd+C` intercepted and
  blocked while on a SOP page.
- Print stylesheet replaces the document with a "printing disabled" notice
  if a user still forces a print dialog.
- A tiled **"CONTROLLED SOP · VIEW ONLY"** watermark overlaid on every page.
- Content auto-blurs when the browser tab loses focus (deters some
  automated capture tools and casual switch-away copying).
- No PDF file is ever served directly, so there's no "Open PDF"/"Download"
  button from a native browser PDF plugin to defeat in the first place.

**Not possible to guarantee, by design of the web platform**, and stated
directly in the UI:
- A phone or camera physically photographing the screen.
- OS-level screenshot tools (e.g., `PrtScn`, iOS/Android screenshot
  gestures) — the app detects `PrintScreen` on desktop and briefly blurs the
  page as a deterrent, but cannot prevent the OS from capturing the screen.
- Screen recording software.

This is standard for any browser-based "view only" system — true
copy-proofing does not exist for anything a screen can render. The controls
above raise the effort required for casual copying/downloading, which is
the realistic goal for an internal SOP-access system.

## Updating a SOP later

1. Replace the PDF, re-run:
   ```bash
   pdftoppm -png -r 200 your-updated.pdf public/sop-images/<slug>/page
   ```
2. If the page count changed, update the `images` array for that SOP in
   `src/sopData.js`.
3. Commit and push — Vercel/Netlify auto-redeploy. The QR codes **do not
   need to be reprinted**, since they point to the stable `/sop/<slug>` URL,
   not to the file itself.

## Adding a third SOP later

Add one more object to the array in `src/sopData.js` and drop its page
images into `public/sop-images/<new-slug>/`. The home page, routing, and QR
code page all pick it up automatically — no other code changes needed.
