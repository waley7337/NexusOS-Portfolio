/**
 * How NexusOS is built. Wording is the supplied development workflow,
 * kept as written.
 */

export const workflowIntro =
  "NexusOS is developed using an iterative, modular full-stack development workflow designed to maintain clear separation of concerns, scalability, and maintainability.";

export const workflowSteps = [
  {
    index: "01",
    title: "Architecture & Codebase Structure",
    body: "Defined the application architecture and organized the codebase into modular frontend components, backend services, configuration, and supporting infrastructure.",
  },
  {
    index: "02",
    title: "Frontend Development",
    body: "Built the user interface with React and TypeScript, using reusable components, structured layouts, and interactive elements to deliver a consistent application experience.",
  },
  {
    index: "03",
    title: "Backend Development & API Integration",
    body: "Implemented backend functionality with FastAPI, connecting frontend components to server-side business logic through HTTP APIs and structured data exchange.",
  },
  {
    index: "04",
    title: "Database & Data Management",
    body: "Integrated PostgreSQL for persistent data storage and designed data interactions to support business modules, CRM functionality, and multi-tenant application requirements.",
  },
  {
    index: "05",
    title: "Testing & Quality Assurance",
    body: "Used automated tests, type checking, build validation, and iterative debugging to identify issues, verify functionality, and reduce regressions during development.",
  },
  {
    index: "06",
    title: "Version Control & Iteration",
    body: "Managed source code with Git and GitHub, using commits and isolated branches to track changes, develop features, and maintain separation between application and portfolio work.",
  },
  {
    index: "07",
    title: "Deployment & Production",
    body: "Structured deployment around Vercel for the frontend, Railway for backend services, and Cloudflare for domain infrastructure, with production verification to validate the deployed application.",
  },
] as const;

export const workflowCycle = "Architecture → Implementation → Integration → Testing → Refinement → Deployment";

export const workflowStack = "React · TypeScript · FastAPI · PostgreSQL · Redis · Git · GitHub · Vercel · Railway · Cloudflare";

export const workflowRelationship = {
  en: "These steps describe how NexusOS is developed. A workflow description is not evidence that a feature is operational. What is implemented, what is verified and what is only planned is stated separately under Transparency & Development Approach and on each project.",
  de: "Diese Schritte beschreiben, wie NexusOS entwickelt wird. Eine Beschreibung des Arbeitsablaufs ist kein Nachweis, dass eine Funktion betriebsbereit ist. Was umgesetzt, was überprüft und was nur geplant ist, steht getrennt unter Transparenz & Entwicklungsansatz und bei jedem Projekt.",
} as const;

export const workflowDe = {
  title: "NexusOS-Arbeitsablauf",
  intro:
    "NexusOS wird in einem iterativen, modularen Full-Stack-Entwicklungsablauf entwickelt. Der Ablauf hält die Zuständigkeiten klar getrennt und ist auf Skalierbarkeit und Wartbarkeit ausgerichtet.",
  steps: [
    {
      index: "01",
      title: "Architektur und Codebasis",
      body: "Die Anwendungsarchitektur wurde festgelegt und die Codebasis in modulare Frontend-Komponenten, Backend-Dienste, Konfiguration und unterstützende Infrastruktur gegliedert.",
    },
    {
      index: "02",
      title: "Frontend-Entwicklung",
      body: "Die Benutzeroberfläche wurde mit React und TypeScript aufgebaut, mit wiederverwendbaren Komponenten, klaren Layouts und interaktiven Elementen für ein konsistentes Anwendungserlebnis.",
    },
    {
      index: "03",
      title: "Backend-Entwicklung und API-Anbindung",
      body: "Die Backend-Funktionalität wurde mit FastAPI umgesetzt. Frontend-Komponenten sind über HTTP-APIs und einen strukturierten Datenaustausch mit der serverseitigen Geschäftslogik verbunden.",
    },
    {
      index: "04",
      title: "Datenbank und Datenhaltung",
      body: "PostgreSQL dient der dauerhaften Speicherung. Die Datenzugriffe unterstützen Geschäftsmodule, CRM-Funktionen und die Anforderungen einer mandantenfähigen Anwendung.",
    },
    {
      index: "05",
      title: "Testen und Qualitätssicherung",
      body: "Automatisierte Tests, Typprüfung, Build-Validierung und iteratives Debugging dienen dazu, Fehler zu finden, Funktionen zu prüfen und Regressionen während der Entwicklung zu begrenzen.",
    },
    {
      index: "06",
      title: "Versionsverwaltung und Iteration",
      body: "Der Quellcode wird mit Git und GitHub geführt. Commits und getrennte Branches halten Änderungen nachvollziehbar und trennen die Arbeit an der Anwendung von der Arbeit am Portfolio.",
    },
    {
      index: "07",
      title: "Bereitstellung und Produktion",
      body: "Die Bereitstellung ist auf Vercel für das Frontend, Railway für die Backend-Dienste und Cloudflare für die Domain-Infrastruktur ausgerichtet, mit einer Prüfung in der Produktion, um die bereitgestellte Anwendung zu validieren.",
    },
  ],
  cycle: "Architektur → Umsetzung → Integration → Test → Verfeinerung → Bereitstellung",
  stack: workflowStack,
  cycleLabel: "Entwicklungszyklus",
  stackLabel: "Technologie",
} as const;
