/**
 * Ghost Protocol project copy and interface assets.
 *
 * Status wording is kept as precise as the project's own documentation: what
 * is implemented, the decisions behind it, and what is deliberately not
 * claimed. Screenshots are captured from the running web client.
 */

import type { Asset } from "~/data/assets";

export const ghostProtocol = {
  subtitle:
    "A cybersecurity learning platform for HTTP request-smuggling — a gamified operations center that teaches desync techniques through missions, ranks and an intel codex.",
  summary: [
    "Ghost Protocol is a cybersecurity learning platform delivered as an Electron desktop app and a static web client, backed by a Node.js API for authentication, profile and progress. The web client is deployed; signed public desktop builds and conflict-safe multi-device sync are not.",
    "The product is a gamified operations center: operators work missions that teach HTTP request-smuggling and desync techniques, earn XP toward operative ranks, and reference an intel codex of the underlying concepts.",
  ],
  role: "Sole developer — desktop and web clients, the Node.js API, authentication, and the mission, progress and design work.",
  status: {
    headline:
      "An in-progress learning platform: the web client is deployed, with authentication, missions, quizzes and XP working across both clients.",
    implemented:
      "Dashboard, missions, quizzes and XP in both the desktop app and the web client. API routes for register, login, refresh, logout and Google sign-in, plus profile and progress read/write. Browser tokens stay in memory; Electron can store the refresh token with safeStorage.",
    partial:
      "Password reset is visible in the UI but not available. Public desktop signing is not configured.",
    notClaimed:
      "Neither client talks to PostgreSQL directly — the API is the only database client. The supabase/ directory is legacy and unused at runtime. Concurrent edits from two devices are last-write-wins; conflict-safe sync is not claimed.",
  },
  highlights: [
    {
      title: "Two clients, one API",
      body: "An Electron desktop app and a static web client share a single Node.js API. Neither client talks to the database — the API is the only database client.",
    },
    {
      title: "Full authentication lifecycle",
      body: "Register, login, refresh, logout and Google sign-in. Browser tokens stay in memory; Electron can store the refresh token with the OS keychain via safeStorage.",
    },
    {
      title: "Missions, quizzes and XP",
      body: "Operators work missions that teach request-smuggling techniques, answer quizzes, and earn XP that advances them through the operative rank ladder.",
    },
    {
      title: "Intel codex",
      body: "A reference of the underlying concepts — CL.TE, TE.CL, TE.TE, H2.CL, CRLF injection, response queue poisoning and more — alongside the missions that exploit them.",
    },
    {
      title: "Honest about its limits",
      body: "Password reset is shown but not available, public desktop signing is not configured, and multi-device edits are last-write-wins. None of these are claimed as done.",
    },
    {
      title: "Deployed web client",
      body: "The static web client is live on Vercel; the desktop build runs on Electron 37. Progress and profile persist through the shared API.",
    },
  ],
  stack: [
    { label: "Clients", value: "Electron 37 desktop app, static web client" },
    { label: "Backend", value: "Node.js API — authentication, profile and progress" },
    { label: "Data", value: "PostgreSQL (API-only client)" },
    { label: "Security", value: "Argon2id password hashing, JWT access and refresh tokens, Electron safeStorage" },
  ],
  github: "https://github.com/waley7337/Ghost-Protocol",
  demo: { href: "https://ghost-protocol-pi.vercel.app", label: "Live web app" },
  interfaceNote:
    "Captured from the running Ghost Protocol web client. The operations center, missions, ranks and intel codex as shipped.",
};

const GP = "ghost-protocol";
const shot = (name: string, title: string, description: string): Asset => ({
  id: `gp-${name.replace(/^\d+-/, "")}`,
  title,
  description,
  kind: "image",
  status: "published",
  src: `/images/${GP}/${name}.png`,
  preview: `/images/${GP}/${name}.preview.webp`,
  meta: "PNG · 3599×2080 · web client",
});

const diagram = (name: string, title: string, description: string, meta: string): Asset => ({
  id: `gp-${name}`,
  title,
  description,
  kind: "image",
  status: "published",
  src: `/images/${GP}/${name}.png`,
  preview: `/images/${GP}/${name}.preview.webp`,
  meta,
});

/** Architecture diagrams, derived from the implemented Ghost Protocol codebase. */
export const ghostProtocolArchitecture: Asset[] = [
  diagram(
    "system-architecture",
    "System Architecture",
    "Four layers from the untrusted Electron renderer and web client, through the trust boundary, to the token-authenticated API and Railway PostgreSQL — with implementation status and documented limits.",
    "PNG · 3600×2082",
  ),
  diagram(
    "security-architecture",
    "Security Architecture",
    "Defense in depth across the renderer, bridge, credential and backend layers — the controls live today and the residual risks that remain honest.",
    "PNG · 3600×2082",
  ),
];

/** Workflow artefacts: the engineering story and the development roadmap. */
export const ghostProtocolWorkflow: Asset[] = [
  diagram(
    "development-roadmap",
    "Development Roadmap",
    "From secure scaffold to live production: core product verified, the security audit underway, and the release and portfolio phases next.",
    "PNG · 3600×2082",
  ),
  diagram(
    "case-study",
    "Engineering Case Study",
    "The one-page case study: the challenge, the solution, before/after, key security decisions, results and honest scope.",
    "PNG · 2480×3508 · portrait",
  ),
];

/** Interface screenshots, ordered as a short product tour. */
export const ghostProtocolShots: Asset[] = [
  shot("01-boot-sequence", "Boot sequence", "The initialization screen — Ghost Protocol systems coming online before the operations center loads."),
  shot("02-operations-center", "Operations Center", "The mission dashboard: completion, total XP, operative rank and streak across the practitioner-tier core techniques."),
  shot("03-mission-grid", "Mission grid", "The practitioner-tier techniques as a grid of missions, each with its XP reward and solved state."),
  shot("04-intel-codex", "Intel Codex", "A reference of the smuggling concepts behind the missions — CL.TE, TE.CL, TE.TE, H2.CL, CRLF injection, response queue poisoning and more."),
  shot("05-operative-ranks", "Operative Ranks", "The rank ladder from Civilian to Ghost Protocol, with the operator's current rank highlighted."),
  shot("06-rank-progression", "Rank progression", "The same ladder showing XP thresholds for each operative rank."),
  shot("07-operator-profile", "Operator profile", "The signed-in operator panel: rank, level and XP, with sign-out."),
  shot("08-mission-complete", "Mission complete", "The HTTP/2 request-splitting mission solved — the +500 XP reward and best-time overlay."),
  shot("09-attack-flow", "Mission attack flow", "A mission's attack-flow diagram: attacker to front-end to a downgraded back-end, above the payload editor."),
  shot("10-web-cache-poisoning", "Web cache poisoning", "An expert-tier mission brief: poison the cache so a resource serves a redirect to every future visitor."),
  shot("11-mission-guide", "Step-by-step mission guide", "The expanded mission guide: understand the chain, set up the exploit server, craft the poison request, verify."),
  shot("12-payload-editor", "Payload editor", "The payload editor and server-response pane where operators build and fire a crafted request."),
];
