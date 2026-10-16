/**
 * Asset registry — the single list the library, CV and education sections
 * read from. Adding material is: drop the file under public/, add one entry.
 *
 * status
 *   published  file is in public/ and served to every visitor
 *   withheld   file exists but is NOT published (personal data); the UI
 *              shows the entry as "available on request"
 *
 * Withheld files are deliberately not in this repository. To publish one,
 * place it at `src` below and flip its status to "published". An asset with
 * a `notice` renders it beside every open/download control.
 */

import { l10n, type L10n } from "~/i18n/l10n";

export type AssetKind = "pdf" | "image";
export type AssetStatus = "published" | "withheld";

export interface Asset {
  id: string;
  title: L10n<string>;
  description: L10n<string>;
  kind: AssetKind;
  status: AssetStatus;
  /** Path under public/ (the real, unmodified file). */
  src: string;
  /** Web-sized preview generated from `src` (first page for PDFs). */
  preview?: string;
  /** Human-readable size and format, shown as machine register. */
  meta: L10n<string>;
  /** Explanation shown for withheld entries, or what a redacted copy omits. */
  note?: L10n<string>;
  /** Shown next to every open/download control, before the file is opened. */
  notice?: L10n<string>;
  /** Provenance badge, e.g. "Original, unmodified" or "Redacted copy". */
  label?: L10n<string>;
}

export interface Folder {
  id: string;
  label: L10n<string>;
  description: L10n<string>;
  group: "Documents" | "Images";
  assets: Asset[];
}

const metaSame = (text: string) => l10n(text, text, text);

export const DEGREE_PRIVACY_NOTICE = l10n(
  "Privacy notice: This original degree certificate contains personal information, including date and place of birth, a diploma number, and signatures. Opening or downloading it will reveal these details.",
  "Hinweis zum Datenschutz: Diese originale Diplomurkunde enthält personenbezogene Angaben, darunter Geburtsdatum und Geburtsort, eine Diplomnummer und Unterschriften. Beim Öffnen oder Herunterladen werden diese Angaben sichtbar.",
  "Avis de confidentialité : ce diplôme original contient des informations personnelles, dont la date et le lieu de naissance, un numéro de diplôme et des signatures. L'ouvrir ou le télécharger révèle ces informations.",
);

const REDACTED_NOTE = l10n(
  "Redacted copy. Date of birth and age are removed from the page and the text layer; links to the private NexusOS repository are replaced with the public GitHub profile. The original document is unchanged and not published.",
  "Geschwärzte Fassung. Geburtsdatum und Alter sind auf der Seite und in der Textebene entfernt; Links zum privaten NexusOS-Repository sind durch das öffentliche GitHub-Profil ersetzt. Das Originaldokument ist unverändert und nicht veröffentlicht.",
  "Copie expurgée. La date de naissance et l'âge sont retirés de la page et de la couche de texte ; les liens vers le dépôt privé NexusOS sont remplacés par le profil GitHub public. Le document original est inchangé et n'est pas publié.",
);

const REDACTED_LABEL = l10n("Redacted copy", "Geschwärzte Fassung", "Copie expurgée");
const ORIGINAL_LABEL = l10n("Original, unmodified", "Original, unverändert", "Original, non modifié");

export const cv: Asset = {
  id: "cv-de",
  title: l10n("Lebenslauf — Waley El-Nagdi", "Lebenslauf — Waley El-Nagdi", "Lebenslauf — Waley El-Nagdi"),
  description: l10n(
    "Junior Software Developer • Applikationsentwicklung (AQUA). One page, German.",
    "Junior Software Developer • Applikationsentwicklung (AQUA). Eine Seite, Deutsch.",
    "Junior Software Developer • Applikationsentwicklung (AQUA). Une page, allemand.",
  ),
  kind: "pdf",
  status: "published",
  src: "/documents/cv/waley-el-nagdi-cv-de.pdf",
  preview: "/documents/cv/waley-el-nagdi-cv-de.preview.webp",
  meta: l10n("PDF · 1 page · 6 KB · DE", "PDF · 1 Seite · 6 KB · DE", "PDF · 1 page · 6 KB · DE"),
};

