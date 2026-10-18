/**
 * Evidence-based completion assessment.
 *
 * The headline percentage is a weighted judgment, not an arithmetic average
 * and not a count of files that exist. Each scored project is scored across two
 * measurements — core implementation and production/release readiness — and
 * the overall figure is their weighted combination:
 *
 *     overall = Σ(weight × percent) ÷ Σ(weight)
 *
 * with core implementation weighted twice as heavily as readiness. This keeps
 * code that is written but not configured, tested, or deployed from being
 * counted as finished. Deliverable states make that distinction explicit:
 * implemented code is not the same as tested, deployed, or operational code,
 * and blocked or unverified work is never counted as complete.
 *
 * Figures reflect the owner's documented assessment as of 16 October 2026.
 * They are engineering estimates, not measured percentages from a formal
 * independent audit. The assessment date is informational only; it never
 * changes any percentage below.
 *
 * Pentest Report Generator has no recovered percentage. Its entry stays
 * configurable and unscored (`PENTEST_COMPLETION_PERCENT`) rather than a guess.
 * It also has no progress status: "In Progress" would contradict the verified
 * prototype. The project card keeps "Prototype · local only".
 */

import type { PortfolioLanguage } from "~/i18n/l10n";

export type DeliverableState =
  /** Live and working in production. */
  | "operational"
  /** Shipped to a production environment. */
  | "deployed"
  /** Verified by tests, CI, or a documented check. */
  | "tested"
  /** Code exists but has not been independently verified here. */
  | "implemented"
  /** Cannot be called complete until an external blocker is resolved. */
  | "blocked"
  /** Needs confirmation; explicitly not counted as complete. */
  | "unverified";

export interface DeliverableStateMeta {
  label: string;
  /** Whether this state counts toward completed work. */
  counts: boolean;
  variant: "success" | "info" | "warning" | "default";
  description: string;
}

export const DELIVERABLE_STATES: Record<DeliverableState, DeliverableStateMeta> = {
  operational: { label: "Operational", counts: true, variant: "success", description: "Live and working in production." },
  deployed: { label: "Deployed", counts: true, variant: "success", description: "Shipped to a production environment." },
  tested: { label: "Tested", counts: true, variant: "info", description: "Verified by tests, CI, or a documented check." },
  implemented: { label: "Implemented", counts: true, variant: "info", description: "Code exists; not independently verified here." },
  blocked: { label: "Blocked", counts: false, variant: "warning", description: "Held by a blocker; not counted as complete." },
  unverified: { label: "Unverified", counts: false, variant: "default", description: "Needs confirmation; not counted as complete." },
};

export interface Deliverable {
  label: string;
  state: DeliverableState;
  evidence: string;
}

export interface Measurement {
  label: string;
  /** Relative weight in the overall figure. */
  weight: number;
  percent: number;
  note: string;
}

export interface ProjectAssessment {
  id: string;
  name: string;
  scope: string;
  confidence: string;
  /** ISO date the assessment reflects. */
  asOf: string;
  asOfLabel: string;
  disclaimer: string;
  measurements: Measurement[];
  deliverables: Deliverable[];
  remaining: string[];
  blocker?: { label: string; detail: string; href: string };
}

/** The weighted completion figure for an assessment, rounded to a whole percent. */
export function weightedCompletion(measurements: Measurement[]): number {
  const total = measurements.reduce((sum, m) => sum + m.weight, 0);
  if (total === 0) return 0;
  const weighted = measurements.reduce((sum, m) => sum + m.weight * m.percent, 0);
  return Math.round(weighted / total);
}

export const nexusosAssessment: ProjectAssessment = {
  id: "nexusos",
  name: "NexusOS",
  scope: "Backend, modules, deployment and remaining integrations",
  confidence: "Moderate — core work has merged PRs, a live deployment and baseline CI, but AI and billing integrations are not fully closed.",
  asOf: "2026-10-16",
  asOfLabel: "16 October 2026",
  disclaimer:
    "Engineering estimate from the documented project state, not a measured percentage from a fresh independent audit. Unconfigured integrations are not counted as completed merely because their code exists.",
  measurements: [
    {
      label: "Core implementation",
      weight: 2,
      percent: 88,
      note: "Expenses, Notifications, HR Leave/Attendance and dashboard work committed; PRs #25, #28 and #29 merged to main.",
    },
    {
      label: "Production & integration readiness",
      weight: 1,
      percent: 70,
      note: "Production deployment and baseline CI reported healthy, but AI configuration and operational billing are not closed.",
    },
  ],
  deliverables: [
    { label: "Expenses, Notifications, HR Leave/Attendance, dashboard", state: "deployed", evidence: "Committed and merged (PRs #25, #28, #29); production deployment reported healthy." },
    { label: "Baseline CI", state: "tested", evidence: "Baseline CI reported healthy on main." },
    { label: "Database migration state & permission catalog", state: "tested", evidence: "Verified in the documented checks." },
    { label: "Unauthenticated API returns 401, not 500", state: "tested", evidence: "Positive baseline access-control check." },
    { label: "OpenAI integration", state: "unverified", evidence: "Configuration and end-to-end behaviour still need confirmation." },
    { label: "Anthropic integration", state: "blocked", evidence: "Deferred due to additional API cost; not counted as a completed integration." },
    { label: "Stripe billing", state: "blocked", evidence: "Implemented but not operational: required credentials, price IDs and webhook configuration are missing." },
    { label: "Final integration checks & portfolio evidence", state: "unverified", evidence: "Architecture evidence, screenshots and portfolio documentation remain." },
  ],
  remaining: [
    "Finish and verify the OpenAI integration.",
    "Run end-to-end checks on Expenses, Notifications, HR and dashboard workflows without reopening verified features unnecessarily.",
    "Resolve the Stripe configuration blocker if operational billing is part of the release scope.",
    "Finish the architecture evidence, screenshots and portfolio documentation.",
  ],
};

