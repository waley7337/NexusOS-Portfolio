/**
 * Other software projects, verified from their public repositories.
 * NexusOS stays in `nexusos.ts` and is not repeated here.
 * No private repository URLs.
 */
import { l10n, type L10n } from "~/i18n/l10n";

export type ProjectStatus = "completed" | "in-progress" | "prototype" | "concept";

export interface OtherProject {
  name: string;
  status: ProjectStatus;
  statusLabel: L10n<string>;
  summary: L10n<string>;
  stack: string[];
  /** Implemented behaviour, including limits the project's own docs state. */
  features: L10n<string>[];
  decisions: L10n<string>[];
  github?: string;
  demo?: { href: string; label: L10n<string> };
  /** Wider card. Used for the deeper project, under the NexusOS flagship. */
  prominent?: boolean;
}

export const otherProjects: OtherProject[] = [
  {
    name: "Ghost Protocol",
    status: "in-progress",
    statusLabel: l10n("In progress", "In Entwicklung", "En cours"),
    summary: l10n(
      "Cybersecurity learning platform: an Electron desktop app and a static web client, with a Node.js API for authentication, profile and progress. The web client is deployed. Password reset, signed public desktop builds and conflict-safe multi-device sync are not.",
      "Lernplattform für Cybersicherheit: eine Electron-Desktop-App und ein statischer Webclient, mit einer Node.js-API für Authentifizierung, Profil und Fortschritt. Der Webclient ist bereitgestellt. Passwort-Zurücksetzen, signierte öffentliche Desktop-Builds und konfliktsichere Synchronisation über mehrere Geräte sind es nicht.",
      "Plateforme d'apprentissage en cybersécurité : une application bureau Electron et un client web statique, avec une API Node.js pour l'authentification, le profil et la progression. Le client web est déployé. La réinitialisation du mot de passe, les builds bureau publics signés et une synchronisation multi-appareils sans conflit ne le sont pas.",
    ),
    stack: ["Electron 37", "Static web", "Node.js", "PostgreSQL", "Argon2id", "JWT"],
    features: [
      l10n(
        "Dashboard, missions, quizzes and XP in both the desktop app and the web client.",
        "Dashboard, Missionen, Quiz und XP in der Desktop-App und im Webclient.",
        "Tableau de bord, missions, quiz et XP dans l'application bureau et dans le client web.",
      ),
      l10n(
        "API routes for register, login, refresh, logout and Google sign-in, plus profile and progress read/write.",
        "API-Routen für Registrierung, Anmeldung, Refresh, Abmeldung und Google-Anmeldung sowie Lesen und Schreiben von Profil und Fortschritt.",
        "Routes d'API pour l'inscription, la connexion, le refresh, la déconnexion et la connexion Google, plus la lecture et l'écriture du profil et de la progression.",
      ),
      l10n(
        "Browser tokens stay in memory. Electron can store the refresh token with safeStorage.",
        "Browser-Tokens bleiben im Speicher. Electron kann den Refresh-Token mit safeStorage ablegen.",
        "Les jetons du navigateur restent en mémoire. Electron peut stocker le jeton de refresh avec safeStorage.",
      ),
      l10n(
        "Password reset is visible in the UI and not available. Public desktop signing is not configured.",
        "Passwort-Zurücksetzen ist in der Oberfläche sichtbar und nicht verfügbar. Die öffentliche Desktop-Signierung ist nicht eingerichtet.",
        "La réinitialisation du mot de passe est visible dans l'interface et n'est pas disponible. La signature publique du bureau n'est pas configurée.",
      ),
    ],
    decisions: [
      l10n(
        "Neither client talks to PostgreSQL. The API is the only database client.",
        "Keiner der Clients spricht mit PostgreSQL. Die API ist der einzige Datenbankclient.",
        "Aucun des clients ne parle à PostgreSQL. L'API est le seul client de la base.",
      ),
      l10n(
        "The supabase/ directory is legacy and unused at runtime.",
        "Das Verzeichnis supabase/ ist ein Überrest und wird zur Laufzeit nicht verwendet.",
        "Le répertoire supabase/ est un héritage et n'est pas utilisé à l'exécution.",
      ),
      l10n(
        "Concurrent edits from two devices are last-write-wins. Conflict-safe sync is not claimed.",
        "Gleichzeitige Änderungen von zwei Geräten gelten nach dem letzten Schreibvorgang. Eine konfliktsichere Synchronisation wird nicht behauptet.",
        "Les modifications simultanées depuis deux appareils suivent la règle du dernier écrit. Une synchronisation sans conflit n'est pas revendiquée.",
      ),
    ],
    github: "https://github.com/waley7337/Ghost-Protocol",
    demo: {
      href: "https://ghost-protocol-pi.vercel.app",
      label: l10n("Live web app", "Live-Webanwendung", "Application web en ligne"),
    },
    prominent: true,
  },
  {
    name: "Pentest Report Generator (v1)",
    status: "prototype",
    statusLabel: l10n("Prototype · local only", "Prototyp · nur lokal", "Prototype · local uniquement"),
    summary: l10n(
      "Local Python tool that turns a Nessus XML scan into a PDF report. It runs in Streamlit on the machine it is installed on. There is no hosted demo.",
      "Lokales Python-Werkzeug, das einen Nessus-XML-Scan in einen PDF-Bericht überführt. Es läuft in Streamlit auf dem Rechner, auf dem es installiert ist. Es gibt keine gehostete Demo.",
      "Outil Python local qui transforme un scan XML Nessus en rapport PDF. Il s'exécute dans Streamlit sur la machine où il est installé. Il n'y a pas de démo hébergée.",
    ),
    stack: ["Python", "Streamlit", "ReportLab"],
    features: [
      l10n(
        "Parses .nessus XML into finding records and merges the same vulnerability across hosts.",
        "Liest .nessus-XML in Befunddatensätze ein und führt dieselbe Schwachstelle über mehrere Hosts zusammen.",
        "Analyse le XML .nessus en fiches de constat et fusionne la même vulnérabilité sur plusieurs hôtes.",
      ),
      l10n(
        "Streamlit UI to review findings, enter client details and download a PDF.",
        "Streamlit-Oberfläche, um Befunde zu prüfen, Kundendaten einzutragen und ein PDF herunterzuladen.",
        "Interface Streamlit pour revoir les constats, saisir les données client et télécharger un PDF.",
      ),
      l10n(
        "A sample scan is included for a local run.",
        "Ein Beispielscan liegt für einen lokalen Lauf bei.",
        "Un scan d'exemple est inclus pour une exécution locale.",
      ),
      l10n(
        "No Burp or Nmap parser, no accounts, and no hosted deployment. CVSS values are taken from the scanner and not re-scored.",
        "Kein Parser für Burp oder Nmap, keine Konten und keine gehostete Bereitstellung. CVSS-Werte werden vom Scanner übernommen und nicht neu bewertet.",
        "Pas d'analyseur Burp ou Nmap, pas de comptes et pas de déploiement hébergé. Les valeurs CVSS sont reprises du scanner et ne sont pas recalculées.",
      ),
    ],
    decisions: [
      l10n(
        "The report is deterministic parsing and templates, not generated prose.",
        "Der Bericht ist deterministisches Einlesen und Vorlagen, kein erzeugter Fließtext.",
        "Le rapport est une analyse déterministe et des modèles, pas une prose générée.",
      ),
      l10n(
        "One finding per vulnerability, even when several hosts are affected.",
        "Ein Befund je Schwachstelle, auch wenn mehrere Hosts betroffen sind.",
        "Un constat par vulnérabilité, même lorsque plusieurs hôtes sont touchés.",
      ),
    ],
    github: "https://github.com/waley7337/pentest-report-tool",
  },
];