export const degree: Asset = {
  id: "licence-strasbourg",
  title: l10n(
    "Licence — Université de Strasbourg (2020)",
    "Licence — Université de Strasbourg (2020)",
    "Licence — Université de Strasbourg (2020)",
  ),
  description: l10n(
    "Licence mention Langues, littératures étrangères et régionales — Département d'études anglophones, mention bien.",
    "Licence mention Langues, littératures étrangères et régionales — Département d'études anglophones, mention bien.",
    "Licence mention Langues, littératures étrangères et régionales — Département d'études anglophones, mention bien.",
  ),
  kind: "pdf",
  status: "published",
  src: "/documents/education/licence-etudes-anglophones-strasbourg-2020.pdf",
  meta: l10n(
    "PDF · 1 page · 361 KB · scanned diploma · FR",
    "PDF · 1 Seite · 361 KB · gescanntes Diplom · FR",
    "PDF · 1 page · 361 KB · diplôme numérisé · FR",
  ),
  notice: DEGREE_PRIVACY_NOTICE,
  label: ORIGINAL_LABEL,
};

export const caseStudy: Asset = {
  id: "nexusos-case-study",
  title: l10n(
    "NexusOS — Engineering Case Study",
    "NexusOS — Technische Fallstudie",
    "NexusOS — Étude de cas d'ingénierie",
  ),
  description: l10n(
    "The full case study: architecture, security model, tenant isolation, decisions and trade-offs.",
    "Die vollständige Fallstudie: Architektur, Sicherheitsmodell, Mandantenisolierung, Entscheidungen und Abwägungen.",
    "L'étude de cas complète : architecture, modèle de sécurité, isolation des tenants, décisions et compromis.",
  ),
  kind: "pdf",
  status: "published",
  src: "/documents/technical-documentation/nexusos-case-study.pdf",
  preview: "/documents/technical-documentation/nexusos-case-study.preview.webp",
  meta: l10n("PDF · 11 pages · 49 KB", "PDF · 11 Seiten · 49 KB", "PDF · 11 pages · 49 KB"),
};

export const portfolioSummary: Asset = {
  id: "nexusos-portfolio-summary",
  title: l10n("NexusOS — Portfolio Summary", "NexusOS — Portfolio-Überblick", "NexusOS — Synthèse du portfolio"),
  description: l10n(
    "Two-page overview of the platform, its engineering highlights and current status.",
    "Zweiseitiger Überblick über die Plattform, die technischen Schwerpunkte und den aktuellen Stand.",
    "Synthèse de deux pages sur la plateforme, ses points d'ingénierie et son état actuel.",
  ),
  kind: "pdf",
  status: "published",
  src: "/documents/project-summaries/nexusos-portfolio-summary.pdf",
  preview: "/documents/project-summaries/nexusos-portfolio-summary.preview.webp",
  meta: l10n("PDF · 2 pages · 23 KB", "PDF · 2 Seiten · 23 KB", "PDF · 2 pages · 23 KB"),
};

export const portfolio2026Redacted: Asset = {
  id: "portfolio-2026-redacted",
  title: l10n(
    "Software Developer Portfolio 2026 (redacted copy)",
    "Software-Developer-Portfolio 2026 (geschwärzte Fassung)",
    "Portfolio développeur logiciel 2026 (copie expurgée)",
  ),
  description: l10n(
    "The ten-page AQUA / LAP application portfolio: approach, workflow, NexusOS architecture, security, skills and the AQUA pathway.",
    "Das zehnseitige Bewerbungsportfolio für AQUA / LAP: Ansatz, Arbeitsablauf, NexusOS-Architektur, Sicherheit, Fähigkeiten und der AQUA-Weg.",
    "Le portfolio de candidature AQUA / LAP de dix pages : démarche, processus, architecture NexusOS, sécurité, compétences et le parcours AQUA.",
  ),
  kind: "pdf",
  status: "published",
  src: "/documents/project-summaries/waley-el-nagdi-portfolio-2026-redacted.pdf",
  preview: "/documents/project-summaries/waley-el-nagdi-portfolio-2026-redacted.preview.webp",
  meta: l10n("PDF · 10 pages · 3.9 MB", "PDF · 10 Seiten · 3,9 MB", "PDF · 10 pages · 3,9 Mo"),
  note: REDACTED_NOTE,
  label: REDACTED_LABEL,
};

export const projectSummaryRedacted: Asset = {
  id: "nexusos-project-summary-redacted",
  title: l10n(
    "NexusOS — Project Summary (redacted copy)",
    "NexusOS — Projektzusammenfassung (geschwärzte Fassung)",
    "NexusOS — Synthèse de projet (copie expurgée)",
  ),
  description: l10n(
    "Four-page project summary: overview, role, development highlights, technology and status as of that version.",
    "Vierseitige Projektzusammenfassung: Überblick, Rolle, Entwicklungsschwerpunkte, Technologie und Stand dieser Fassung.",
    "Synthèse de projet de quatre pages : vue d'ensemble, rôle, points de développement, technologie et état de cette version.",
  ),
  kind: "pdf",
  status: "published",
  src: "/documents/project-summaries/nexusos-project-summary-redacted.pdf",
  preview: "/documents/project-summaries/nexusos-project-summary-redacted.preview.webp",
  meta: l10n("PDF · 4 pages · 184 KB", "PDF · 4 Seiten · 184 KB", "PDF · 4 pages · 184 KB"),
  note: REDACTED_NOTE,
  label: REDACTED_LABEL,
};

