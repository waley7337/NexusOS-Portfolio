/**
 * Ghost Protocol documentation cards. Each line is taken from the public
 * docs in waley7337/Ghost-Protocol. The profile copy itself stays in projects.ts.
 */
import { l10n, type L10n } from "~/i18n/l10n";

export interface GhostDoc {
  title: L10n<string>;
  body: L10n<string>;
  href: string;
}

const doc = (file: string) => `https://github.com/waley7337/Ghost-Protocol/blob/main/docs/${file}`;

export const ghostDocs: GhostDoc[] = [
  {
    title: l10n("Architecture", "Architektur", "Architecture"),
    body: l10n(
      "Web on Vercel, with the API and PostgreSQL on Railway. The application is single-user scoped, not multi-tenant. Items marked planned are not implemented.",
      "Web auf Vercel, API und PostgreSQL auf Railway. Die Anwendung ist auf eine einzelne Nutzerin oder einen einzelnen Nutzer ausgelegt, nicht mandantenfähig. Als geplant markierte Punkte sind nicht umgesetzt.",
      "Web sur Vercel, avec l'API et PostgreSQL sur Railway. L'application est conçue pour un seul utilisateur, pas en multi-tenant. Les éléments marqués comme prévus ne sont pas implémentés.",
    ),
    href: doc("ARCHITECTURE.md"),
  },
  {
    title: l10n("Security", "Sicherheit", "Sécurité"),
    body: l10n(
      "Separates implemented controls from planned ones. Electron renderer isolation is documented as on. A signed public desktop release is not claimed.",
      "Trennt umgesetzte Kontrollen von geplanten. Die Isolation des Electron-Renderers ist als aktiv dokumentiert. Ein signiertes öffentliches Desktop-Release wird nicht behauptet.",
      "Sépare les contrôles implémentés de ceux qui sont prévus. L'isolation du renderer Electron est documentée comme active. Une release bureau publique signée n'est pas revendiquée.",
    ),
    href: doc("SECURITY.md"),
  },
  {
    title: l10n("Threat model", "Bedrohungsmodell", "Modèle de menace"),
    body: l10n(
      "Assets and trust boundaries for the single-user application. Planned mitigations stay labeled as not implemented unless Security lists them as current.",
      "Werte und Vertrauensgrenzen der Einzelbenutzer-Anwendung. Geplante Maßnahmen bleiben als nicht umgesetzt gekennzeichnet, sofern Sicherheit sie nicht als aktuell führt.",
      "Biens et frontières de confiance de l'application mono-utilisateur. Les mesures prévues restent marquées comme non implémentées, sauf si Sécurité les liste comme actuelles.",
    ),
    href: doc("THREAT_MODEL.md"),
  },
  {
    title: l10n("Roadmap", "Roadmap", "Feuille de route"),
    body: l10n(
      "Uses honesty labels for implemented, verified, and planned work. No Redis. The supabase directory is legacy and unused at runtime.",
      "Nutzt Ehrlichkeitsetiketten für umgesetzte, geprüfte und geplante Arbeit. Kein Redis. Das Verzeichnis supabase ist ein Überrest und wird zur Laufzeit nicht verwendet.",
      "Utilise des libellés d'honnêteté pour le travail implémenté, vérifié et prévu. Pas de Redis. Le répertoire supabase est un héritage et n'est pas utilisé à l'exécution.",
    ),
    href: doc("ROADMAP.md"),
  },
  {
    title: l10n("Phase 9 audit", "Phase-9-Audit", "Audit de la phase 9"),
    body: l10n(
      "Conditional go for private testing and controlled demos. No-go for public unsigned Electron distribution, and no-go for claims of conflict-safe multi-device sync.",
      "Bedingtes Go für private Tests und kontrollierte Demos. No-Go für die öffentliche unsignierte Electron-Verteilung und No-Go für Behauptungen einer konfliktsicheren Synchronisation über mehrere Geräte.",
      "Feu vert conditionnel pour des tests privés et des démos contrôlées. Feu rouge pour une distribution Electron publique non signée, et feu rouge pour toute affirmation de synchronisation multi-appareils sans conflit.",
    ),
    href: doc("PHASE-9-AUDIT.md"),
  },
  {
    title: l10n("Desktop release", "Desktop-Release", "Version bureau"),
    body: l10n(
      "macOS ARM64 package for controlled demos. Not Developer ID signed or notarized. Packaged builds target the Railway API.",
      "macOS-ARM64-Paket für kontrollierte Demos. Nicht mit Developer ID signiert und nicht notarisiert. Gepackte Builds zielen auf die Railway-API.",
      "Paquet macOS ARM64 pour des démos contrôlées. Ni signé avec un Developer ID, ni notarisé. Les builds empaquetés visent l'API Railway.",
    ),
    href: doc("DESKTOP-RELEASE.md"),
  },
];