export const ghostProtocolAssessment: ProjectAssessment = {
  id: "ghost-protocol",
  name: "Ghost Protocol",
  scope: "Web app, Electron desktop, authentication, API and release hardening",
  confidence: "Moderate-to-low — the full codebase has not been independently tested here, and the latest CI run failed to build.",
  asOf: "2026-10-16",
  asOfLabel: "16 October 2026",
  disclaimer:
    "Engineering estimate from the latest documented repository state, not a fresh audit. Planned features, architecture and portfolio presentation are not counted as completed implementation.",
  measurements: [
    {
      label: "Core implementation",
      weight: 2,
      percent: 85,
      note: "Electron desktop client, static web client, Node.js API, PostgreSQL, authentication and progress sync documented as implemented or deployed.",
    },
    {
      label: "Production & release readiness",
      weight: 1,
      percent: 65,
      note: "A deployed app is not a release-ready app: public desktop distribution is explicitly not ready until signing and notarization are configured.",
    },
  ],
  deliverables: [
    { label: "Web client, Node.js API, PostgreSQL, progress sync", state: "deployed", evidence: "Core client, API, profile/progress endpoints, database and production deployment documented." },
    { label: "Authentication & credential handling", state: "implemented", evidence: "README documents Argon2id, JWT access tokens, hashed refresh-token rotation, Electron isolation and secure credential storage where supported." },
    { label: "Node.js CI build", state: "blocked", evidence: "CI failed on 16 October during `npm run build --if-present` across the Node.js matrix; the test step was skipped." },
    { label: "Password reset", state: "blocked", evidence: "Documented gap; visible in the UI but not available." },
    { label: "Google OAuth account-linking", state: "unverified", evidence: "A remaining account-linking risk is documented." },
    { label: "Concurrent multi-device conflict handling", state: "unverified", evidence: "Last-write-wins; conflict-safe sync is not claimed." },
    { label: "Production CSP response header", state: "unverified", evidence: "Documented as remaining release work." },
    { label: "Signed / notarized desktop release", state: "blocked", evidence: "Public desktop distribution is not ready until signing and notarization are configured." },
    { label: "Genuine application screenshots", state: "unverified", evidence: "Product screenshots are still marked as placeholders in the README." },
  ],
  remaining: [
    "Diagnose and fix the current CI build failure, then rerun the full test suite.",
    "Verify authentication, progress persistence and synchronization against the deployed backend.",
    "Address release-critical security findings and decide which planned features are required for the intended release.",
    "Capture genuine application screenshots and complete the portfolio presentation.",
  ],
  blocker: {
    label: "CI build failure — 16 October",
    detail: "The Node.js CI workflow failed during `npm run build --if-present` across the matrix; the test step was skipped. This blocks calling the latest commit fully verified.",
    href: "https://github.com/waley7337/Ghost-Protocol/actions/runs/38877726523",
  },
};

/**
 * No completion percentage for the Pentest Report Generator was recovered from
 * git history, project notes, or the 16 October 2026 audit. Leave this null.
 */
export const PENTEST_COMPLETION_PERCENT: number | null = null;

export type ProgressStatus = "in-progress" | "completed" | "planned";

export interface ProjectProgress {
  id: string;
  name: string;
  /** Headline 0–100 figure. Null when no percentage was recovered. */
  percent: number | null;
  /**
   * Omitted when a status badge would contradict the verified state.
   * NexusOS and Ghost Protocol keep "in-progress".
   */
  status?: ProgressStatus;
  /** What the percentage measures. Not test coverage and not deployment health. */
  scope: Record<PortfolioLanguage, string>;
  /** Genuine assessment date. Omitted when there is no assessment. */
  updatedAt?: string;
  updatedLabel?: Record<PortfolioLanguage, string>;
}

