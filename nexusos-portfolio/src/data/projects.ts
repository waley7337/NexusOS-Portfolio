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