const image = (
  folder: string,
  name: string,
  title: L10n<string>,
  description: L10n<string>,
  meta: L10n<string>,
): Asset => ({
  id: name,
  title,
  description,
  kind: "image",
  status: "published",
  src: `/images/${folder}/${name}.png`,
  preview: `/images/${folder}/${name}.preview.webp`,
  meta,
});

const diagram = (px: string) => metaSame(`PNG · ${px}`);

export const systemArchitecture = image(
  "architecture",
  "system-architecture",
  l10n("System Architecture", "Systemarchitektur", "Architecture système"),
  l10n(
    "Five layers from the untrusted browser to PostgreSQL and Redis, with the live API surface and implementation status.",
    "Fünf Schichten vom nicht vertrauenswürdigen Browser bis zu PostgreSQL und Redis, mit der live API-Oberfläche und dem Umsetzungsstand.",
    "Cinq couches, du navigateur non fiable jusqu'à PostgreSQL et Redis, avec la surface d'API en ligne et l'état d'implémentation.",
  ),
  diagram("3600×2082"),
);

export const securityArchitecture = image(
  "security",
  "security-architecture",
  l10n("Security Architecture", "Sicherheitsarchitektur", "Architecture de sécurité"),
  l10n(
    "Seven layered controls applied to every request, cross-cutting controls, and what is deliberately not claimed.",
    "Sieben geschichtete Kontrollen für jede Anfrage, querschnittliche Kontrollen und das, was bewusst nicht behauptet wird.",
    "Sept contrôles en couches appliqués à chaque requête, des contrôles transverses, et ce qui n'est délibérément pas revendiqué.",
  ),
  diagram("3600×2076"),
);

export const multiTenantFlow = image(
  "multi-tenancy",
  "multi-tenant-request-flow",
  l10n("Multi-Tenant Request Flow", "Ablauf einer Mandantenanfrage", "Flux d'une requête multi-tenant"),
  l10n(
    "How one authenticated request establishes identity, authority and tenant scope — and where each becomes authoritative.",
    "Wie eine authentifizierte Anfrage Identität, Befugnis und Mandantenbereich festlegt — und wo jedes davon maßgeblich wird.",
    "Comment une requête authentifiée établit l'identité, l'autorité et le périmètre du tenant — et où chacun devient déterminant.",
  ),
  diagram("3600×2083"),
);

const CURRENT = "screenshots/current-design";
const currentMeta = l10n(
  "PNG · 3200×2000 · current design",
  "PNG · 3200×2000 · aktuelles Design",
  "PNG · 3200×2000 · design actuel",
);
const shot = (name: string, title: L10n<string>, description: L10n<string>) => image(CURRENT, name, title, description, currentMeta);

/**
 * Captured from the running NexusOS frontend (main @ 879e442) at 1600×1000,
 * 2× pixel ratio, against a local API stub. Earlier-design originals are kept
 * outside public/ in assets/screenshots/legacy/ and are never shown here.
 */
