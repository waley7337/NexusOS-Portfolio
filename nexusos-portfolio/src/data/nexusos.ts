/**
 * NexusOS project copy. Status wording follows the 2026-10-18 documentation
 * on main @ 1974025: what has routers and pages, what is partial, what is a
 * placeholder, and what is planned. Production on nexuops.com is unverified.
 */
import { l10n } from "~/i18n/l10n";

export const nexusos = {
  subtitle: l10n(
    "A multi-tenant business platform built in the unfashionable order: identity, authorization and tenant isolation first, product modules second.",
    "Eine mandantenfähige Business-Plattform, gebaut in der unüblichen Reihenfolge: zuerst Identität, Autorisierung und Mandantenisolierung, danach die Produktmodule.",
    "Une plateforme métier multi-tenant construite dans l'ordre peu courant : d'abord l'identité, l'autorisation et l'isolation des tenants, ensuite les modules produit.",
  ),
  summary: [
    l10n(
      "Business software fragments because every capability arrives with its own idea of who the user is, which company they belong to, and what they're allowed to do. NexusOS answers those three questions once, at the platform layer.",
      "Business-Software zerfällt, weil jede Fähigkeit eine eigene Vorstellung davon mitbringt, wer die Nutzerin oder der Nutzer ist, zu welchem Unternehmen sie gehören und was sie tun dürfen. NexusOS beantwortet diese drei Fragen einmal, auf der Plattformebene.",
      "Les logiciels métier se fragmentent parce que chaque capacité arrive avec sa propre idée de qui est l'utilisateur, de l'entreprise à laquelle il appartient et de ce qu'il a le droit de faire. NexusOS répond à ces trois questions une seule fois, au niveau de la plateforme.",
    ),
    l10n(
      "The straightforward path would have been to ship a CRM and retrofit multi-tenancy later. That path is faster to a demo and structurally hard to recover from, so the sequence was inverted: identity, permission and isolation layers were built and tested first, and product modules inherit them rather than reimplement them.",
      "Der naheliegende Weg wäre gewesen, ein CRM auszuliefern und Mandantenfähigkeit später nachzurüsten. Dieser Weg führt schneller zu einer Demo und ist strukturell schwer zu korrigieren, deshalb wurde die Reihenfolge umgekehrt: Identitäts-, Berechtigungs- und Isolierungsschichten wurden zuerst gebaut und getestet, und die Produktmodule erben sie, statt sie neu zu implementieren.",
      "La voie directe aurait été de livrer un CRM et d'ajouter le multi-tenant plus tard. Cette voie mène plus vite à une démo et se corrige difficilement, la séquence a donc été inversée : les couches d'identité, de permission et d'isolation ont été construites et testées d'abord, et les modules produit en héritent au lieu de les réimplémenter.",
    ),
  ],
  role: l10n(
    "Sole engineer: system architecture, backend, frontend, database design, security engineering, design system, test suite and CI pipeline.",
    "Alleiniger Entwickler: Systemarchitektur, Backend, Frontend, Datenbankentwurf, Sicherheitsengineering, Designsystem, Testsuite und CI-Pipeline.",
    "Seul ingénieur : architecture système, backend, frontend, conception de la base de données, ingénierie de la sécurité, design system, suite de tests et pipeline CI.",
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
        "Role and permissions are loaded fresh on every protected request and fail closed: revocation takes effect on the next request, not at token expiry.",
        "Rolle und Berechtigungen werden bei jeder geschützten Anfrage neu geladen und scheitern geschlossen: ein Widerruf wirkt bei der nächsten Anfrage, nicht erst beim Ablauf des Tokens.",
        "Le rôle et les permissions sont rechargés à chaque requête protégée et échouent fermé : une révocation prend effet à la requête suivante, pas à l'expiration du jeton.",
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
        "Application-level scoping plus composite foreign keys, (id, company_id), that make a cross-tenant relationship unrepresentable in the database.",
        "Abgrenzung auf Anwendungsebene plus zusammengesetzte Fremdschlüssel, (id, company_id), die eine mandantenübergreifende Beziehung in der Datenbank nicht darstellbar machen.",
        "Un cadrage au niveau de l'application, plus des clés étrangères composites, (id, company_id), qui rendent une relation inter-tenants impossible à représenter dans la base.",
      ),
    },
    {
      title: l10n("Layered request security", "Mehrschichtige Anfragesicherheit", "Sécurité des requêtes en couches"),
      body: l10n(
        "CORS allowlisting with production startup validation, security headers, Redis-backed rate limiting that fails open if Redis errors, and a trusted-proxy boundary for IP-based controls.",
        "CORS-Allowlist mit Prüfung beim Produktionsstart, Sicherheitsheader, Rate-Limiting über Redis, das die Anfrage durchlässt, wenn Redis ausfällt, und eine Grenze für vertrauenswürdige Proxys bei IP-basierten Kontrollen.",
        "Liste d'autorisation CORS avec validation au démarrage en production, en-têtes de sécurité, limitation de débit appuyée sur Redis qui laisse passer la requête si Redis tombe en erreur, et une frontière de proxy de confiance pour les contrôles basés sur l'IP.",
      ),
    },
    {
      title: l10n(
        "A design system built as infrastructure",
        "Ein Designsystem, gebaut als Infrastruktur",
        "Un design system construit comme une infrastructure",
      ),
      body: l10n(
        "A living style-guide route: the same system this portfolio is built on.",
        "Eine lebendige Style-Guide-Route: dasselbe System, auf dem dieses Portfolio aufbaut.",
        "Une route de guide de style vivante : le même système sur lequel ce portfolio est construit.",
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
      "Platform: multi-tenant identity model, full authentication lifecycle, RBAC with database re-validation, the security middleware layer, and the frontend shell with its design system. Modules with routers and pages: CRM, HR, finance, inventory, projects, tasks, reports, settings, and dashboard metrics. Notifications are an inbox in the shell, not a separate page. HR covers employees, leave, and attendance. That is not all of HR. Implemented: projects, tasks, finance, inventory, reports, settings, notifications, dashboard metrics. Production on nexuops.com is unverified.",
      "Plattform: mandantenfähiges Identitätsmodell, vollständiger Authentifizierungsablauf, RBAC mit erneuter Prüfung in der Datenbank, die Sicherheits-Middleware und die Frontend-Shell mit dem Designsystem. Module mit Routern und Seiten: CRM, HR, Finanzen, Lager, Projekte, Aufgaben, Berichte, Einstellungen und Dashboard-Metriken. Benachrichtigungen sind ein Posteingang in der Shell und keine eigene Seite. HR umfasst Mitarbeiter, Urlaub und Anwesenheit. Nicht das ganze HR ist fertig. Umgesetzt: Projekte, Aufgaben, Finanzen, Lager, Berichte, Einstellungen, Benachrichtigungen, Dashboard-Metriken. Die Produktion auf nexuops.com ist nicht geprüft.",
      "Plateforme : modèle d'identité multi-tenant, cycle d'authentification complet, RBAC avec revalidation en base, la couche de middleware de sécurité, et le shell frontend avec son design system. Modules avec routeurs et pages : CRM, RH, finance, stocks, projets, tâches, rapports, réglages et métriques du tableau de bord. Les notifications sont une boîte de réception dans le shell, et non une page séparée. Les RH couvrent les employés, les congés et la présence. Cela ne couvre pas toutes les RH. Implémenté : projets, tâches, finance, stocks, rapports, réglages, notifications, métriques du tableau de bord. La production sur nexuops.com n'est pas vérifiée.",
    ),
    partial: l10n(
      "Partial: AI fails soft without a key. Stripe stays fail-closed until it is configured.",
      "Teilweise: Die KI fällt ohne Schlüssel weich aus. Stripe bleibt geschlossen, bis es konfiguriert ist.",
      "Partiel : l'IA échoue en douceur sans clé. Stripe reste fermé tant qu'il n'est pas configuré.",
    ),
    future: l10n(
      "Placeholder: documents. The documents route is a placeholder, not a first-class module. Planned: PostgreSQL RLS (not implemented). Tenant isolation stays application-level, with composite foreign keys. It is not row-level security.",
      "Platzhalter: Dokumente. Die Dokumente-Route ist ein Platzhalter, kein eigenes Modul. Geplant: PostgreSQL RLS (nicht umgesetzt). Die Mandantenisolierung bleibt auf Anwendungsebene, mit zusammengesetzten Fremdschlüsseln. Das ist keine Row-Level Security.",
      "Placeholder : documents. La route documents est un placeholder, pas un module de premier plan. Prévu : PostgreSQL RLS (non implémentée). L'isolation des tenants reste au niveau de l'application, avec des clés étrangères composites. Ce n'est pas une sécurité au niveau des lignes.",
    ),
    asOf: l10n(
      "Documentation reference: main @ 1974025, dated 2026-10-18. This does not say nexuops.com is running that commit. Production stays unverified.",
      "Dokumentationsstand: main @ 1974025, Datum 2026-10-18. Das sagt nicht, dass nexuops.com diesen Stand ausführt. Die Produktion bleibt ungeprüft.",
      "Référence de documentation : main @ 1974025, datée du 2026-10-18. Cela ne dit pas que nexuops.com exécute ce commit. La production reste non vérifiée.",
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
        "Docker Compose, GitHub Actions CI, pytest, Vitest + Testing Library, ruff. mypy is a project tool, not part of the current CI gate.",
        "Docker Compose, GitHub Actions CI, pytest, Vitest + Testing Library, ruff. mypy ist ein Werkzeug im Projekt und gehört nicht zur aktuellen CI-Prüfung.",
        "Docker Compose, GitHub Actions CI, pytest, Vitest + Testing Library, ruff. mypy est un outil du projet, et il ne fait pas partie du contrôle CI actuel.",
      ),
    },
  ],
  interfaceNote: l10n(
    "Current design, captured from the running NexusOS frontend against a local API stub with a demo identity: no production data. The full set of fifteen screens is in the library under System & interface.",
    "Aktuelles Design, aufgenommen vom laufenden NexusOS-Frontend gegen einen lokalen API-Stub mit einer Demo-Identität: keine Produktionsdaten. Alle fünfzehn Bildschirme liegen in der Bibliothek unter System und Oberfläche.",
    "Design actuel, capturé depuis le frontend NexusOS en cours d'exécution contre un stub d'API local avec une identité de démo : aucune donnée de production. Les quinze écrans sont dans la bibliothèque, sous Système et interface.",
  ),
  architecture: {
    system: l10n(
      "Domain routers are live, including finance. Documents are not a first-class module. PostgreSQL RLS is planned and not implemented. Redis rate limiting fails open if Redis errors. Cloudflare WAF rules are unverified. Production is unverified.",
      "Die Domain-Router sind live, auch Finanzen. Dokumente sind kein eigenes Modul. PostgreSQL RLS ist geplant und nicht umgesetzt. Das Redis-Rate-Limit lässt die Anfrage durch, wenn Redis ausfällt. Cloudflare-WAF-Regeln sind nicht geprüft. Die Produktion ist nicht geprüft.",
      "Les routeurs de domaine sont en service, finance comprise. Les documents ne sont pas un module de premier plan. La RLS PostgreSQL est prévue et non implémentée. La limitation de débit Redis laisse passer la requête si Redis tombe en erreur. Les règles WAF Cloudflare ne sont pas vérifiées. La production n'est pas vérifiée.",
    ),
    security: l10n(
      "The request path shows application controls. Redis rate limiting fails open if Redis errors. PostgreSQL RLS is not implemented. Cloudflare WAF rules are unverified. The diagram cites backend/tests/security/ and test_tenant_isolation.py. It shows no pass count and no cross-tenant screenshot.",
      "Der Anfrageweg zeigt Kontrollen in der Anwendung. Das Redis-Rate-Limit lässt die Anfrage durch, wenn Redis ausfällt. PostgreSQL RLS ist nicht umgesetzt. Cloudflare-WAF-Regeln sind nicht geprüft. Das Diagramm nennt backend/tests/security/ und test_tenant_isolation.py. Es zeigt keine Zahl bestandener Tests und keinen Screenshot über Mandanten hinweg.",
      "Le chemin de requête montre des contrôles dans l'application. La limitation de débit Redis laisse passer la requête si Redis tombe en erreur. La RLS PostgreSQL n'est pas implémentée. Les règles WAF Cloudflare ne sont pas vérifiées. Le diagramme cite backend/tests/security/ et test_tenant_isolation.py. Il ne montre ni nombre de tests réussis, ni capture inter-tenants.",
    ),
    tenancy: l10n(
      "The access token carries a company identifier. Scope ignores it. The token subject locates the user row, and company_id is read from that row. Isolation is application filters plus composite foreign keys. PostgreSQL RLS is not implemented.",
      "Das Access-Token trägt eine Unternehmenskennung. Für den Mandantenbereich zählt sie nicht. Das Subject des Tokens findet die Nutzerzeile, und company_id wird aus dieser Zeile gelesen. Die Isolierung besteht aus Filtern in der Anwendung und aus zusammengesetzten Fremdschlüsseln. PostgreSQL RLS ist nicht umgesetzt.",
      "Le jeton d'accès porte un identifiant d'entreprise. Le périmètre l'ignore. Le sujet du jeton trouve la ligne utilisateur, et company_id est lu dans cette ligne. L'isolation, ce sont des filtres dans l'application plus des clés étrangères composites. La RLS PostgreSQL n'est pas implémentée.",
    ),
  },
};
