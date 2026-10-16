/**
 * NexusOS project copy, taken from Waley's README, website copy and case
 * study. Status wording is kept exactly as precise as the source: what is
 * implemented, what is prepared, what is not built.
 */
import { l10n } from "~/i18n/l10n";

export const nexusos = {
  subtitle: l10n(
    "A multi-tenant business platform built in the unfashionable order — identity, authorization and tenant isolation first, product modules second.",
    "Eine mandantenfähige Business-Plattform, gebaut in der unüblichen Reihenfolge — zuerst Identität, Autorisierung und Mandantenisolierung, danach die Produktmodule.",
    "Une plateforme métier multi-tenant construite dans l'ordre peu courant — d'abord l'identité, l'autorisation et l'isolation des tenants, ensuite les modules produit.",
  ),
  summary: [
    l10n(
      "Business software fragments because every capability arrives with its own idea of who the user is, which company they belong to, and what they're allowed to do. NexusOS answers those three questions once, at the platform layer.",
      "Business-Software zerfällt, weil jede Fähigkeit eine eigene Vorstellung davon mitbringt, wer die Nutzerin oder der Nutzer ist, zu welchem Unternehmen sie gehören und was sie tun dürfen. NexusOS beantwortet diese drei Fragen einmal, auf der Plattformebene.",
      "Les logiciels métier se fragmentent parce que chaque capacité arrive avec sa propre idée de qui est l'utilisateur, de l'entreprise à laquelle il appartient et de ce qu'il a le droit de faire. NexusOS répond à ces trois questions une seule fois, au niveau de la plateforme.",
    ),
    l10n(
      "The straightforward path would have been to ship a CRM and retrofit multi-tenancy later. That path is faster to a demo and structurally hard to recover from — so the sequence was inverted: identity, permission and isolation layers were built and tested first, and product modules inherit them rather than reimplement them.",
      "Der naheliegende Weg wäre gewesen, ein CRM auszuliefern und Mandantenfähigkeit später nachzurüsten. Dieser Weg führt schneller zu einer Demo und ist strukturell schwer zu korrigieren — deshalb wurde die Reihenfolge umgekehrt: Identitäts-, Berechtigungs- und Isolierungsschichten wurden zuerst gebaut und getestet, und die Produktmodule erben sie, statt sie neu zu implementieren.",
      "La voie directe aurait été de livrer un CRM et d'ajouter le multi-tenant plus tard. Cette voie mène plus vite à une démo et se corrige difficilement — la séquence a donc été inversée : les couches d'identité, de permission et d'isolation ont été construites et testées d'abord, et les modules produit en héritent au lieu de les réimplémenter.",
    ),
  ],
  role: l10n(
    "Sole engineer — system architecture, backend, frontend, database design, security engineering, design system, test suite and CI pipeline.",
    "Alleiniger Entwickler — Systemarchitektur, Backend, Frontend, Datenbankentwurf, Sicherheitsengineering, Designsystem, Testsuite und CI-Pipeline.",
    "Seul ingénieur — architecture système, backend, frontend, conception de la base de données, ingénierie de la sécurité, design system, suite de tests et pipeline CI.",
  ),
  highlights: [
    {
      title: l10n(
        "Tenant scope is derived, never accepted",
        "Der Mandantenbereich wird abgeleitet, nie übernommen",
        "Le périmètre du tenant est dérivé, jamais accepté",
      ),
      body: l10n(
        "Authenticated requests carry no tenant header, path segment or body field. Company identity is read from the caller's stored record on every request.",
        "Authentifizierte Anfragen tragen keinen Mandanten-Header, kein Pfadsegment und kein Feld im Body. Die Unternehmensidentität wird bei jeder Anfrage aus dem gespeicherten Datensatz der aufrufenden Person gelesen.",
        "Les requêtes authentifiées ne portent ni en-tête de tenant, ni segment de chemin, ni champ de corps. L'identité de l'entreprise est lue, à chaque requête, dans l'enregistrement stocké de l'appelant.",
      ),
    },
    {
      title: l10n(
        "Authorization is re-derived from the database",
        "Die Autorisierung wird aus der Datenbank neu abgeleitet",
        "L'autorisation est recalculée depuis la base",
      ),
      body: l10n(
        "Role and permissions are loaded fresh on every protected request and fail closed — revocation takes effect on the next request, not at token expiry.",
        "Rolle und Berechtigungen werden bei jeder geschützten Anfrage neu geladen und scheitern geschlossen — ein Widerruf wirkt bei der nächsten Anfrage, nicht erst beim Ablauf des Tokens.",
        "Le rôle et les permissions sont rechargés à chaque requête protégée et échouent fermé — une révocation prend effet à la requête suivante, pas à l'expiration du jeton.",
      ),
    },
    {
      title: l10n(
        "Refresh-token reuse is treated as compromise",
        "Die Wiederverwendung eines Refresh-Tokens gilt als Kompromittierung",
        "La réutilisation d'un jeton de refresh est traitée comme une compromission",
      ),
      body: l10n(
        "Refresh tokens rotate against server-side session records; replaying a spent token revokes every session for that user and writes an audit event.",
        "Refresh-Tokens rotieren gegen serverseitige Sitzungsdatensätze; das erneute Einspielen eines verbrauchten Tokens widerruft jede Sitzung dieser Person und schreibt ein Audit-Ereignis.",
        "Les jetons de refresh tournent contre des enregistrements de session côté serveur ; rejouer un jeton déjà utilisé révoque chaque session de cette personne et écrit un événement d'audit.",
      ),
    },
    {
      title: l10n("Isolation is enforced twice", "Die Isolierung wird zweimal erzwungen", "L'isolation est imposée deux fois"),
      body: l10n(
        "Application-level scoping plus composite foreign keys — (id, company_id) — that make a cross-tenant relationship unrepresentable in the database.",
        "Abgrenzung auf Anwendungsebene plus zusammengesetzte Fremdschlüssel — (id, company_id) —, die eine mandantenübergreifende Beziehung in der Datenbank nicht darstellbar machen.",
        "Un cadrage au niveau de l'application, plus des clés étrangères composites — (id, company_id) — qui rendent une relation inter-tenants impossible à représenter dans la base.",
      ),
    },
    {
      title: l10n("Layered request security", "Mehrschichtige Anfragesicherheit", "Sécurité des requêtes en couches"),
      body: l10n(
        "CORS allowlisting with production startup validation, security headers, Redis-backed rate limiting, and a trusted-proxy boundary for IP-based controls.",
        "CORS-Allowlist mit Prüfung beim Produktionsstart, Sicherheitsheader, Rate-Limiting über Redis und eine Grenze für vertrauenswürdige Proxys bei IP-basierten Kontrollen.",
        "Liste d'autorisation CORS avec validation au démarrage en production, en-têtes de sécurité, limitation de débit appuyée sur Redis, et une frontière de proxy de confiance pour les contrôles basés sur l'IP.",
      ),
    },
    {
      title: l10n(
        "A design system built as infrastructure",
        "Ein Designsystem, gebaut als Infrastruktur",
        "Un design system construit comme une infrastructure",
      ),
      body: l10n(
        "157 design tokens and 31 components with a living style-guide route — the same system this portfolio is built on.",
        "157 Design-Tokens und 31 Komponenten mit einer lebendigen Style-Guide-Route — dasselbe System, auf dem dieses Portfolio aufbaut.",
        "157 jetons de design et 31 composants, avec une route de guide de style vivante — le même système sur lequel ce portfolio est construit.",
      ),
    },
  ],
  status: {
    headline: l10n(
      "NexusOS is an actively developed software platform with core modules implemented and further development ongoing.",
      "NexusOS ist eine aktiv entwickelte Softwareplattform mit umgesetzten Kernmodulen und laufender Weiterentwicklung.",
      "NexusOS est une plateforme logicielle en développement actif, avec des modules centraux implémentés et une suite encore en cours.",
    ),
    implemented: l10n(
      "Platform: multi-tenant identity model, full authentication lifecycle, RBAC with database re-validation, the security middleware layer, and the frontend shell with its design system. CRM: tenant-safe APIs and workspaces for customers, contacts, leads and deals, plus customer timeline notes. HR: an Employees API and workspace (list and detail).",
      "Plattform: mandantenfähiges Identitätsmodell, vollständiger Authentifizierungslebenszyklus, RBAC mit erneuter Prüfung in der Datenbank, die Sicherheits-Middleware und die Frontend-Shell mit ihrem Designsystem. CRM: mandantensichere APIs und Arbeitsbereiche für Kunden, Kontakte, Leads und Deals sowie Notizen zur Kundenchronik. HR: eine Employees-API und ein Arbeitsbereich (Liste und Detail).",
      "Plateforme : modèle d'identité multi-tenant, cycle d'authentification complet, RBAC avec revalidation en base, la couche de middleware de sécurité, et le shell frontend avec son design system. CRM : API et espaces de travail sûrs pour le tenant, pour clients, contacts, leads et deals, plus les notes de chronologie client. HR : une API Employees et un espace de travail (liste et détail).",
    ),
    partial: l10n(
      "HR covers employee records only so far. The dashboard shows live API and database probes, but its operations panel has no metrics source yet, and its module field still marks only CRM as operational.",
      "HR umfasst bisher nur Mitarbeiterdatensätze. Das Dashboard zeigt Live-Prüfungen von API und Datenbank, aber das Operations-Panel hat noch keine Metrikquelle, und das Modulfeld markiert weiterhin nur CRM als betriebsbereit.",
      "HR ne couvre pour l'instant que les dossiers des employés. Le tableau de bord montre des sondes en direct de l'API et de la base, mais son panneau d'opérations n'a pas encore de source de métriques, et son champ de modules ne marque encore que le CRM comme opérationnel.",
    ),
    future: l10n(
      "Projects, tasks, finance, inventory, documents, reports, settings and the AI assistant (routed today as honest placeholders), plus PostgreSQL row-level security. Tenant isolation is currently application-level and relational.",
      "Projekte, Aufgaben, Finanzen, Lager, Dokumente, Berichte, Einstellungen und der KI-Assistent (heute als ehrliche Platzhalter geroutet) sowie Row-Level Security in PostgreSQL. Die Mandantenisolierung ist derzeit auf Anwendungs- und Relationsebene umgesetzt.",
      "Projets, tâches, finance, stocks, documents, rapports, réglages et l'assistant IA (aujourd'hui routés comme des espaces réservés honnêtes), plus la sécurité au niveau des lignes dans PostgreSQL. L'isolation des tenants est aujourd'hui au niveau de l'application et relationnelle.",
    ),
    asOf: l10n(
      "As of main @ 879e442 · HR Part 07.4",
      "Stand main @ 879e442 · HR Part 07.4",
      "État main @ 879e442 · HR Part 07.4",
    ),
  },
  stack: [
    {
      label: l10n("Frontend", "Frontend", "Frontend"),
      value: l10n(
        "React 19, TypeScript, Vite, React Router, TanStack Query, Zustand, Tailwind CSS, Radix UI",
        "React 19, TypeScript, Vite, React Router, TanStack Query, Zustand, Tailwind CSS, Radix UI",
        "React 19, TypeScript, Vite, React Router, TanStack Query, Zustand, Tailwind CSS, Radix UI",
      ),
    },
    {
      label: l10n("Backend", "Backend", "Backend"),
      value: l10n(
        "Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.0 async, Alembic, Argon2, PyJWT",
        "Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.0 async, Alembic, Argon2, PyJWT",
        "Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.0 async, Alembic, Argon2, PyJWT",
      ),
    },
    {
      label: l10n("Data", "Daten", "Données"),
      value: l10n(
        "PostgreSQL 16 via asyncpg, Redis 7 for rate-limit counters",
        "PostgreSQL 16 über asyncpg, Redis 7 für Rate-Limit-Zähler",
        "PostgreSQL 16 via asyncpg, Redis 7 pour les compteurs de limitation de débit",
      ),
    },
    {
      label: l10n("Infra & tests", "Infrastruktur und Tests", "Infra et tests"),
      value: l10n(
        "Docker Compose, GitHub Actions CI, pytest, Vitest + Testing Library, ruff, mypy",
        "Docker Compose, GitHub Actions CI, pytest, Vitest + Testing Library, ruff, mypy",
        "Docker Compose, GitHub Actions CI, pytest, Vitest + Testing Library, ruff, mypy",
      ),
    },
  ],
  interfaceNote: l10n(
    "Current design, captured from the running NexusOS frontend against a local API stub with a demo identity — no production data. The full set of fifteen screens is in the library under System & interface.",
    "Aktuelles Design, aufgenommen vom laufenden NexusOS-Frontend gegen einen lokalen API-Stub mit einer Demo-Identität — keine Produktionsdaten. Alle fünfzehn Bildschirme liegen in der Bibliothek unter System und Oberfläche.",
    "Design actuel, capturé depuis le frontend NexusOS en cours d'exécution contre un stub d'API local avec une identité de démo — aucune donnée de production. Les quinze écrans sont dans la bibliothèque, sous Système et interface.",
  ),
  architecture: {
    system: l10n(
      "Routers stay thin and delegate to services. Identity is resolved by dependencies rather than by each endpoint, so a new route cannot accidentally skip it. Every response returns in the same envelope, and one database session per request is committed on success and rolled back on any exception.",
      "Router bleiben schlank und delegieren an Services. Die Identität wird über Dependencies aufgelöst, nicht in jedem Endpunkt, damit eine neue Route sie nicht versehentlich überspringt. Jede Antwort kommt im selben Umschlag zurück, und eine Datenbanksitzung je Anfrage wird bei Erfolg committed und bei jeder Ausnahme zurückgerollt.",
      "Les routeurs restent minces et délèguent aux services. L'identité est résolue par des dépendances plutôt que par chaque point d'accès, pour qu'une nouvelle route ne puisse pas l'oublier. Chaque réponse revient dans la même enveloppe, et une session de base par requête est validée en cas de succès et annulée à toute exception.",
    ),
    security: l10n(
      "Every layer shown is present and wired in the codebase. The panel listing what is not claimed is the more important half: no row-level security, no issuer validation, no account lockout, no revocation of access tokens before expiry.",
      "Jede gezeigte Schicht ist vorhanden und in der Codebasis verdrahtet. Das Panel dessen, was nicht behauptet wird, ist die wichtigere Hälfte: keine Row-Level Security, keine Issuer-Prüfung, keine Kontosperre, kein Widerruf von Access-Tokens vor Ablauf.",
      "Chaque couche montrée est présente et câblée dans la base de code. Le panneau de ce qui n'est pas revendiqué est la moitié la plus importante : pas de sécurité au niveau des lignes, pas de validation de l'émetteur, pas de verrouillage de compte, pas de révocation des jetons d'accès avant expiration.",
    ),
    tenancy: l10n(
      "The access token carries a company identifier. It is ignored. The token's subject only locates the user row; every scoping decision is then read from that row. After sign-in, nothing in a request influences its own tenant scope.",
      "Das Access-Token trägt eine Unternehmenskennung. Sie wird ignoriert. Das Subject des Tokens findet nur die Nutzerzeile; jede Abgrenzungsentscheidung wird danach aus dieser Zeile gelesen. Nach der Anmeldung beeinflusst nichts in einer Anfrage ihren eigenen Mandantenbereich.",
      "Le jeton d'accès porte un identifiant d'entreprise. Il est ignoré. Le sujet du jeton ne sert qu'à trouver la ligne utilisateur ; chaque décision de périmètre est ensuite lue dans cette ligne. Après la connexion, rien dans une requête n'influence son propre périmètre de tenant.",
    ),
  },
};
