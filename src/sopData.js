const sops = [
  {
    slug: "dos-donts",
    shortTitle: "Do's and Don'ts",
    fullTitle: "Do's and Don'ts — Crude Oil Distillation Testing (Semi Dist-86S)",
    instrument: "Semi Dist-86S",
    docCode: "AI-QSOP-01",
    description:
      "Quick-reference safety checklist covering standard practices and safety warnings for operating the instrument.",
    images: ["/sop-images/dos-donts/page-1.png"],
  },
  {
    slug: "full-procedure",
    shortTitle: "Full Operating Procedure",
    fullTitle: "Standard Operating Procedure (SOP) — Crude Oil Distillation Testing (Semi Dist-86S)",
    instrument: "Semi Dist-86S",
    docCode: "AI-SOP-01",
    description:
      "Complete step-by-step operating procedure from sample pre-treatment through post-run shutdown.",
    images: ["/sop-images/full-procedure/page-1.png"],
  },
];

export const getSopBySlug = (slug) => sops.find((s) => s.slug === slug);
export default sops;
