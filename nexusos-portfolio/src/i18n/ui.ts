import { l10n, type PortfolioLanguage } from "~/i18n/l10n";

/**
 * Short interface copy: navigation chrome, buttons, dialogs, and section frames.
 * Long-form project and document copy lives next to its data.
 * Proper nouns (NexusOS, Ghost Protocol, GitHub, PDF) stay unchanged.
 */
export const ui = {
  documentTitle: l10n(
    "Waley El-Nagdi — Software Developer · NexusOS",
    "Waley El-Nagdi — Softwareentwickler · NexusOS",
    "Waley El-Nagdi — Développeur logiciel · NexusOS",
  ),
  documentDescription: l10n(
    "Portfolio of Waley El-Nagdi, software developer (backend & systems integration). Featuring NexusOS, a multi-tenant business platform with server-derived tenant scoping and a token-driven design system.",
    "Portfolio von Waley El-Nagdi, Softwareentwickler (Backend und Systemintegration). Im Mittelpunkt steht NexusOS, eine mandantenfähige Business-Plattform mit serverseitig abgeleiteter Mandantenabgrenzung und einem tokenbasierten Designsystem.",
    "Portfolio de Waley El-Nagdi, développeur logiciel (backend et intégration de systèmes). Au centre : NexusOS, une plateforme métier multi-tenant dont le périmètre de tenant est dérivé côté serveur, avec un design system piloté par des jetons.",
  ),
  languageGroup: l10n("Language", "Sprache", "Langue"),
  portfolioSections: l10n("Portfolio sections", "Portfolio-Abschnitte", "Sections du portfolio"),
  replayStarEntry: l10n("Replay star entry", "Einstieg erneut abspielen", "Rejouer l'entrée"),
  enterPortfolio: l10n("Enter portfolio", "Portfolio öffnen", "Entrer dans le portfolio"),
  portfolioWord: l10n("Portfolio", "Portfolio", "Portfolio"),
  builtOnDesignSystem: l10n(
    "Built on the NexusOS design system",
    "Auf dem NexusOS-Designsystem aufgebaut",
    "Construit sur le design system NexusOS",
  ),
  builtOnDesignSystemLong: l10n(
    "Built on the NexusOS design system — tokens, SpaceField and Starfield compiled from the NexusOS frontend",
    "Auf dem NexusOS-Designsystem aufgebaut — Tokens, SpaceField und Starfield aus dem NexusOS-Frontend übernommen",
    "Construit sur le design system NexusOS — jetons, SpaceField et Starfield repris du frontend NexusOS",
  ),
  portfolioBadge: l10n("Portfolio · 2026", "Portfolio · 2026", "Portfolio · 2026"),
  exploreNexus: l10n("Explore NexusOS", "NexusOS ansehen", "Explorer NexusOS"),
  viewCv: l10n("View CV", "Lebenslauf ansehen", "Voir le CV"),
  nexusLibraryCta: l10n("NexusOS library", "NexusOS-Bibliothek", "Bibliothèque NexusOS"),
  figuresCaption: l10n(
    "NexusOS figures, from the project documentation",
    "NexusOS-Kennzahlen aus der Projektdokumentation",
    "Chiffres NexusOS, issus de la documentation du projet",
  ),
  openFullResolution: l10n("Open in Full Resolution", "In voller Auflösung öffnen", "Ouvrir en pleine résolution"),
  viewPdf: l10n("View PDF", "PDF ansehen", "Voir le PDF"),
  download: l10n("Download", "Herunterladen", "Télécharger"),
  close: l10n("Close", "Schließen", "Fermer"),
  requestByEmail: l10n("Request by email", "Per E-Mail anfragen", "Demander par e-mail"),
  requestSubject: l10n("Request", "Anfrage", "Demande"),
  availableOnRequest: l10n("Available on request", "Auf Anfrage verfügbar", "Disponible sur demande"),
  onRequest: l10n("On request", "Auf Anfrage", "Sur demande"),
  firstPage: l10n("first page", "erste Seite", "première page"),
  inspect: l10n("Inspect", "Ansehen", "Examiner"),
  previous: l10n("Previous", "Zurück", "Précédent"),
  next: l10n("Next", "Weiter", "Suivant"),
  previousDiagram: l10n("Previous diagram", "Vorheriges Diagramm", "Diagramme précédent"),
  nextDiagram: l10n("Next diagram", "Nächstes Diagramm", "Diagramme suivant"),
  library: l10n("Library", "Bibliothek", "Bibliothèque"),
  libraryLocation: l10n("Library location", "Ort in der Bibliothek", "Emplacement dans la bibliothèque"),
  backToLibrary: l10n("Back to library", "Zurück zur Bibliothek", "Retour à la bibliothèque"),
  item: l10n("item", "Element", "élément"),
  items: l10n("items", "Elemente", "éléments"),
  file: l10n("file", "Datei", "fichier"),
  files: l10n("files", "Dateien", "fichiers"),
  documents: l10n("Documents", "Dokumente", "Documents"),
  images: l10n("Images", "Bilder", "Images"),
  copyEmail: l10n("Copy Email", "E-Mail kopieren", "Copier l'e-mail"),
  copyPassword: l10n("Copy Password", "Passwort kopieren", "Copier le mot de passe"),
  copied: l10n("Copied", "Kopiert", "Copié"),
  copyFailed: l10n("Copy failed", "Kopieren fehlgeschlagen", "Échec de la copie"),
  demoEmail: l10n("Demo email:", "Demo-E-Mail:", "E-mail de démo :"),
  demoPassword: l10n("Demo password:", "Demo-Passwort:", "Mot de passe de démo :"),
  github: l10n("GitHub", "GitHub", "GitHub"),
  email: l10n("Email", "E-Mail", "E-mail"),
  phone: l10n("Phone", "Telefon", "Téléphone"),
  liveApp: l10n("Live app", "Live-Anwendung", "Application en ligne"),
  location: l10n("Location", "Standort", "Lieu"),
  getInTouch: l10n("Get in touch", "Kontakt aufnehmen", "Prendre contact"),
  contactSubtitle: l10n(
    "Looking for an AQUA placement in application development.",
    "Auf der Suche nach einem betrieblichen Ausbildungsplatz über AQUA in der Applikationsentwicklung.",
    "En recherche d'un placement en entreprise via AQUA en développement d'applications.",
  ),
  role: l10n("Role", "Rolle", "Rôle"),
  stack: l10n("Stack", "Technologien", "Technologies"),
  interface: l10n("Interface", "Oberfläche", "Interface"),
  technicalExplanation: l10n("Technical explanation", "Technische Erläuterung", "Explication technique"),
  implemented: l10n("Implemented", "Umgesetzt", "Implémenté"),
  partial: l10n("Partial", "Teilweise", "Partiel"),
  future: l10n("Future", "Geplant", "À venir"),
  decisions: l10n("Decisions", "Entscheidungen", "Décisions"),
  statusPrecise: l10n("Status — stated precisely", "Status — genau benannt", "État — formulé avec précision"),
  caseStudy: l10n("Case study", "Fallstudie", "Étude de cas"),
  githubProfile: l10n("GitHub profile", "GitHub-Profil", "Profil GitHub"),
  liveAppSignIn: l10n("Live app · sign in", "Live-Anwendung · anmelden", "Application en ligne · connexion"),
  openDemo: l10n("Open Demo", "Demo öffnen", "Ouvrir la démo"),
  featuredSubtitle: l10n(
    "Featured project · multi-tenant business platform",
    "Leitprojekt · mandantenfähige Business-Plattform",
    "Projet phare · plateforme métier multi-tenant",
  ),
  ghostSubtitle: l10n(
    "Cybersecurity learning platform · profile, live web client, and public documentation.",
    "Lernplattform für Cybersicherheit · Profil, Live-Webclient und öffentliche Dokumentation.",
    "Plateforme d'apprentissage en cybersécurité · profil, client web en ligne et documentation publique.",
  ),
  ghostStatus: l10n(
    "In progress. The web client is deployed. Password reset, signed public desktop builds and conflict-safe multi-device sync are not.",
    "In Entwicklung. Der Webclient ist bereitgestellt. Passwort-Zurücksetzen, signierte öffentliche Desktop-Builds und konfliktsichere Synchronisation über mehrere Geräte sind es nicht.",
    "En cours. Le client web est déployé. La réinitialisation du mot de passe, les builds bureau publics signés et une synchronisation multi-appareils sans conflit ne le sont pas.",
  ),
  ghostLibraryHolds: l10n(
    " holds the complete image set, including interface shots 01–12.",
    " enthält die vollständige Bildersammlung, einschließlich der Interface-Aufnahmen 01–12.",
    " contient l'ensemble complet des images, y compris les captures d'interface 01–12.",
  ),
  openDoc: l10n("Open", "Öffnen", "Ouvrir"),
  otherProjectsSubtitle: l10n(
    "Personal, self-directed projects listed in the CV — not employment as a developer. NexusOS remains the flagship above.",
    "Persönliche, eigenständig umgesetzte Projekte aus dem Lebenslauf — keine Anstellung als Entwickler. NexusOS bleibt das Leitprojekt darüber.",
    "Projets personnels menés en autonomie, mentionnés dans le CV — pas un emploi de développeur. NexusOS reste le projet phare au-dessus.",
  ),
  demosTitle: l10n("Live demos & access", "Live-Demos und Zugang", "Démos en ligne et accès"),
  demosSubtitle: l10n(
    "Verified destinations for the live NexusOS application and the Ghost Protocol web client.",
    "Geprüfte Ziele für die laufende NexusOS-Anwendung und den Ghost-Protocol-Webclient.",
    "Destinations vérifiées pour l'application NexusOS en ligne et le client web Ghost Protocol.",
  ),
  cvSubtitle: l10n(
    "The original document, unchanged. Click the preview to inspect it, or download the PDF.",
    "Das Originaldokument, unverändert. Klicken Sie auf die Vorschau, um es anzusehen, oder laden Sie das PDF herunter.",
    "Le document original, inchangé. Cliquez sur l'aperçu pour l'examiner, ou téléchargez le PDF.",
  ),
  cvNote: l10n(
    "The CV is written in German for applications in Austria. It covers NexusOS, the Pentest Report Generator and Ghost Protocol, education at the Université de Strasbourg and LISAA, and languages (English C2, French C2, Arabic fluent, German B1, Swedish A2).",
    "Der Lebenslauf ist auf Deutsch für Bewerbungen in Österreich verfasst. Er umfasst NexusOS, den Pentest Report Generator und Ghost Protocol, die Ausbildung an der Université de Strasbourg und an LISAA sowie die Sprachen (Englisch C2, Französisch C2, Arabisch fließend, Deutsch B1, Schwedisch A2).",
    "Le CV est rédigé en allemand pour des candidatures en Autriche. Il couvre NexusOS, le Pentest Report Generator et Ghost Protocol, la formation à l'Université de Strasbourg et à LISAA, ainsi que les langues (anglais C2, français C2, arabe courant, allemand B1, suédois A2).",
  ),
  educationSubtitle: l10n(
    "As stated on the degree certificate.",
    "Wie auf der Diplomurkunde angegeben.",
    "Comme indiqué sur le diplôme.",
  ),
  academicYear: l10n("Année universitaire", "Année universitaire", "Année universitaire"),
  awarded: l10n("Awarded", "Verliehen am", "Décerné le"),
  awardedDate: l10n("30 June 2020", "30. Juni 2020", "30 juin 2020"),
  cvWording: l10n("CV wording", "Wortlaut im Lebenslauf", "Formulation du CV"),
  fromTheCv: l10n("(from the CV)", "(laut Lebenslauf)", "(selon le CV)"),
  degreeCertificate: l10n("Degree certificate", "Diplomurkunde", "Diplôme"),
  degreeOnRequest: l10n(
    "Degree certificate — available on request",
    "Diplomurkunde — auf Anfrage verfügbar",
    "Diplôme — disponible sur demande",
  ),
  architectureSubtitle: l10n(
    "Diagrams derived from the implemented NexusOS codebase. Click to inspect at full size.",
    "Diagramme aus der umgesetzten NexusOS-Codebasis. Zum Prüfen in voller Größe anklicken.",
    "Diagrammes issus de la base de code NexusOS implémentée. Cliquez pour les examiner en grand format.",
  ),
  ghostArchitectureSubtitle: l10n(
    "Architecture diagrams for Ghost Protocol. Click to inspect at full resolution.",
    "Architekturdiagramme für Ghost Protocol. Zum Prüfen in voller Auflösung anklicken.",
    "Diagrammes d'architecture de Ghost Protocol. Cliquez pour les examiner en pleine résolution.",
  ),
  ghostWorkflowSubtitle: l10n(
    "How Ghost Protocol was built, and which phases are still ahead.",
    "Wie Ghost Protocol entstanden ist und welche Phasen noch bevorstehen.",
    "Comment Ghost Protocol a été construit, et quelles phases restent à venir.",
  ),
  ghostWorkflowNote: l10n(
    "The engineering case study and the development roadmap. A roadmap is not a claim that later phases are operational.",
    "Die technische Fallstudie und die Entwicklungs-Roadmap. Eine Roadmap ist kein Beleg, dass spätere Phasen betriebsbereit sind.",
    "L'étude de cas d'ingénierie et la feuille de route. Une feuille de route ne prouve pas que les phases suivantes sont opérationnelles.",
  ),
  nexusLibrarySubtitle: l10n(
    "Screenshots, architecture and project documents open from folders. The case study stays as three previews.",
    "Screenshots, Architektur und Projektdokumente öffnen sich aus Ordnern. Die Fallstudie bleibt als drei Vorschauen.",
    "Captures, architecture et documents de projet s'ouvrent depuis des dossiers. L'étude de cas reste en trois aperçus.",
  ),
  ghostLibrarySubtitle: l10n(
    "Architecture, workflow and product images open from folders. The architecture and workflow carousels stay in their own sections.",
    "Architektur, Arbeitsablauf und Produktbilder öffnen sich aus Ordnern. Die Karusselle für Architektur und Arbeitsablauf bleiben in ihren eigenen Abschnitten.",
    "Architecture, processus et images produit s'ouvrent depuis des dossiers. Les carrousels d'architecture et de processus restent dans leurs sections.",
  ),
  architectureLabel: l10n("Architecture", "Architektur", "Architecture"),
  securityLabel: l10n("Security", "Sicherheit", "Sécurité"),
  multiTenancyLabel: l10n("Multi-tenancy", "Mandantenfähigkeit", "Multi-tenant"),
  workflowLabel: l10n("Workflow", "Arbeitsablauf", "Processus"),
  webClient: l10n("Web client", "Webclient", "Client web"),
  ghostPanelOperations: l10n(
    "Operations panel of the deployed web client: mission progress, rank, and the mission list.",
    "Operations-Panel des bereitgestellten Webclients: Missionsfortschritt, Rang und die Missionsliste.",
    "Panneau Operations du client web déployé : progression des missions, rang et liste des missions.",
  ),
  controlArchitecture: l10n("architecture diagram", "Architekturdiagramm", "diagramme d'architecture"),
  controlGhostShot: l10n("Ghost Protocol screenshot", "Ghost-Protocol-Screenshot", "capture Ghost Protocol"),
  controlGhostArchitecture: l10n(
    "Ghost Protocol architecture diagram",
    "Ghost-Protocol-Architekturdiagramm",
    "diagramme d'architecture Ghost Protocol",
  ),
  controlGhostWorkflow: l10n(
    "Ghost Protocol workflow diagram",
    "Ghost-Protocol-Arbeitsablaufdiagramm",
    "diagramme de processus Ghost Protocol",
  ),
  relationshipToWorkflow: l10n(
    "Relationship to the workflow",
    "Bezug zum Arbeitsablauf",
    "Lien avec le processus",
  ),
  relationshipToTransparency: l10n(
    "Relationship to transparency",
    "Bezug zur Transparenz",
    "Lien avec la transparence",
  ),
  developmentCycle: l10n("Development Cycle", "Entwicklungszyklus", "Cycle de développement"),
  technologyStack: l10n("Technology Stack", "Technologie", "Pile technologique"),
  nexusDemoHeading: l10n(
    "NexusOS — Company Demo Access",
    "NexusOS — Demo-Zugang für das Unternehmen",
    "NexusOS — Accès de démonstration entreprise",
  ),
  ghostDemoHeading: l10n(
    "Ghost Protocol — Company Demo Access",
    "Ghost Protocol — Demo-Zugang für das Unternehmen",
    "Ghost Protocol — Accès de démonstration entreprise",
  ),
  liveApplication: l10n("Live application", "Live-Anwendung", "Application en ligne"),
  companyUrl: l10n("Company-given URL:", "Vom Unternehmen vorgegebene URL:", "URL fournie par l'entreprise :"),
  companyPortfolioLink: l10n(
    "Company portfolio link:",
    "Link zum Unternehmensportfolio:",
    "Lien vers le portfolio de l'entreprise :",
  ),
  openLiveApplicationLabel: l10n("Open live application:", "Live-Anwendung öffnen:", "Ouvrir l'application en ligne :"),
  openLiveApplication: l10n("Open live application", "Live-Anwendung öffnen", "Ouvrir l'application en ligne"),
  projectDemo: l10n("Project demo:", "Projektdemo:", "Démo du projet :"),
  openGhostDemo: l10n("Open Ghost Protocol Demo", "Ghost-Protocol-Demo öffnen", "Ouvrir la démo Ghost Protocol"),
  copyEmailFor: l10n("Copy Email for", "E-Mail kopieren für", "Copier l'e-mail pour"),
  copyPasswordFor: l10n("Copy Password for", "Passwort kopieren für", "Copier le mot de passe pour"),
  frontend: l10n("Frontend", "Frontend", "Frontend"),
  backend: l10n("Backend", "Backend", "Backend"),
  data: l10n("Data", "Daten", "Données"),
  infraTests: l10n("Infra & tests", "Infrastruktur und Tests", "Infra et tests"),
} as const;