export const currentDesignShots: Asset[] = [
  shot(
    "03-dashboard-dark",
    l10n("Mission Control — dark", "Mission Control — dunkel", "Mission Control — sombre"),
    l10n(
      "The dashboard in dark mode: workspace hero, live API and database probes, operations panel and module readiness.",
      "Das Dashboard im dunklen Modus: Arbeitsbereich, Live-Prüfungen von API und Datenbank, Operations-Panel und Modulbereitschaft.",
      "Le tableau de bord en mode sombre : en-tête de l'espace, sondes en direct de l'API et de la base, panneau d'opérations et état des modules.",
    ),
  ),
  shot(
    "15-dashboard-light",
    l10n("Mission Control — light", "Mission Control — hell", "Mission Control — clair"),
    l10n(
      "The same workspace in the light theme.",
      "Derselbe Arbeitsbereich im hellen Thema.",
      "Le même espace de travail dans le thème clair.",
    ),
  ),
  shot(
    "01-sign-in",
    l10n("Multi-tenant sign-in", "Mandantenfähige Anmeldung", "Connexion multi-tenant"),
    l10n(
      "The Company URL field is the tenant selector. Shown with a stub demo identity.",
      "Das Feld Company URL ist die Mandantenauswahl. Gezeigt mit einer Stub-Demo-Identität.",
      "Le champ Company URL est le sélecteur de tenant. Affiché avec une identité de démo fictive.",
    ),
  ),
  shot(
    "05-capture-palette",
    l10n("Capture", "Capture", "Capture"),
    l10n(
      "Quick navigation and theme switching from anywhere in the shell; create actions appear as modules ship.",
      "Schnelle Navigation und Themenwechsel von überall in der Shell; Erstellen-Aktionen erscheinen, wenn Module fertig sind.",
      "Navigation rapide et changement de thème depuis n'importe où dans le shell ; les actions de création apparaissent à mesure que les modules sont livrés.",
    ),
  ),
  shot(
    "02-account-dialog",
    l10n("Account dialog", "Kontodialog", "Dialogue du compte"),
    l10n(
      "Signed-in identity and workspace. Name, email and company values are blurred.",
      "Angemeldete Identität und Arbeitsbereich. Name, E-Mail und Unternehmen sind unscharf.",
      "Identité connectée et espace de travail. Le nom, l'e-mail et l'entreprise sont floutés.",
    ),
  ),
  shot(
    "04-dashboard-dark-lower",
    l10n("Module field", "Modulfeld", "Champ des modules"),
    l10n(
      "Every module route with its real state — operational or not — and the platform pillars.",
      "Jede Modulroute mit ihrem tatsächlichen Zustand — betriebsbereit oder nicht — und die Plattformpfeiler.",
      "Chaque route de module avec son état réel — opérationnel ou non — et les piliers de la plateforme.",
    ),
  ),
  shot(
    "06-design-tokens",
    l10n("Design system — Tokens 2.0", "Designsystem — Tokens 2.0", "Design system — Tokens 2.0"),
    l10n(
      "Neutral ladder, glow tokens, glass surface and the qualitative chart palette.",
      "Neutrale Stufen, Glow-Tokens, Glasfläche und die qualitative Diagrammpalette.",
      "Échelle neutre, jetons de lueur, surface verre et palette qualitative des graphiques.",
    ),
  ),
  shot(
    "07-design-surfaces",
    l10n("Design system — Surfaces", "Designsystem — Flächen", "Design system — Surfaces"),
    l10n(
      "Solid, glass and glow surfaces and the rules for when each is allowed.",
      "Feste, Glas- und Glow-Flächen und die Regeln, wann jede erlaubt ist.",
      "Surfaces pleines, verre et lumineuses, et les règles qui disent quand chacune est permise.",
    ),
  ),
  shot(
    "08-design-layout-shell",
    l10n("Design system — Layout & shell", "Designsystem — Layout und Shell", "Design system — Mise en page et shell"),
    l10n(
      "The shared PageHeader and the live-status shell primitives.",
      "Der gemeinsame PageHeader und die Shell-Bausteine für den Live-Status.",
      "Le PageHeader partagé et les primitives du shell pour l'état en direct.",
    ),
  ),
  shot(
    "09-design-surface-ladder",
    l10n("Design system — Surface ladder", "Designsystem — Flächenstufen", "Design system — Échelle de surfaces"),
    l10n(
      "Six-step surface ladder, two-step accent, chart series and section headers.",
      "Flächenleiter in sechs Stufen, Akzent in zwei Stufen, Diagrammreihen und Abschnittsköpfe.",
      "Échelle de surfaces en six degrés, accent en deux degrés, séries de graphiques et en-têtes de section.",
    ),
  ),
  shot(
    "10-design-dashboard-framework",
    l10n("Design system — Dashboard framework", "Designsystem — Dashboard-Rahmen", "Design system — Cadre de tableau de bord"),
    l10n(
      "StatCard, sparkline, radial gauge, progress list and checklist components.",
      "Komponenten StatCard, Sparkline, Radialanzeige, Fortschrittsliste und Checkliste.",
      "Composants StatCard, sparkline, jauge radiale, liste de progression et liste de contrôle.",
    ),
  ),
  shot(
    "11-design-typography-buttons",
    l10n("Design system — Typography", "Designsystem — Typografie", "Design system — Typographie"),
    l10n(
      "Type scale, radius and elevation, and the button set.",
      "Schriftgrößen, Radius und Erhebung sowie der Button-Satz.",
      "Échelle typographique, rayon et élévation, et le jeu de boutons.",
    ),
  ),
  shot(
    "13-design-buttons-forms",
    l10n("Design system — Buttons & forms", "Designsystem — Buttons und Formulare", "Design system — Boutons et formulaires"),
    l10n(
      "Button variants and sizes, then the form controls with an inline validation error.",
      "Button-Varianten und Größen, danach die Formularfelder mit einem Inline-Validierungsfehler.",
      "Variantes et tailles de boutons, puis les champs de formulaire avec une erreur de validation en ligne.",
    ),
  ),
  shot(
    "12-design-forms-feedback",
    l10n("Design system — Forms", "Designsystem — Formulare", "Design system — Formulaires"),
    l10n(
      "Form controls in their default state, leading into feedback components.",
      "Formularfelder im Ausgangszustand, überleitend zu den Feedback-Komponenten.",
      "Champs de formulaire dans leur état par défaut, en transition vers les composants de retour.",
    ),
  ),
  shot(
    "14-design-feedback",
    l10n("Design system — Feedback", "Designsystem — Rückmeldung", "Design system — Retour"),
    l10n(
      "Alerts, toast triggers, loading, empty and error states.",
      "Hinweise, Toast-Auslöser sowie Lade-, Leer- und Fehlerzustände.",
      "Alertes, déclencheurs de toast, états de chargement, de vide et d'erreur.",
    ),
  ),
];

