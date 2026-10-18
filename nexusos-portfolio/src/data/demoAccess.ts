/**
 * Public demo access the owner explicitly supplied for the live demos
 * section. These values are rendered on the page. They are not inferred.
 */
import { l10n } from "~/i18n/l10n";

export const DEMO_ACCESS_NOTE =
  "Demo access credentials are provided above for both NexusOS and Ghost Protocol. Open the corresponding live demo and use the listed email and password to sign in.";

export const demoAccessNote = l10n(
  DEMO_ACCESS_NOTE,
  "Die Demo-Zugangsdaten stehen oben für NexusOS und Ghost Protocol. Öffnen Sie die passende Live-Demo und melden Sie sich mit der angegebenen E-Mail und dem Passwort an.",
  "Les identifiants de démonstration figurent ci-dessus pour NexusOS et Ghost Protocol. Ouvrez la démo en ligne correspondante et connectez-vous avec l'e-mail et le mot de passe indiqués.",
);

/** Clickable company portfolio page. Distinct from the company-given identifier. */
export const companyPortfolioLink = "https://nexus-os-portfolio-delta.vercel.app/#nexusos";

/** Live application control. Distinct from the sign-in path at profile.liveApp. */
export const nexusLiveApplication = "https://nexuops.com";

/** NexusOS application repository. The portfolio repo is a different URL. */
export const nexusGithub = "https://github.com/waley7337/NexusOS";

export const nexusDemoAccount = {
  email: "waleyelnagdi7@gmail.com",
  password: "COMPANYcomp170106@",
};

export const ghostDemoAccount = {
  email: "nagdi9697@gmail.com",
  password: "COMPcomp170106@",
};
