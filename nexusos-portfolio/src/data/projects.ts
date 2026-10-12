/**
 * Other software projects, verified from their public repositories.
 * NexusOS stays in `nexusos.ts` and is not repeated here.
 * No private repository URLs.
 */

export type ProjectStatus = "completed" | "in-progress" | "prototype" | "concept";

export interface OtherProject {
  name: string;
  status: ProjectStatus;
  statusLabel: string;
  summary: string;
  stack: string[];
  /** Implemented behaviour, including limits the project's own docs state. */
  features: string[];
  decisions: string[];
  github?: string;
  demo?: { href: string; label: string };
  /** Wider card. Used for the deeper project, under the NexusOS flagship. */
  prominent?: boolean;
}

export const otherProjects: OtherProject[] = [
  {
    name: "Ghost Protocol",
    status: "in-progress",
    statusLabel: "In progress",
    summary:
      "Cybersecurity learning platform: an Electron desktop app and a static web client, with a Node.js API for authentication, profile and progress. The web client is deployed. Password reset, signed public desktop builds and conflict-safe multi-device sync are not.",
    stack: ["Electron 37", "Static web", "Node.js", "PostgreSQL", "Argon2id", "JWT"],
    features: [
      "Dashboard, missions, quizzes and XP in both the desktop app and the web client.",
      "API routes for register, login, refresh, logout and Google sign-in, plus profile and progress read/write.",
      "Browser tokens stay in memory. Electron can store the refresh token with safeStorage.",
      "Password reset is visible in the UI and not available. Public desktop signing is not configured.",
    ],
    decisions: [
      "Neither client talks to PostgreSQL. The API is the only database client.",
      "The supabase/ directory is legacy and unused at runtime.",
      "Concurrent edits from two devices are last-write-wins. Conflict-safe sync is not claimed.",
    ],
    github: "https://github.com/waley7337/Ghost-Protocol",
    demo: { href: "https://ghost-protocol-pi.vercel.app", label: "Live web app" },
    prominent: true,
  },
  {
    name: "Pentest Report Generator (v1)",
    status: "prototype",
    statusLabel: "Prototype · local only",
    summary:
      "Local Python tool that turns a Nessus XML scan into a PDF report. It runs in Streamlit on the machine it is installed on. There is no hosted demo.",
    stack: ["Python", "Streamlit", "ReportLab"],
    features: [
      "Parses .nessus XML into finding records and merges the same vulnerability across hosts.",
      "Streamlit UI to review findings, enter client details and download a PDF.",
      "A sample scan is included for a local run.",
      "No Burp or Nmap parser, no accounts, and no hosted deployment. CVSS values are taken from the scanner and not re-scored.",
    ],
    decisions: [
      "The report is deterministic parsing and templates, not generated prose.",
      "One finding per vulnerability, even when several hosts are affected.",
    ],
    github: "https://github.com/waley7337/pentest-report-tool",
  },
];
