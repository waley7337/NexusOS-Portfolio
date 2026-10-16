/**
 * Ghost Protocol documentation cards. Each line is taken from the public
 * docs in waley7337/Ghost-Protocol. The profile copy itself stays in projects.ts.
 */

export interface GhostDoc {
  title: string;
  body: string;
  href: string;
}

const doc = (file: string) => `https://github.com/waley7337/Ghost-Protocol/blob/main/docs/${file}`;

export const ghostDocs: GhostDoc[] = [
  {
    title: "Architecture",
    body: "Web on Vercel, with the API and PostgreSQL on Railway. The application is single-user scoped, not multi-tenant. Items marked planned are not implemented.",
    href: doc("ARCHITECTURE.md"),
  },
  {
    title: "Security",
    body: "Separates implemented controls from planned ones. Electron renderer isolation is documented as on. A signed public desktop release is not claimed.",
    href: doc("SECURITY.md"),
  },
  {
    title: "Threat model",
    body: "Assets and trust boundaries for the single-user application. Planned mitigations stay labeled as not implemented unless Security lists them as current.",
    href: doc("THREAT_MODEL.md"),
  },
  {
    title: "Roadmap",
    body: "Uses honesty labels for implemented, verified, and planned work. No Redis. The supabase directory is legacy and unused at runtime.",
    href: doc("ROADMAP.md"),
  },
  {
    title: "Phase 9 audit",
    body: "Conditional go for private testing and controlled demos. No-go for public unsigned Electron distribution, and no-go for claims of conflict-safe multi-device sync.",
    href: doc("PHASE-9-AUDIT.md"),
  },
  {
    title: "Desktop release",
    body: "macOS ARM64 package for controlled demos. Not Developer ID signed or notarized. Packaged builds target the Railway API.",
    href: doc("DESKTOP-RELEASE.md"),
  },
];

export const ghostScreenshotNote =
  "Captured from the deployed web client at ghost-protocol-pi.vercel.app. Click a panel to inspect it.";