export const ghostScreenshotNote = l10n(
  "Captured from the deployed web client at ghost-protocol-pi.vercel.app. Click a panel to inspect it.",
  "Aufgenommen vom bereitgestellten Webclient unter ghost-protocol-pi.vercel.app. Ein Panel anklicken, um es anzusehen.",
  "Capturé depuis le client web déployé sur ghost-protocol-pi.vercel.app. Cliquez sur un panneau pour l'examiner.",
);

/**
 * Explanation of the Ghost Protocol security-architecture diagram.
 * Only controls and states drawn on that diagram are described here.
 */
export const ghostSecurityCopy = l10n(
  "Defense in depth from the untrusted renderer to the database. The renderer is sandboxed, off-site navigation is blocked, the content security policy denies unsafe-eval, and the packaged build ships with DevTools off. The preload bridge exposes one frozen API, and every IPC channel checks the sender, type and length. Access tokens stay in memory. The desktop refresh token is encrypted in the main process when safe storage is available. The backend hashes passwords with Argon2id, stores refresh tokens hashed, and revokes the whole family when a spent token is reused. Queries are parameterized and scoped to the verified user. HTTPS is required and CORS is limited to the frontend origin. Google sign-in does not auto-link a conflicting account. The status panel marks the sandbox, token rotation, per-user data ownership and HTTPS-only CORS as implemented. Residual risks include the Google auto-link check, an unsigned desktop build, an open high-severity audit finding, last-write-wins sync, and in-process rate limiting. Password reset, email verification, a web content-security-policy response header and Cloudflare WAF are marked planned, not implemented.",
  "Defense in Depth vom nicht vertrauenswürdigen Renderer bis zur Datenbank. Der Renderer ist sandboxiert, Navigation nach außen ist blockiert, die Content-Security-Policy verbietet unsafe-eval, und der gepackte Build startet ohne DevTools. Die Preload-Brücke stellt eine eingefrorene API bereit, und jeder IPC-Kanal prüft Absender, Typ und Länge. Access-Tokens bleiben im Speicher. Der Desktop-Refresh-Token wird im Hauptprozess verschlüsselt, wenn sicherer Speicher verfügbar ist. Das Backend hasht Passwörter mit Argon2id, speichert Refresh-Tokens gehasht und widerruft die ganze Familie, wenn ein verbrauchter Token erneut verwendet wird. Abfragen sind parametrisiert und auf die geprüfte Person begrenzt. HTTPS ist erforderlich, und CORS ist auf den Ursprung des Frontends beschränkt. Die Google-Anmeldung verknüpft ein widersprüchliches Konto nicht automatisch. Das Statuspanel markiert Sandbox, Token-Rotation, Datenbesitz je Person und nur-HTTPS-CORS als umgesetzt. Restrisiken sind die Google-Auto-Link-Prüfung, ein unsignierter Desktop-Build, ein offener Audit-Befund hoher Schwere, Synchronisation nach dem letzten Schreibvorgang und eine Ratenbegrenzung im Prozess. Passwort-Zurücksetzen, E-Mail-Verifizierung, ein Content-Security-Policy-Antwortheader und Cloudflare WAF sind als geplant markiert, nicht als umgesetzt.",
  "Défense en profondeur, du renderer non fiable jusqu'à la base. Le renderer est isolé, la navigation hors site est bloquée, la politique de sécurité du contenu refuse unsafe-eval, et le build empaqueté démarre sans DevTools. Le pont preload expose une seule API figée, et chaque canal IPC vérifie l'expéditeur, le type et la longueur. Les jetons d'accès restent en mémoire. Le jeton de refresh bureau est chiffré dans le processus principal quand un stockage sûr est disponible. Le backend hache les mots de passe avec Argon2id, stocke les jetons de refresh hachés et révoque toute la famille si un jeton déjà utilisé est rejoué. Les requêtes sont paramétrées et limitées à la personne vérifiée. HTTPS est exigé et CORS est limité à l'origine du frontend. La connexion Google ne relie pas automatiquement un compte en conflit. Le panneau d'état marque comme implémentés le bac à sable, la rotation des jetons, la propriété des données par personne et un CORS limité à HTTPS. Les risques résiduels comprennent le contrôle de liaison automatique Google, un build bureau non signé, un constat d'audit ouvert de haute sévérité, la synchronisation au dernier écrit et une limitation de débit dans le processus. La réinitialisation du mot de passe, la vérification e-mail, un en-tête de réponse content-security-policy et le WAF Cloudflare sont marqués comme prévus, pas comme implémentés.",
);