/** The four shown inline in the NexusOS section; the library folder holds all of them. */
export const interfaceShots = currentDesignShots.slice(0, 4);

const GHOST = "ghost-protocol";
const liveClientMeta = l10n(
  "PNG · 1412×799 · live web client",
  "PNG · 1412×799 · Live-Webclient",
  "PNG · 1412×799 · client web en ligne",
);
const ghostShot = (name: string, title: L10n<string>, description: L10n<string>) =>
  image(GHOST, name, title, description, liveClientMeta);

/** Captured from the deployed Ghost Protocol web client. Three distinct panels. */
export const ghostProtocolShots: Asset[] = [
  ghostShot(
    "operations",
    l10n("Operations", "Operations", "Operations"),
    l10n(
      "Operations panel of the deployed web client.",
      "Operations-Panel des bereitgestellten Webclients.",
      "Panneau Operations du client web déployé.",
    ),
  ),
  ghostShot(
    "mission-lab",
    l10n("Mission lab", "Mission lab", "Mission lab"),
    l10n(
      "Mission lab panel of the deployed web client.",
      "Mission-lab-Panel des bereitgestellten Webclients.",
      "Panneau Mission lab du client web déployé.",
    ),
  ),
  ghostShot(
    "ranks",
    l10n("Ranks", "Ranks", "Ranks"),
    l10n(
      "Rank progression panel of the deployed web client.",
      "Rangverlauf-Panel des bereitgestellten Webclients.",
      "Panneau de progression des rangs du client web déployé.",
    ),
  ),
];

const webClientMeta = l10n(
  "PNG · 3599×2080 · web client",
  "PNG · 3599×2080 · Webclient",
  "PNG · 3599×2080 · client web",
);
const ghostAsset = (name: string, title: L10n<string>, description: L10n<string>, meta: L10n<string>): Asset => ({
  id: `gp-${name}`,
  title,
  description,
  kind: "image",
  status: "published",
  src: `/images/${GHOST}/${name}.png`,
  preview: `/images/${GHOST}/${name}.preview.webp`,
  meta,
});