const nexusPercent = weightedCompletion(nexusosAssessment.measurements);
const ghostPercent = weightedCompletion(ghostProtocolAssessment.measurements);

export const projectProgress: ProjectProgress[] = [
  {
    id: "nexusos",
    name: "NexusOS",
    percent: nexusPercent,
    status: "in-progress",
    updatedAt: nexusosAssessment.asOf,
    updatedLabel: { en: nexusosAssessment.asOfLabel, de: "16. Oktober 2026", fr: "16 octobre 2026" },
    scope: {
      en: "Weighted completion of backend, modules, deployment and remaining integrations. Core implementation counts twice as much as production and integration readiness. This is not test coverage, and a deployment is not treated as fully operational. Owner's engineering estimate, not an audited measurement.",
      de: "Gewichteter Umsetzungsstand von Backend, Modulen, Bereitstellung und offenen Integrationen. Die Kernimplementierung zählt doppelt so stark wie die Produktions- und Integrationsreife. Das ist keine Testabdeckung, und eine Bereitstellung gilt damit nicht als vollständig betriebsbereit. Technische Schätzung des Eigentümers, keine auditierte Messung.",
      fr: "Avancement pondéré du backend, des modules, du déploiement et des intégrations restantes. L'implémentation centrale compte deux fois plus que la maturité de production et d'intégration. Ce n'est pas une couverture de tests, et un déploiement n'est pas traité comme pleinement opérationnel. Estimation d'ingénierie du propriétaire, et non une mesure auditée.",
    },
  },
  {
    id: "ghost-protocol",
    name: "Ghost Protocol",
    percent: ghostPercent,
    status: "in-progress",
    updatedAt: ghostProtocolAssessment.asOf,
    updatedLabel: { en: ghostProtocolAssessment.asOfLabel, de: "16. Oktober 2026", fr: "16 octobre 2026" },
    scope: {
      en: "Weighted completion of the web app, Electron desktop, authentication, API and release hardening. Core implementation counts twice as much as production and release readiness. This is not test coverage, and a deployed URL is not treated as a finished release. Owner's engineering estimate, not an audited measurement.",
      de: "Gewichteter Umsetzungsstand von Web-App, Electron-Desktop, Authentifizierung, API und Release-Härtung. Die Kernimplementierung zählt doppelt so stark wie die Produktions- und Releasereife. Das ist keine Testabdeckung, und eine bereitgestellte URL gilt damit nicht als abgeschlossenes Release. Technische Schätzung des Eigentümers, keine auditierte Messung.",
      fr: "Avancement pondéré de l'application web, du bureau Electron, de l'authentification, de l'API et du durcissement de la release. L'implémentation centrale compte deux fois plus que la maturité de production et de release. Ce n'est pas une couverture de tests, et une URL déployée n'est pas traitée comme une release terminée. Estimation d'ingénierie du propriétaire, et non une mesure auditée.",
    },
  },
  {
    id: "pentest-report-generator",
    name: "Pentest Report Generator (v1)",
    percent: PENTEST_COMPLETION_PERCENT,
    scope: {
      en: "Local Nessus-to-PDF prototype. No completion percentage was recovered, so none is shown. The tool runs locally; there is no hosted demo.",
      de: "Lokaler Prototyp, der ein Nessus-XML in einen PDF-Bericht überführt. Ein Fertigstellungsgrad wurde nicht wiederhergestellt und wird daher nicht angezeigt. Das Werkzeug läuft lokal; es gibt keine gehostete Demo.",
      fr: "Prototype local qui transforme un XML Nessus en rapport PDF. Aucun pourcentage d'achèvement n'a été retrouvé, donc aucun n'est affiché. L'outil s'exécute en local ; il n'y a pas de démo hébergée.",
    },
  },
];

export const progressStatusLabel: Record<PortfolioLanguage, Record<ProgressStatus, string>> = {
  en: { "in-progress": "In Progress", completed: "Completed", planned: "Planned" },
  de: { "in-progress": "In Entwicklung", completed: "Abgeschlossen", planned: "Geplant" },
  fr: { "in-progress": "En cours", completed: "Terminé", planned: "Prévu" },
};

export const progressChrome = {
  en: { notAssessed: "Not assessed", assessed: "Assessed", completion: "completion" },
  de: { notAssessed: "Nicht bewertet", assessed: "Bewertet am", completion: "Fertigstellungsgrad" },
  fr: { notAssessed: "Non évalué", assessed: "Évalué le", completion: "avancement" },
} as const;

export function progressById(id: string): ProjectProgress | undefined {
  return projectProgress.find((entry) => entry.id === id);
}