/** Accessible name "Previous {control}" / "Vorheriges {control}". English stays "Previous {control}". */
function assertLanguage(language: PortfolioLanguage): PortfolioLanguage {
  if (language === "en" || language === "de" || language === "fr") return language;
  throw new Error(`Missing ${String(language)} translation`);
}

export function previousControlName(control: string, language: PortfolioLanguage) {
  const active = assertLanguage(language);
  if (active === "en") return `Previous ${control}`;
  if (active === "de") return `Vorheriges ${control}`;
  return `Précédent : ${control}`;
}

export function nextControlName(control: string, language: PortfolioLanguage) {
  const active = assertLanguage(language);
  if (active === "en") return `Next ${control}`;
  if (active === "de") return `Nächstes ${control}`;
  return `Suivant : ${control}`;
}

export function openDocName(title: string, language: PortfolioLanguage) {
  const active = assertLanguage(language);
  if (active === "en") return `Open ${title}`;
  if (active === "de") return `${title} öffnen`;
  return `Ouvrir ${title}`;
}

export function inspectName(title: string, language: PortfolioLanguage) {
  const active = assertLanguage(language);
  if (active === "en") return `Inspect ${title}`;
  if (active === "de") return `${title} ansehen`;
  return `Examiner ${title}`;
}

export function copyForName(kind: "email" | "password", project: string, language: PortfolioLanguage) {
  const active = assertLanguage(language);
  if (active === "en") return `${kind === "email" ? "Copy Email" : "Copy Password"} for ${project}`;
  if (active === "de") return `${kind === "email" ? "E-Mail" : "Passwort"} für ${project} kopieren`;
  return kind === "email" ? `Copier l'e-mail pour ${project}` : `Copier le mot de passe pour ${project}`;
}