/** Interface screenshots, ordered as a short product tour. */
export const ghostProtocolTour: Asset[] = [
  ghostAsset(
    "01-boot-sequence",
    l10n("Boot sequence", "Startsequenz", "Séquence de démarrage"),
    l10n(
      "The initialization screen — Ghost Protocol systems coming online before the operations center loads.",
      "Der Initialisierungsbildschirm — Ghost-Protocol-Systeme gehen online, bevor das Operations Center lädt.",
      "L'écran d'initialisation — les systèmes Ghost Protocol se mettent en ligne avant le chargement de l'Operations Center.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "02-operations-center",
    l10n("Operations Center", "Operations Center", "Operations Center"),
    l10n(
      "The mission dashboard: completion, total XP, operative rank and streak across the practitioner-tier core techniques.",
      "Das Missions-Dashboard: Abschluss, XP gesamt, Operative-Rang und Serie über die Kerntechniken der Practitioner-Stufe.",
      "Le tableau de bord des missions : achèvement, XP total, rang d'operative et série sur les techniques centrales du niveau practitioner.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "03-mission-grid",
    l10n("Mission grid", "Missionsraster", "Grille des missions"),
    l10n(
      "The practitioner-tier techniques as a grid of missions, each with its XP reward and solved state.",
      "Die Techniken der Practitioner-Stufe als Raster von Missionen, jeweils mit XP-Belohnung und Lösungsstatus.",
      "Les techniques du niveau practitioner en grille de missions, chacune avec sa récompense XP et son état résolu.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "04-intel-codex",
    l10n("Intel Codex", "Intel Codex", "Intel Codex"),
    l10n(
      "A reference of the smuggling concepts behind the missions — CL.TE, TE.CL, TE.TE, H2.CL, CRLF injection, response queue poisoning and more.",
      "Ein Nachschlagewerk der Schmuggelkonzepte hinter den Missionen — CL.TE, TE.CL, TE.TE, H2.CL, CRLF-Injection, Response Queue Poisoning und weitere.",
      "Un référentiel des concepts de smuggling derrière les missions — CL.TE, TE.CL, TE.TE, H2.CL, injection CRLF, response queue poisoning et d'autres.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "05-operative-ranks",
    l10n("Operative Ranks", "Operative Ranks", "Operative Ranks"),
    l10n(
      "The rank ladder from Civilian to Ghost Protocol, with the operator's current rank highlighted.",
      "Die Rangleiter von Civilian bis Ghost Protocol, mit dem aktuellen Rang der Operatorin oder des Operators hervorgehoben.",
      "L'échelle des rangs, de Civilian à Ghost Protocol, avec le rang actuel de l'opérateur mis en évidence.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "06-rank-progression",
    l10n("Rank progression", "Rangverlauf", "Progression des rangs"),
    l10n(
      "The same ladder showing XP thresholds for each operative rank.",
      "Dieselbe Leiter mit den XP-Schwellen für jeden Operative-Rang.",
      "La même échelle, avec les seuils d'XP de chaque rang d'operative.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "07-operator-profile",
    l10n("Operator profile", "Operator-Profil", "Profil de l'opérateur"),
    l10n(
      "The signed-in operator panel: rank, level and XP, with sign-out.",
      "Das Panel der angemeldeten Person: Rang, Level und XP, mit Abmeldung.",
      "Le panneau de l'opérateur connecté : rang, niveau et XP, avec la déconnexion.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "08-mission-complete",
    l10n("Mission complete", "Mission abgeschlossen", "Mission terminée"),
    l10n(
      "The HTTP/2 request-splitting mission solved — the +500 XP reward and best-time overlay.",
      "Die gelöste Mission HTTP/2 Request Splitting — die Belohnung +500 XP und die Bestzeit-Einblendung.",
      "La mission HTTP/2 request splitting résolue — la récompense +500 XP et l'incrustation du meilleur temps.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "09-attack-flow",
    l10n("Mission attack flow", "Angriffsablauf der Mission", "Flux d'attaque de la mission"),
    l10n(
      "A mission's attack-flow diagram: attacker to front-end to a downgraded back-end, above the payload editor.",
      "Das Angriffsablaufdiagramm einer Mission: Angreifer zu Frontend zu einem herabgestuften Backend, über dem Payload-Editor.",
      "Le diagramme de flux d'attaque d'une mission : attaquant, frontend, backend rétrogradé, au-dessus de l'éditeur de payload.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "10-web-cache-poisoning",
    l10n("Web cache poisoning", "Web Cache Poisoning", "Web cache poisoning"),
    l10n(
      "An expert-tier mission brief: poison the cache so a resource serves a redirect to every future visitor.",
      "Ein Missionsbrief der Expert-Stufe: den Cache vergiften, sodass eine Ressource jedem späteren Besucher eine Weiterleitung ausliefert.",
      "Un brief de mission de niveau expert : empoisonner le cache pour qu'une ressource serve une redirection à chaque visiteur suivant.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "11-mission-guide",
    l10n("Step-by-step mission guide", "Schritt-für-Schritt-Missionsanleitung", "Guide de mission pas à pas"),
    l10n(
      "The expanded mission guide: understand the chain, set up the exploit server, craft the poison request, verify.",
      "Die aufgeklappte Missionsanleitung: die Kette verstehen, den Exploit-Server einrichten, die Poison-Anfrage bauen, prüfen.",
      "Le guide de mission déplié : comprendre la chaîne, préparer le serveur d'exploit, construire la requête d'empoisonnement, vérifier.",
    ),
    webClientMeta,
  ),
  ghostAsset(
    "12-payload-editor",
    l10n("Payload editor", "Payload-Editor", "Éditeur de payload"),
    l10n(
      "The payload editor and server-response pane where operators build and fire a crafted request.",
      "Der Payload-Editor und der Bereich der Serverantwort, in dem die Anfrage gebaut und abgesetzt wird.",
      "L'éditeur de payload et le volet de réponse du serveur, où l'on construit et envoie une requête préparée.",
    ),
    webClientMeta,
  ),
];

/** Supplied Ghost Protocol system-architecture diagram (public/images/ghost-protocol/system-architecture.png). */
export const ghostProtocolSystemArchitecture = ghostAsset(
  "system-architecture",
  l10n("System Architecture", "Systemarchitektur", "Architecture système"),
  l10n(
    "Four layers — client, trust boundary, backend API, and data and platform — for the Electron desktop app, the web client, the token-authenticated API and Railway PostgreSQL. The status panel separates implemented controls from documented limits and items marked planned.",
    "Vier Schichten — Client, Vertrauensgrenze, Backend-API sowie Daten und Plattform — für die Electron-Desktop-App, den Webclient, die tokenauthentifizierte API und Railway PostgreSQL. Das Statuspanel trennt umgesetzte Kontrollen von dokumentierten Grenzen und als geplant markierten Punkten.",
    "Quatre couches — client, frontière de confiance, API backend, données et plateforme — pour l'application bureau Electron, le client web, l'API authentifiée par jeton et PostgreSQL sur Railway. Le panneau d'état sépare les contrôles implémentés des limites documentées et des éléments marqués comme prévus.",
  ),
  diagram("3600×2082"),
);

export const ghostProtocolSecurityArchitecture = ghostAsset(
  "security-architecture",
  l10n("Security Architecture", "Sicherheitsarchitektur", "Architecture de sécurité"),
  l10n(
    "Defense in depth across the renderer, bridge, credential and backend layers — the controls live today and the residual risks that remain honest.",
    "Defense in Depth über Renderer, Brücke, Zugangsdaten und Backend — die Kontrollen, die heute live sind, und die Restrisiken, die ehrlich benannt bleiben.",
    "Défense en profondeur sur les couches renderer, pont, identifiants et backend — les contrôles en place aujourd'hui et les risques résiduels qui restent nommés honnêtement.",
  ),
  diagram("3600×2082"),
);

/** Architecture carousel: system and security diagrams. The files are the supplied originals. */
export const ghostProtocolArchitecture: Asset[] = [ghostProtocolSystemArchitecture, ghostProtocolSecurityArchitecture];

/** Workflow artefacts: the engineering story and the development roadmap. */
export const ghostProtocolWorkflow: Asset[] = [
  ghostAsset(
    "development-roadmap",
    l10n("Development Roadmap", "Entwicklungs-Roadmap", "Feuille de route"),
    l10n(
      "From secure scaffold to live production: core product verified, the security audit underway, and the release and portfolio phases next.",
      "Vom sicheren Gerüst zur laufenden Produktion: Kernprodukt geprüft, das Sicherheitsaudit läuft, Release- und Portfolio-Phasen folgen.",
      "De l'échafaudage sécurisé à la production en ligne : produit central vérifié, audit de sécurité en cours, phases de release et de portfolio ensuite.",
    ),
    diagram("3600×2082"),
  ),
  ghostAsset(
    "case-study",
    l10n("Engineering Case Study", "Technische Fallstudie", "Étude de cas d'ingénierie"),
    l10n(
      "The one-page case study: the challenge, the solution, before/after, key security decisions, results and honest scope.",
      "Die einseitige Fallstudie: die Herausforderung, die Lösung, vorher/nachher, zentrale Sicherheitsentscheidungen, Ergebnisse und ein ehrlicher Umfang.",
      "L'étude de cas d'une page : le défi, la solution, avant/après, décisions de sécurité clés, résultats et périmètre honnête.",
    ),
    l10n("PNG · 2480×3508 · portrait", "PNG · 2480×3508 · Hochformat", "PNG · 2480×3508 · portrait"),
  ),
];

/** Case-study documents shown as individual previews, not inside a folder. */
export const nexusCaseStudyPreviews: Asset[] = [caseStudy, projectSummaryRedacted, portfolio2026Redacted];

/** NexusOS library folders. Only categories that have files. No case-study trio. */
export const nexusLibraryFolders: Folder[] = [
  {
    id: "architecture-system-design",
    label: l10n("Architecture & System Design", "Architektur und Systemdesign", "Architecture et conception système"),
    description: l10n(
      "System architecture and the multi-tenant request flow, taken from the NexusOS codebase.",
      "Systemarchitektur und der Ablauf einer Mandantenanfrage, aus der NexusOS-Codebasis.",
      "Architecture système et flux d'une requête multi-tenant, issus de la base de code NexusOS.",
    ),
    group: "Images",
    assets: [systemArchitecture, multiTenantFlow],
  },
  {
    id: "security-access-control",
    label: l10n("Security & Access Control", "Sicherheit und Zugriffskontrolle", "Sécurité et contrôle d'accès"),
    description: l10n(
      "Layered security controls applied to every request, and what is deliberately not claimed.",
      "Geschichtete Sicherheitskontrollen für jede Anfrage und das, was bewusst nicht behauptet wird.",
      "Contrôles de sécurité en couches appliqués à chaque requête, et ce qui n'est volontairement pas revendiqué.",
    ),
    group: "Images",
    assets: [securityArchitecture],
  },
  {
    id: "system-interface",
    label: l10n("System & interface", "System und Oberfläche", "Système et interface"),
    description: l10n(
      "Current-design screenshots of the running NexusOS application, including the shell, sign-in and the design system.",
      "Screenshots des aktuellen Designs der laufenden NexusOS-Anwendung, einschließlich Shell, Anmeldung und Designsystem.",
      "Captures du design actuel de l'application NexusOS en cours d'exécution, y compris le shell, la connexion et le design system.",
    ),
    group: "Images",
    assets: currentDesignShots,
  },
  {
    id: "project-documentation",
    label: l10n("Project Documentation", "Projektdokumentation", "Documentation de projet"),
    description: l10n(
      "The two-page NexusOS portfolio summary.",
      "Der zweiseitige NexusOS-Portfolio-Überblick.",
      "La synthèse de portfolio NexusOS en deux pages.",
    ),
    group: "Documents",
    assets: [portfolioSummary],
  },
];

/** Ghost Protocol library folders. Architecture and workflow carousels stay in their own sections. */
export const ghostLibraryFolders: Folder[] = [
  {
    id: "gp-architecture-system-design",
    label: l10n("Architecture & System Design", "Architektur und Systemdesign", "Architecture et conception système"),
    description: l10n(
      "System architecture of the Electron desktop app, the web client, the token-authenticated API and Railway PostgreSQL.",
      "Systemarchitektur der Electron-Desktop-App, des Webclients, der token-authentifizierten API und von Railway PostgreSQL.",
      "Architecture système de l'application bureau Electron, du client web, de l'API authentifiée par jeton et de PostgreSQL sur Railway.",
    ),
    group: "Images",
    assets: [ghostProtocolSystemArchitecture],
  },
  {
    id: "gp-security-access-control",
    label: l10n("Security & Access Control", "Sicherheit und Zugriffskontrolle", "Sécurité et contrôle d'accès"),
    description: l10n(
      "Defense in depth from the untrusted renderer to the database, including the residual risks drawn on the diagram.",
      "Defense in Depth vom nicht vertrauenswürdigen Renderer bis zur Datenbank, einschließlich der im Diagramm gezeichneten Restrisiken.",
      "Défense en profondeur du renderer non fiable jusqu'à la base, y compris les risques résiduels dessinés sur le diagramme.",
    ),
    group: "Images",
    assets: [ghostProtocolSecurityArchitecture],
  },
  {
    id: "gp-workflow",
    label: l10n("Workflow", "Arbeitsablauf", "Processus"),
    description: l10n(
      "Development roadmap and the engineering case study. A later phase is not a claim that the work is operational.",
      "Entwicklungs-Roadmap und die technische Fallstudie. Eine spätere Phase ist kein Beleg, dass die Arbeit betriebsbereit ist.",
      "Feuille de route et étude de cas d'ingénierie. Une phase suivante ne prouve pas que le travail est opérationnel.",
    ),
    group: "Images",
    assets: ghostProtocolWorkflow,
  },
  {
    id: "gp-web-client",
    label: l10n("Web client", "Webclient", "Client web"),
    description: l10n(
      "Operations, mission lab and ranks, captured from the deployed web client.",
      "Operations, Mission lab und Ranks, aufgenommen vom bereitgestellten Webclient.",
      "Operations, Mission lab et Ranks, capturés depuis le client web déployé.",
    ),
    group: "Images",
    assets: ghostProtocolShots,
  },
  {
    id: "gp-interface",
    label: l10n("Interface", "Oberfläche", "Interface"),
    description: l10n(
      "Interface shots 01–12: boot, operations, missions, intel, ranks, profile and the payload editor.",
      "Oberflächenaufnahmen 01–12: Start, Operations, Missionen, Intel, Ränge, Profil und der Payload-Editor.",
      "Captures d'interface 01–12 : démarrage, opérations, missions, intel, rangs, profil et l'éditeur de payload.",
    ),
    group: "Images",
    assets: ghostProtocolTour,
  },
];

export const folders: Folder[] = [
  {
    id: "cv",
    label: l10n("CV", "Lebenslauf", "CV"),
    description: l10n(
      "Curriculum vitae, as sent to employers.",
      "Lebenslauf, wie er an Arbeitgeber geht.",
      "Curriculum vitae, tel qu'envoyé aux employeurs.",
    ),
    group: "Documents",
    assets: [cv],
  },
  {
    id: "education",
    label: l10n("Education", "Ausbildung", "Formation"),
    description: l10n("Degree certificate.", "Diplomurkunde.", "Diplôme."),
    group: "Documents",
    assets: [degree],
  },
  ...nexusLibraryFolders,
  ...ghostLibraryFolders,
];
