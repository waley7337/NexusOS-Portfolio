/**
 * Profile facts. Every value here is taken from Waley's own documents
 * (CV, degree certificate, NexusOS case study and portfolio summary) —
 * nothing is inferred or embellished.
 */
import { l10n } from "~/i18n/l10n";

export const profile = {
  name: "Waley El-Nagdi",
  role: l10n("Software Developer", "Softwareentwickler", "Développeur logiciel"),
  focus: l10n(
    "Backend Development & Systems Integration",
    "Backend-Entwicklung und Systemintegration",
    "Développement backend et intégration de systèmes",
  ),
  stack: ["Python", "REST APIs", "PostgreSQL", "Business Applications"],
  pitch: l10n(
    "A self-taught developer applying for a company placement through the AQUA pathway toward the Lehrabschlussprüfung (LAP) in Applikationsentwicklung – Coding.",
    "Autodidaktischer Entwickler, der sich über den AQUA-Weg um einen betrieblichen Ausbildungsplatz zur Lehrabschlussprüfung (LAP) in Applikationsentwicklung – Coding bewirbt.",
    "Développeur autodidacte, candidat à un placement en entreprise via le parcours AQUA en vue de la Lehrabschlussprüfung (LAP) en Applikationsentwicklung – Coding.",
  ),
  location: l10n("St. Pölten, Austria", "St. Pölten, Österreich", "St. Pölten, Autriche"),
  availability: l10n(
    "Full-time · remote preferred · willing to travel",
    "Vollzeit · Remote bevorzugt · reisebereit",
    "Temps plein · télétravail souhaité · déplacements possibles",
  ),
  email: "waleyelnagdi7@gmail.com",
  github: "https://github.com/waley7337",
  phone: "+43 676 5119613",
  liveApp: {
    url: "https://nexuops.com/login",
    host: "nexuops.com",
    note: l10n(
      "Opens the sign-in page of the live NexusOS app.",
      "Öffnet die Anmeldeseite der laufenden NexusOS-Anwendung.",
      "Ouvre la page de connexion de l'application NexusOS en ligne.",
    ),
  },
  /**
   * Company portfolio identifier supplied for NexusOS. It is an identifier,
   * not a URL and not a sign-in name. The live demos section shows this text
   * and links the company portfolio page separately.
   */
  companyPortfolioId: "el-nagdi-s-portfolio",
};

export const approach = [
  {
    title: l10n("Understand first", "Zuerst verstehen", "Comprendre d'abord"),
    body: l10n(
      "I try to understand the code, the architectural choices and the trade-offs behind a solution before I rely on it.",
      "Ich versuche, den Code, die Architekturentscheidungen und die Abwägungen hinter einer Lösung zu verstehen, bevor ich mich darauf stütze.",
      "Je cherche à comprendre le code, les choix d'architecture et les compromis d'une solution avant de m'y fier.",
    ),
  },
  {
    title: l10n("Question the output", "Ergebnisse hinterfragen", "Interroger le résultat"),
    body: l10n(
      "I use LLMs as learning assistants and treat generated answers as proposals to check, not as facts.",
      "Ich nutze LLMs als Lernhilfe und behandle erzeugte Antworten als Vorschläge, die zu prüfen sind, nicht als Fakten.",
      "J'utilise les LLM comme aides à l'apprentissage et je traite les réponses générées comme des propositions à vérifier, pas comme des faits.",
    ),
  },
  {
    title: l10n("Stay honest", "Ehrlich bleiben", "Rester honnête"),
    body: l10n(
      "I do not yet understand every component of my projects equally well — and I am actively building that competence.",
      "Ich verstehe noch nicht jede Komponente meiner Projekte gleich gut — und ich baue diese Kompetenz bewusst auf.",
      "Je ne comprends pas encore chaque composant de mes projets au même niveau — et je construis activement cette compétence.",
    ),
  },
];

export const stats = [
  { value: "5", label: l10n("Architecture layers", "Architekturschichten", "Couches d'architecture") },
  { value: "7", label: l10n("Security layers", "Sicherheitsschichten", "Couches de sécurité") },
  { value: "~110", label: l10n("Security tests", "Sicherheitstests", "Tests de sécurité") },
  { value: "31", label: l10n("UI components", "UI-Komponenten", "Composants d'interface") },
];

export const education = {
  institution: "Université de Strasbourg",
  degree: "Licence",
  field: "Langues, littératures étrangères et régionales — Département d'études anglophones",
  honours: "Mention bien",
  academicYear: "2019–2020",
  awarded: "30 June 2020",
  cvWording: "Licence – Anglistik / Englische Studien, 2016–2020",
  further: {
    institution: "LISAA – Institut Supérieur des Arts Appliqués",
    detail: "Hochschulausbildung in angewandter Kunst",
    years: "2021–2022",
  },
};