export const ghostArchitectureCopy = l10n(
  "Electron desktop, the web SPA and Google sign-in are the client. The trust boundary keeps the renderer untrusted, with a narrow preload bridge into the privileged main process. The backend API authenticates with Argon2id and short-lived JWTs, rotates hashed refresh tokens, and scopes profile and progress to the authenticated user. Railway PostgreSQL is the system of record; clients do not talk to it directly. The status panel marks email and Google auth, profile and progress, Electron credential hardening, the Vercel web client, and the Railway API and database as implemented. Documented limits include last-write-wins multi-device sync and a desktop build that is not signed or notarized. Cloudflare edge and password reset are marked planned, not implemented.",
  "Electron-Desktop, die Web-SPA und die Google-Anmeldung sind der Client. Die Vertrauensgrenze hält den Renderer für nicht vertrauenswürdig, mit einer schmalen Preload-Brücke in den privilegierten Hauptprozess. Die Backend-API authentifiziert mit Argon2id und kurzlebigen JWTs, rotiert gehashte Refresh-Tokens und begrenzt Profil und Fortschritt auf die angemeldete Person. Railway PostgreSQL ist das führende System; Clients sprechen nicht direkt damit. Das Statuspanel markiert E-Mail- und Google-Authentifizierung, Profil und Fortschritt, die Härtung der Electron-Zugangsdaten, den Vercel-Webclient sowie die Railway-API und die Datenbank als umgesetzt. Dokumentierte Grenzen sind die Synchronisation über mehrere Geräte nach dem letzten Schreibvorgang und ein Desktop-Build, der nicht signiert oder notarisiert ist. Cloudflare Edge und Passwort-Zurücksetzen sind als geplant markiert, nicht als umgesetzt.",
  "Le bureau Electron, la SPA web et la connexion Google forment le client. La frontière de confiance laisse le renderer non fiable, avec un pont preload étroit vers le processus principal privilégié. L'API backend authentifie avec Argon2id et des JWT de courte durée, fait tourner des jetons de refresh hachés et limite le profil et la progression à la personne authentifiée. PostgreSQL sur Railway est le système de référence ; les clients ne lui parlent pas directement. Le panneau d'état marque comme implémentés l'authentification e-mail et Google, le profil et la progression, le durcissement des identifiants Electron, le client web Vercel, ainsi que l'API et la base Railway. Les limites documentées comprennent la synchronisation multi-appareils au dernier écrit et un build bureau ni signé ni notarisé. Cloudflare en bordure et la réinitialisation du mot de passe sont marqués comme prévus, pas comme implémentés.",
);
